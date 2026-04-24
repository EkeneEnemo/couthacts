import { db } from "@/lib/db";
import { WalletTxType } from "@prisma/client";
import { withSpan } from "@/lib/tracing";

/**
 * Get or create a wallet for a user. Every user gets one.
 */
export async function getOrCreateWallet(userId: string) {
  const existing = await db.wallet.findUnique({ where: { userId } });
  if (existing) return existing;

  return db.wallet.create({
    data: { userId, balanceUsd: 0 },
  });
}

/**
 * Debit (subtract) from a wallet. Throws if insufficient balance or wallet is locked.
 * Runs inside a Prisma interactive transaction for atomicity.
 */
export async function debitWallet(args: {
  userId: string;
  amountUsd: number;
  type: WalletTxType;
  description: string;
  reference?: string;
  postingId?: string;
  bookingId?: string;
  stripeId?: string;
}) {
  return withSpan(
    "lib.wallet.debit",
    { "wallet.tx_type": args.type, "wallet.amount_usd": args.amountUsd },
    () => debitWalletImpl(args),
  );
}

async function debitWalletImpl({
  userId,
  amountUsd,
  type,
  description,
  reference,
  postingId,
  bookingId,
  stripeId,
}: {
  userId: string;
  amountUsd: number;
  type: WalletTxType;
  description: string;
  reference?: string;
  postingId?: string;
  bookingId?: string;
  stripeId?: string;
}) {
  return db.$transaction(async (tx) => {
    const wallet = await tx.wallet.findUnique({ where: { userId } });
    if (!wallet) throw new Error("Wallet not found");
    if (wallet.isLocked) throw new Error("Wallet is locked");

    const balanceBefore = Number(wallet.balanceUsd);
    if (balanceBefore < amountUsd) {
      throw new Error(
        `Insufficient wallet balance. Have $${balanceBefore.toFixed(2)}, need $${amountUsd.toFixed(2)}`
      );
    }

    const balanceAfter = balanceBefore - amountUsd;

    const updated = await tx.wallet.update({
      where: { id: wallet.id },
      data: { balanceUsd: balanceAfter },
    });

    const transaction = await tx.walletTransaction.create({
      data: {
        walletId: wallet.id,
        type,
        amountUsd: -amountUsd,
        balanceBefore,
        balanceAfter,
        description,
        reference,
        postingId,
        bookingId,
        stripeId,
      },
    });

    return { wallet: updated, transaction };
  });
}

/**
 * Credit (add) to a wallet. Used for top-ups, payouts to provider wallet, refunds.
 */
export async function creditWallet(args: {
  userId: string;
  amountUsd: number;
  type: WalletTxType;
  description: string;
  reference?: string;
  postingId?: string;
  bookingId?: string;
  stripeId?: string;
}) {
  return withSpan(
    "lib.wallet.credit",
    { "wallet.tx_type": args.type, "wallet.amount_usd": args.amountUsd },
    () => creditWalletImpl(args),
  );
}

async function creditWalletImpl({
  userId,
  amountUsd,
  type,
  description,
  reference,
  postingId,
  bookingId,
  stripeId,
}: {
  userId: string;
  amountUsd: number;
  type: WalletTxType;
  description: string;
  reference?: string;
  postingId?: string;
  bookingId?: string;
  stripeId?: string;
}) {
  return db.$transaction(async (tx) => {
    const wallet = await tx.wallet.findUnique({ where: { userId } });
    if (!wallet) throw new Error("Wallet not found");

    const balanceBefore = Number(wallet.balanceUsd);
    const balanceAfter = balanceBefore + amountUsd;

    const updated = await tx.wallet.update({
      where: { id: wallet.id },
      data: { balanceUsd: balanceAfter },
    });

    const transaction = await tx.walletTransaction.create({
      data: {
        walletId: wallet.id,
        type,
        amountUsd,
        balanceBefore,
        balanceAfter,
        description,
        reference,
        postingId,
        bookingId,
        stripeId,
      },
    });

    return { wallet: updated, transaction };
  });
}

/**
 * Get wallet with recent transactions.
 */
export async function getWalletWithTransactions(
  userId: string,
  take = 50
) {
  const wallet = await getOrCreateWallet(userId);

  const transactions = await db.walletTransaction.findMany({
    where: { walletId: wallet.id },
    orderBy: { createdAt: "desc" },
    take,
  });

  return { wallet, transactions };
}
