-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'PROVIDER', 'ADMIN');

-- CreateEnum
CREATE TYPE "KycStatus" AS ENUM ('PENDING', 'IN_REVIEW', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "TransportMode" AS ENUM ('TAXI_RIDE', 'LIMOUSINE', 'COURIER_LAST_MILE', 'MOVING', 'FREIGHT_TRUCKING', 'HEAVY_HAUL', 'ARMORED', 'MEDICAL', 'PRIVATE_JET', 'HELICOPTER', 'COMMERCIAL_AIRLINE', 'AIR_CARGO', 'CARGO_SHIP', 'YACHT_CHARTER', 'FERRY', 'FREIGHT_RAIL', 'HAZMAT', 'OVERSIZED_CARGO');

-- CreateEnum
CREATE TYPE "PostingStatus" AS ENUM ('OPEN', 'BIDDING', 'MATCHED', 'IN_PROGRESS', 'COMPLETED', 'DISPUTED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'DISPUTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "EscrowStatus" AS ENUM ('HOLDING', 'RELEASED', 'REFUNDED', 'DISPUTED');

-- CreateEnum
CREATE TYPE "PaymentTerm" AS ENUM ('FULL_UPFRONT', 'SPLIT_50_50', 'FULL_ON_COMPLETION');

-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('TAXI', 'COURIER', 'MOVING', 'FREIGHT', 'HEAVY_HAUL', 'HELICOPTER', 'AIR_CARGO', 'PRIVATE_JET', 'YACHT_FERRY', 'CARGO_SHIP', 'RAIL', 'ARMORED_MEDICAL_HAZMAT', 'AIRLINE', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'PAST_DUE', 'TRIALING');

-- CreateEnum
CREATE TYPE "CouthActsScoreTier" AS ENUM ('ELITE', 'TRUSTED', 'ESTABLISHED', 'PROBATION');

-- CreateEnum
CREATE TYPE "DisputeStatus" AS ENUM ('OPEN', 'UNDER_REVIEW', 'RESOLVED_CUSTOMER', 'RESOLVED_PROVIDER', 'ESCALATED');

-- CreateEnum
CREATE TYPE "TrackingLayer" AS ENUM ('MOBILE_GPS', 'AIS_MARITIME', 'FLIGHT_TRACKING', 'ELD_INTEGRATION', 'QR_PIN_CONFIRMATION', 'IOT_DEVICE', 'SATELLITE', 'DOCUMENT_POD_AI', 'BIOMETRIC');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "phone" TEXT,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "passwordHash" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "kycStatus" "KycStatus" NOT NULL DEFAULT 'PENDING',
    "kycPersonaId" TEXT,
    "trustScore" INTEGER NOT NULL DEFAULT 50,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "preferredLanguage" TEXT NOT NULL DEFAULT 'en',
    "preferredCurrency" TEXT NOT NULL DEFAULT 'USD',
    "country" TEXT,
    "city" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "postalCode" TEXT,
    "stripeCustomerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessRegNumber" TEXT,
    "dotNumber" TEXT,
    "mcNumber" TEXT,
    "fmcsaNumber" TEXT,
    "imoNumber" TEXT,
    "faaNumber" TEXT,
    "modes" "TransportMode"[],
    "certifications" TEXT[],
    "insuranceCertUrl" TEXT,
    "licenseUrl" TEXT,
    "fleetSize" INTEGER,
    "serviceArea" TEXT[],
    "bio" TEXT,
    "logoUrl" TEXT,
    "fleetPhotoUrls" TEXT[],
    "videoUrl" TEXT,
    "couthActsScore" INTEGER NOT NULL DEFAULT 50,
    "scoreTier" "CouthActsScoreTier" NOT NULL DEFAULT 'ESTABLISHED',
    "completionRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "onTimeRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "avgResponseTime" INTEGER NOT NULL DEFAULT 0,
    "totalJobs" INTEGER NOT NULL DEFAULT 0,
    "disputeCount" INTEGER NOT NULL DEFAULT 0,
    "kybStatus" "KycStatus" NOT NULL DEFAULT 'PENDING',
    "kybPersonaId" TEXT,
    "checkrReportId" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "stripeConnectId" TEXT,
    "stripeOnboardingDone" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "tier" "SubscriptionTier" NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "stripeSubscriptionId" TEXT,
    "stripePriceId" TEXT,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "monthlyPrice" DECIMAL(10,2) NOT NULL,
    "isAnnual" BOOLEAN NOT NULL DEFAULT false,
    "discountPercent" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posting" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "mode" "TransportMode" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "PostingStatus" NOT NULL DEFAULT 'OPEN',
    "originAddress" TEXT NOT NULL,
    "originLat" DOUBLE PRECISION,
    "originLng" DOUBLE PRECISION,
    "destinationAddress" TEXT NOT NULL,
    "destinationLat" DOUBLE PRECISION,
    "destinationLng" DOUBLE PRECISION,
    "additionalStops" JSONB,
    "weightKg" DOUBLE PRECISION,
    "lengthCm" DOUBLE PRECISION,
    "widthCm" DOUBLE PRECISION,
    "heightCm" DOUBLE PRECISION,
    "isHazmat" BOOLEAN NOT NULL DEFAULT false,
    "isTemperatureControlled" BOOLEAN NOT NULL DEFAULT false,
    "isLiveAnimals" BOOLEAN NOT NULL DEFAULT false,
    "isOversized" BOOLEAN NOT NULL DEFAULT false,
    "isFragile" BOOLEAN NOT NULL DEFAULT false,
    "cargoDescription" TEXT,
    "specialInstructions" TEXT,
    "passengerCount" INTEGER,
    "pickupDate" TIMESTAMP(3) NOT NULL,
    "deliveryDate" TIMESTAMP(3),
    "isFlexibleDate" BOOLEAN NOT NULL DEFAULT false,
    "budgetUsd" DECIMAL(12,2) NOT NULL,
    "postingFeeUsd" DECIMAL(10,2) NOT NULL,
    "postingFeePaid" BOOLEAN NOT NULL DEFAULT false,
    "isBiddingEnabled" BOOLEAN NOT NULL DEFAULT false,
    "paymentTerm" "PaymentTerm" NOT NULL DEFAULT 'FULL_UPFRONT',
    "trackingLayers" "TrackingLayer"[],
    "iotRental" BOOLEAN NOT NULL DEFAULT false,
    "satelliteTracking" BOOLEAN NOT NULL DEFAULT false,
    "biometricConfirm" BOOLEAN NOT NULL DEFAULT false,
    "insuranceTier" TEXT NOT NULL DEFAULT 'BASIC',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "autoRenew" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isUrgent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Posting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bid" (
    "id" TEXT NOT NULL,
    "postingId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "amountUsd" DECIMAL(12,2) NOT NULL,
    "message" TEXT,
    "estimatedPickup" TIMESTAMP(3),
    "estimatedDelivery" TIMESTAMP(3),
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,
    "isWithdrawn" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "postingId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'CONFIRMED',
    "agreedAmountUsd" DECIMAL(12,2) NOT NULL,
    "paymentTerm" "PaymentTerm" NOT NULL,
    "customerMarkedDone" BOOLEAN NOT NULL DEFAULT false,
    "providerMarkedDone" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "cancellationReason" TEXT,
    "cancellationBy" TEXT,
    "refundAmountUsd" DECIMAL(12,2),
    "providerPenalty" BOOLEAN NOT NULL DEFAULT false,
    "scheduledPickup" TIMESTAMP(3) NOT NULL,
    "scheduledDelivery" TIMESTAMP(3),
    "actualPickup" TIMESTAMP(3),
    "actualDelivery" TIMESTAMP(3),
    "currentLat" DOUBLE PRECISION,
    "currentLng" DOUBLE PRECISION,
    "lastLocationUpdate" TIMESTAMP(3),
    "iotDeviceId" TEXT,
    "satelliteDeviceId" TEXT,
    "trackingCode" TEXT,
    "qrCode" TEXT,
    "pin" TEXT,
    "podDocumentUrl" TEXT,
    "biometricConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "insuranceTier" TEXT NOT NULL DEFAULT 'BASIC',
    "insurancePremiumUsd" DECIMAL(10,2),
    "sosTriggerred" BOOLEAN NOT NULL DEFAULT false,
    "sosTriggeredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escrow" (
    "id" TEXT NOT NULL,
    "postingId" TEXT NOT NULL,
    "bookingId" TEXT,
    "totalAmountUsd" DECIMAL(12,2) NOT NULL,
    "escrowFeeUsd" DECIMAL(10,2) NOT NULL,
    "escrowFeePercent" DECIMAL(5,2) NOT NULL,
    "providerPayoutUsd" DECIMAL(12,2) NOT NULL,
    "status" "EscrowStatus" NOT NULL DEFAULT 'HOLDING',
    "stripePaymentIntentId" TEXT,
    "stripeTransferId" TEXT,
    "heldAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "releasedAt" TIMESTAMP(3),
    "refundedAt" TIMESTAMP(3),
    "autoReleaseAt" TIMESTAMP(3),
    "firstPaymentUsd" DECIMAL(12,2),
    "firstPaymentReleasedAt" TIMESTAMP(3),
    "finalPaymentUsd" DECIMAL(12,2),
    "finalPaymentReleasedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Escrow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackingEvent" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "providerId" TEXT,
    "layer" "TrackingLayer" NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "altitude" DOUBLE PRECISION,
    "speed" DOUBLE PRECISION,
    "heading" DOUBLE PRECISION,
    "status" TEXT,
    "rawData" JSONB,
    "note" TEXT,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrackingEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "onTimeScore" INTEGER,
    "commsScore" INTEGER,
    "conditionScore" INTEGER,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dispute" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "status" "DisputeStatus" NOT NULL DEFAULT 'OPEN',
    "reason" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "evidenceUrls" TEXT[],
    "adminNotes" TEXT,
    "resolvedBy" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "resolution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dispute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_userId_key" ON "Provider"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_stripeConnectId_key" ON "Provider"("stripeConnectId");

-- CreateIndex
CREATE INDEX "Provider_couthActsScore_idx" ON "Provider"("couthActsScore");

-- CreateIndex
CREATE INDEX "Provider_isVerified_idx" ON "Provider"("isVerified");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_providerId_key" ON "Subscription"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "Posting_mode_idx" ON "Posting"("mode");

-- CreateIndex
CREATE INDEX "Posting_status_idx" ON "Posting"("status");

-- CreateIndex
CREATE INDEX "Posting_customerId_idx" ON "Posting"("customerId");

-- CreateIndex
CREATE INDEX "Posting_pickupDate_idx" ON "Posting"("pickupDate");

-- CreateIndex
CREATE INDEX "Bid_postingId_idx" ON "Bid"("postingId");

-- CreateIndex
CREATE INDEX "Bid_providerId_idx" ON "Bid"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Bid_postingId_providerId_key" ON "Bid"("postingId", "providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_postingId_key" ON "Booking"("postingId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_trackingCode_key" ON "Booking"("trackingCode");

-- CreateIndex
CREATE INDEX "Booking_customerId_idx" ON "Booking"("customerId");

-- CreateIndex
CREATE INDEX "Booking_providerId_idx" ON "Booking"("providerId");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Escrow_postingId_key" ON "Escrow"("postingId");

-- CreateIndex
CREATE UNIQUE INDEX "Escrow_bookingId_key" ON "Escrow"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Escrow_stripePaymentIntentId_key" ON "Escrow"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX "Escrow_status_idx" ON "Escrow"("status");

-- CreateIndex
CREATE INDEX "TrackingEvent_bookingId_idx" ON "TrackingEvent"("bookingId");

-- CreateIndex
CREATE INDEX "TrackingEvent_recordedAt_idx" ON "TrackingEvent"("recordedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Review_bookingId_key" ON "Review"("bookingId");

-- CreateIndex
CREATE INDEX "Review_providerId_idx" ON "Review"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Dispute_bookingId_key" ON "Dispute"("bookingId");

-- CreateIndex
CREATE INDEX "Notification_userId_isRead_idx" ON "Notification"("userId", "isRead");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posting" ADD CONSTRAINT "Posting_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_postingId_fkey" FOREIGN KEY ("postingId") REFERENCES "Posting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_postingId_fkey" FOREIGN KEY ("postingId") REFERENCES "Posting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escrow" ADD CONSTRAINT "Escrow_postingId_fkey" FOREIGN KEY ("postingId") REFERENCES "Posting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escrow" ADD CONSTRAINT "Escrow_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackingEvent" ADD CONSTRAINT "TrackingEvent_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackingEvent" ADD CONSTRAINT "TrackingEvent_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
