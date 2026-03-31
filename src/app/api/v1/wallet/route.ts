import { validateApiKey } from "@/lib/api-auth";
import { getWalletWithTransactions } from "@/lib/wallet";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const auth = await validateApiKey(req);
  if ("error" in auth) return auth.error;

  const { wallet } = await getWalletWithTransactions(auth.user.id, 20);

  return NextResponse.json({
    success: true,
    data: { balance: Number(wallet.balanceUsd), currency: wallet.currency },
    meta: { requestId: crypto.randomUUID(), timestamp: new Date().toISOString() },
  }, { headers: auth.headers });
}
