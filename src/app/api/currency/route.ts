import { getExchangeRates, localToUsd, usdToLocal, formatCurrency } from "@/lib/currency";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/currency?amount=500&from=NGN&to=USD
 * Or GET /api/currency (returns all rates)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const amount = searchParams.get("amount");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const rates = await getExchangeRates();

  // If no conversion requested, return all rates
  if (!amount || !from) {
    return NextResponse.json({ rates });
  }

  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount)) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const target = to || "USD";

  if (from === "USD") {
    const converted = await usdToLocal(parsedAmount, target);
    return NextResponse.json({
      from: "USD",
      to: target,
      amount: parsedAmount,
      converted,
      formatted: formatCurrency(converted, target),
      rate: rates[target] || 1,
    });
  }

  if (target === "USD") {
    const converted = await localToUsd(parsedAmount, from);
    return NextResponse.json({
      from,
      to: "USD",
      amount: parsedAmount,
      converted,
      formatted: formatCurrency(converted, "USD"),
      rate: rates[from] ? 1 / rates[from] : 1,
    });
  }

  // Cross-currency: from → USD → to
  const inUsd = await localToUsd(parsedAmount, from);
  const converted = await usdToLocal(inUsd, target);
  return NextResponse.json({
    from,
    to: target,
    amount: parsedAmount,
    converted,
    formatted: formatCurrency(converted, target),
    inUsd,
  });
}
