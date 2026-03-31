import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function POST() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const provider = await db.provider.findUnique({
      where: { userId: session.user.id },
    });
    if (!provider) {
      return NextResponse.json(
        { error: "Complete provider onboarding first" },
        { status: 400 }
      );
    }

    let accountId = provider.stripeConnectId;

    if (!accountId) {
      const account = await getStripe().accounts.create(
        {
          type: "express",
          email: session.user.email,
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
          },
          business_profile: {
            name: provider.businessName,
          },
        },
        { idempotencyKey: `connect-create-${provider.id}` }
      );
      accountId = account.id;

      await db.provider.update({
        where: { id: provider.id },
        data: { stripeConnectId: accountId },
      });
    }

    // Derive base URL from request headers
    const headersList = await headers();
    const host = headersList.get("host") || "couthacts.com";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const accountLink = await getStripe().accountLinks.create({
      account: accountId,
      refresh_url: `${baseUrl}/provider/wallet?stripe=refresh`,
      return_url: `${baseUrl}/provider/wallet?stripe=complete`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to set up Stripe Connect";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const provider = await db.provider.findUnique({
      where: { userId: session.user.id },
    });
    if (!provider?.stripeConnectId) {
      return NextResponse.json({ connected: false });
    }

    const account = await getStripe().accounts.retrieve(provider.stripeConnectId);
    const isComplete = account.charges_enabled && account.payouts_enabled;

    if (isComplete && !provider.stripeOnboardingDone) {
      await db.provider.update({
        where: { id: provider.id },
        data: { stripeOnboardingDone: true },
      });
    }

    return NextResponse.json({
      connected: true,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      onboardingComplete: isComplete,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to check Stripe status";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
