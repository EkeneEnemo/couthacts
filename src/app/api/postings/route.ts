import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { debitWallet, creditWallet, getOrCreateWallet } from "@/lib/wallet";
import { calculatePostingFee, validateBudget } from "@/lib/posting-fees";
import { getInsuranceFee, getMinimumInsuranceTier } from "@/lib/insurance";
import { localToUsd } from "@/lib/currency";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("mode");
  const status = searchParams.get("status");

  const where: Record<string, unknown> = {};

  if (session.user.role === "CUSTOMER") {
    where.customerId = session.user.id;
  }
  if (mode) where.mode = mode;
  if (status) where.status = status;

  const postings = await db.posting.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      customer: { select: { firstName: true, lastName: true } },
      _count: { select: { bids: true } },
    },
  });

  return NextResponse.json({ postings });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "CUSTOMER" && session.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Only customers can create postings" },
      { status: 403 }
    );
  }

  // Verification gate (admins bypass)
  if (session.user.role !== "ADMIN" && session.user.kycStatus !== "APPROVED") {
    return NextResponse.json(
      { error: "Please verify your identity before posting. Go to Settings → Verify Identity." },
      { status: 403 }
    );
  }

  const body = await req.json();
  const rawBudget = parseFloat(body.budgetUsd);
  const currency = body.currency || session.user.preferredCurrency || "USD";

  // Convert local currency to USD if needed
  const budgetUsd = currency !== "USD"
    ? await localToUsd(rawBudget, currency)
    : rawBudget;

  // Enforce minimum budget
  const budgetError = validateBudget(body.mode, budgetUsd);
  if (budgetError) {
    return NextResponse.json({ error: budgetError }, { status: 400 });
  }

  const postingFeeUsd = calculatePostingFee(body.mode, budgetUsd);

  // Ensure wallet exists
  await getOrCreateWallet(session.user.id);

  // Debit posting fee from wallet
  try {
    await debitWallet({
      userId: session.user.id,
      amountUsd: postingFeeUsd,
      type: "POSTING_FEE",
      description: `Posting fee for ${body.mode.replace(/_/g, " ")} job`,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Insufficient balance for posting fee";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Hold budget amount in wallet (escrow reserve)
  try {
    await debitWallet({
      userId: session.user.id,
      amountUsd: budgetUsd,
      type: "ESCROW_HOLD",
      description: `Budget hold for ${body.mode.replace(/_/g, " ")} job ($${budgetUsd.toFixed(2)})`,
    });
  } catch (err: unknown) {
    // Refund the posting fee since we can't hold the budget
    await creditWallet({
      userId: session.user.id,
      amountUsd: postingFeeUsd,
      type: "REFUND",
      description: "Posting fee refund — insufficient balance for budget hold",
    });
    const message =
      err instanceof Error ? err.message : "Insufficient balance for budget hold";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Charge protection fee if applicable
  const insuranceTier = body.insuranceTier || getMinimumInsuranceTier(body.mode);
  const insuranceFeeUsd = getInsuranceFee(insuranceTier, budgetUsd);

  if (insuranceFeeUsd > 0) {
    try {
      await debitWallet({
        userId: session.user.id,
        amountUsd: insuranceFeeUsd,
        type: "INSURANCE_FEE",
        description: `Insurance (${insuranceTier}) for ${body.mode.replace(/_/g, " ")} job — $${insuranceFeeUsd.toFixed(2)}`,
      });
    } catch (err: unknown) {
      // Refund posting fee + budget hold
      await creditWallet({
        userId: session.user.id,
        amountUsd: postingFeeUsd + budgetUsd,
        type: "REFUND",
        description: "Refund — insufficient balance for protection fee",
      });
      const message = err instanceof Error ? err.message : "Insufficient balance for protection fee";
      return NextResponse.json({ error: message }, { status: 400 });
    }
  }

  const posting = await db.posting.create({
    data: {
      customerId: session.user.id,
      mode: body.mode,
      title: body.title,
      description: body.description,
      originAddress: body.originAddress,
      originLat: body.originLat ? parseFloat(body.originLat) : null,
      originLng: body.originLng ? parseFloat(body.originLng) : null,
      destinationAddress: body.destinationAddress,
      destinationLat: body.destinationLat
        ? parseFloat(body.destinationLat)
        : null,
      destinationLng: body.destinationLng
        ? parseFloat(body.destinationLng)
        : null,
      weightKg: body.weightKg ? parseFloat(body.weightKg) : null,
      lengthCm: body.lengthCm ? parseFloat(body.lengthCm) : null,
      widthCm: body.widthCm ? parseFloat(body.widthCm) : null,
      heightCm: body.heightCm ? parseFloat(body.heightCm) : null,
      isHazmat: body.isHazmat || false,
      isTemperatureControlled: body.isTemperatureControlled || false,
      isLiveAnimals: body.isLiveAnimals || false,
      isOversized: body.isOversized || false,
      isFragile: body.isFragile || false,
      cargoDescription: body.cargoDescription || null,
      specialInstructions: body.specialInstructions || null,
      passengerCount: body.passengerCount
        ? parseInt(body.passengerCount)
        : null,
      pickupDate: new Date(body.pickupDate),
      deliveryDate: body.deliveryDate ? new Date(body.deliveryDate) : null,
      isFlexibleDate: body.isFlexibleDate || false,
      budgetUsd,
      postingFeeUsd,
      postingFeePaid: true,
      isBiddingEnabled: body.isBiddingEnabled ?? true,
      paymentTerm: body.paymentTerm || "FULL_UPFRONT",
      trackingLayers: body.trackingLayers || [],
      insuranceTier,
      insuranceFeeUsd: insuranceFeeUsd || null,
      isUrgent: body.isUrgent || false,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    },
  });

  return NextResponse.json({ posting, postingFeeUsd }, { status: 201 });
}
