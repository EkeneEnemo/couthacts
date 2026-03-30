import { getSession } from "@/lib/auth";
import { getWalletWithTransactions } from "@/lib/wallet";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { wallet, transactions } = await getWalletWithTransactions(
    session.user.id
  );

  return NextResponse.json({
    wallet: {
      id: wallet.id,
      balanceUsd: Number(wallet.balanceUsd),
      currency: wallet.currency,
      isLocked: wallet.isLocked,
    },
    transactions: transactions.map((t: (typeof transactions)[number]) => ({
      id: t.id,
      type: t.type,
      amountUsd: Number(t.amountUsd),
      balanceBefore: Number(t.balanceBefore),
      balanceAfter: Number(t.balanceAfter),
      description: t.description,
      reference: t.reference,
      postingId: t.postingId,
      bookingId: t.bookingId,
      stripeId: t.stripeId,
      createdAt: t.createdAt,
    })),
  });
}
