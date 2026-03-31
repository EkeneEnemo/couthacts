import { validateProviderApiKey } from "@/lib/provider-api-auth";
import { getWalletWithTransactions } from "@/lib/wallet";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/provider/v1/wallet — Provider wallet balance via API.
 */
export async function GET(req: NextRequest) {
  const auth = await validateProviderApiKey(req);
  if ("error" in auth) return auth.error;

  const { wallet, transactions } = await getWalletWithTransactions(auth.provider.userId, 20);

  return NextResponse.json({
    success: true,
    data: {
      balance: Number(wallet.balanceUsd),
      currency: wallet.currency,
      recentTransactions: transactions.map((t: { id: string; type: string; amountUsd: unknown; description: string; createdAt: Date }) => ({
        id: t.id, type: t.type, amount: Number(t.amountUsd), description: t.description, createdAt: t.createdAt,
      })),
    },
    meta: { requestId: crypto.randomUUID(), timestamp: new Date().toISOString() },
  }, { headers: auth.headers });
}
