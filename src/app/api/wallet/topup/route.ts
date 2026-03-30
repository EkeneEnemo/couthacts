import { getSession } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";
import { getOrCreateWallet } from "@/lib/wallet";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
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

    const wallet = await getOrCreateWallet(session.user.id);

    // Derive the base URL from the request headers (works on Vercel)
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

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
      success_url: `${baseUrl}/wallet?topup=success`,
      cancel_url: `${baseUrl}/wallet?topup=cancelled`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Top-up failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
