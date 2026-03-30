import { getSession } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import { getOrCreateWallet } from "@/lib/wallet";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { amountUsd } = await req.json();
  const amount = parseFloat(amountUsd);

  if (!amount || amount < 5) {
    return NextResponse.json(
      { error: "Minimum top-up is $5.00" },
      { status: 400 }
    );
  }
  if (amount > 50000) {
    return NextResponse.json(
      { error: "Maximum single top-up is $50,000" },
      { status: 400 }
    );
  }

  // Ensure wallet exists
  const wallet = await getOrCreateWallet(session.user.id);

  const stripe = getStripe();
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "CouthActs Wallet Top-Up",
            description: `Add $${amount.toFixed(2)} to your wallet`,
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    metadata: {
      couthacts_user_id: session.user.id,
      couthacts_wallet_id: wallet.id,
      type: "wallet_topup",
    },
    success_url: `${process.env.NEXTAUTH_URL}/wallet?topup=success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/wallet?topup=cancelled`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
