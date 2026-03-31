import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { headers } from "next/headers";

/**
 * POST /api/providers/stripe-connect
 * Creates a Stripe Connect Express account (or retrieves existing)
 * and returns the hosted onboarding URL.
 */
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

    const stripe = getStripe();
    let accountId = provider.stripeConnectId;

    // Step 1: Create Express connected account if none exists
    if (!accountId) {
      try {
        const account = await stripe.accounts.create(
          {
            type: "express",
            country: "US",
            email: session.user.email,
            capabilities: {
              card_payments: { requested: true },
              transfers: { requested: true },
            },
            business_type: "individual",
            business_profile: {
              name: provider.businessName,
              mcc: "4789", // Transportation services
            },
            metadata: {
              couthacts_provider_id: provider.id,
              couthacts_user_id: session.user.id,
            },
          },
          { idempotencyKey: `connect-create-${provider.id}` }
        );
        accountId = account.id;

        await db.provider.update({
          where: { id: provider.id },
          data: { stripeConnectId: accountId },
        });
      } catch (err: unknown) {
        const stripeErr = err as { type?: string; message?: string; code?: string };

        // Handle the specific "Connect not enabled" error
        if (
          stripeErr.message?.includes("signed up for Connect") ||
          stripeErr.code === "account_invalid" ||
          stripeErr.message?.includes("connect")
        ) {
          return NextResponse.json(
            {
              error:
                "Stripe Connect is being activated for CouthActs. Payout setup will be available shortly. Please try again later.",
              stripeError: stripeErr.message,
            },
            { status: 503 }
          );
        }
        throw err;
      }
    }

    // Step 2: Generate the hosted onboarding link
    const headersList = await headers();
    const host = headersList.get("host") || "couthacts.com";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${baseUrl}/provider/wallet?stripe=refresh`,
      return_url: `${baseUrl}/provider/wallet?stripe=complete`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to set up Stripe Connect";
    console.error("[stripe-connect] POST error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * GET /api/providers/stripe-connect
 * Check Stripe Connect onboarding status.
 */
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

    const account = await getStripe().accounts.retrieve(
      provider.stripeConnectId
    );
    const isComplete =
      account.charges_enabled === true && account.payouts_enabled === true;

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
    const message =
      err instanceof Error
        ? err.message
        : "Failed to check Stripe status";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
