import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST() {
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
    const account = await getStripe().accounts.create({
      type: "express",
      email: session.user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_profile: {
        name: provider.businessName,
      },
    });
    accountId = account.id;

    await db.provider.update({
      where: { id: provider.id },
      data: { stripeConnectId: accountId },
    });
  }

  const accountLink = await getStripe().accountLinks.create({
    account: accountId,
    refresh_url: `${process.env.NEXTAUTH_URL}/onboarding?step=stripe&refresh=true`,
    return_url: `${process.env.NEXTAUTH_URL}/onboarding?step=stripe&complete=true`,
    type: "account_onboarding",
  });

  return NextResponse.json({ url: accountLink.url });
}

export async function GET() {
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
}
