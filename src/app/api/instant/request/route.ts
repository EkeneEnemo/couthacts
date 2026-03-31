import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { debitWallet, getOrCreateWallet } from "@/lib/wallet";
import { calculatePostingFee } from "@/lib/posting-fees";
import { getInsuranceFee } from "@/lib/insurance";
import { pushToUser } from "@/lib/pusher-server";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/instant/request — Create an instant job request.
 * Charges posting fee + protection fee + holds budget immediately.
 * Broadcasts to providers in the area.
 * 90-second timeout — if no accept, auto-cancels and refunds budget.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (session.user.role !== "CUSTOMER" && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Only customers can request instant jobs" }, { status: 403 });
    }
    if (session.user.role !== "ADMIN" && session.user.kycStatus !== "APPROVED") {
      return NextResponse.json({ error: "Please verify your identity first" }, { status: 403 });
    }

    const body = await req.json();
    const { mode, originAddress, destinationAddress, pickupDate, budgetUsd, insuranceTier, description } = body;

    if (!mode || !originAddress || !destinationAddress || !budgetUsd) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const budget = parseFloat(budgetUsd);
    if (!Number.isFinite(budget) || budget <= 0) {
      return NextResponse.json({ error: "Invalid budget" }, { status: 400 });
    }

    await getOrCreateWallet(session.user.id);

    const postingFee = calculatePostingFee(mode, budget);
    const insuranceFee = getInsuranceFee(insuranceTier || "NONE", budget);

    // Debit posting fee
    try {
      await debitWallet({
        userId: session.user.id, amountUsd: postingFee,
        type: "POSTING_FEE", description: `Instant posting fee — ${mode.replace(/_/g, " ")}`,
      });
    } catch (err: unknown) {
      return NextResponse.json({ error: err instanceof Error ? err.message : "Insufficient balance for posting fee" }, { status: 400 });
    }

    // Hold budget
    try {
      await debitWallet({
        userId: session.user.id, amountUsd: budget,
        type: "ESCROW_HOLD", description: `Instant budget hold — $${budget.toFixed(2)}`,
      });
    } catch (err: unknown) {
      // Refund posting fee
      const { creditWallet } = await import("@/lib/wallet");
      await creditWallet({ userId: session.user.id, amountUsd: postingFee, type: "REFUND", description: "Posting fee refund — budget hold failed" });
      return NextResponse.json({ error: err instanceof Error ? err.message : "Insufficient balance for budget" }, { status: 400 });
    }

    // Debit insurance
    if (insuranceFee > 0) {
      try {
        await debitWallet({
          userId: session.user.id, amountUsd: insuranceFee,
          type: "INSURANCE_FEE", description: `Instant insurance (${insuranceTier}) — $${insuranceFee.toFixed(2)}`,
        });
      } catch (err: unknown) {
        const { creditWallet } = await import("@/lib/wallet");
        await creditWallet({ userId: session.user.id, amountUsd: postingFee + budget, type: "REFUND", description: "Refund — protection fee failed" });
        return NextResponse.json({ error: err instanceof Error ? err.message : "Insufficient balance for insurance" }, { status: 400 });
      }
    }

    // Create posting
    const posting = await db.posting.create({
      data: {
        customerId: session.user.id,
        mode, title: `Instant ${mode.replace(/_/g, " ")}`,
        description: description || `Instant ${mode.replace(/_/g, " ")} request`,
        originAddress, destinationAddress,
        pickupDate: pickupDate ? new Date(pickupDate) : new Date(),
        budgetUsd: budget, postingFeeUsd: postingFee, postingFeePaid: true,
        isBiddingEnabled: false, isUrgent: true,
        insuranceTier: insuranceTier || "NONE",
        insuranceFeeUsd: insuranceFee || null,
        expiresAt: new Date(Date.now() + 90 * 1000), // 90 seconds
      },
    });

    // Broadcast to providers
    const city = originAddress.split(",").pop()?.trim() || "global";
    pushToUser(`instant-${city.toLowerCase().replace(/\s/g, "-")}`, "new-instant-job", {
      postingId: posting.id, mode, originAddress, destinationAddress, budget,
    }).catch(() => {});

    // Schedule auto-cancel after 90 seconds
    setTimeout(async () => {
      try {
        const p = await db.posting.findUnique({ where: { id: posting.id } });
        if (p && p.status === "OPEN") {
          await db.posting.update({ where: { id: posting.id }, data: { status: "EXPIRED" } });
          // Refund budget (posting fee + protection fee kept)
          const { creditWallet } = await import("@/lib/wallet");
          await creditWallet({ userId: session.user.id, amountUsd: budget, type: "ESCROW_REFUND", description: "Instant job expired — budget refunded", postingId: posting.id });
        }
      } catch {}
    }, 90000);

    return NextResponse.json({ postingId: posting.id, expiresAt: posting.expiresAt }, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Request failed" }, { status: 500 });
  }
}
