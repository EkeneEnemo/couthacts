-- Add new wallet transaction types for promo credits and referral bonuses.
ALTER TYPE "WalletTxType" ADD VALUE IF NOT EXISTS 'PROMO_CREDIT';
ALTER TYPE "WalletTxType" ADD VALUE IF NOT EXISTS 'REFERRAL_BONUS';

-- Referral status enum.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ReferralStatus') THEN
    CREATE TYPE "ReferralStatus" AS ENUM ('PENDING', 'QUALIFIED', 'REVOKED');
  END IF;
END $$;

-- Per-user referral code (one-to-one with User).
CREATE TABLE IF NOT EXISTS "ReferralCode" (
  "id"          TEXT PRIMARY KEY,
  "userId"      TEXT NOT NULL UNIQUE,
  "code"        TEXT NOT NULL UNIQUE,
  "redeemCount" INTEGER NOT NULL DEFAULT 0,
  "createdAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ReferralCode_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "ReferralCode_code_idx" ON "ReferralCode"("code");

-- Redemption log: one row per successful signup via a ref code.
CREATE TABLE IF NOT EXISTS "ReferralRedemption" (
  "id"                 TEXT PRIMARY KEY,
  "referrerId"         TEXT NOT NULL,
  "referredId"         TEXT NOT NULL UNIQUE,
  "code"               TEXT NOT NULL,
  "status"             "ReferralStatus" NOT NULL DEFAULT 'PENDING',
  "referrerRewardUsd"  DECIMAL(10, 2) NOT NULL DEFAULT 0,
  "referredRewardUsd"  DECIMAL(10, 2) NOT NULL DEFAULT 0,
  "qualifiedAt"        TIMESTAMP(3),
  "createdAt"          TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ReferralRedemption_referrerId_fkey"
    FOREIGN KEY ("referrerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "ReferralRedemption_referredId_fkey"
    FOREIGN KEY ("referredId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "ReferralRedemption_referrerId_idx" ON "ReferralRedemption"("referrerId");
CREATE INDEX IF NOT EXISTS "ReferralRedemption_status_idx" ON "ReferralRedemption"("status");
