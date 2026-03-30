import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe() {
  if (!_stripe) {
    const key = (process.env.STRIPE_SECRET_KEY || "").replace(/^["']|["']$/g, "").trim();
    if (!key || !key.match(/^sk_(test|live)_/)) {
      throw new Error(
        "STRIPE_SECRET_KEY is missing or invalid. Must start with sk_test_ or sk_live_"
      );
    }
    _stripe = new Stripe(key, {
      timeout: 9000, // 9s — leave margin for Vercel's 10s limit
    });
  }
  return _stripe;
}

export { Stripe };
