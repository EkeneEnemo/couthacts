import { Resend } from "resend";
import { db } from "@/lib/db";
import { createHmac } from "crypto";

/** Escape HTML special characters to prevent XSS in email templates. */
function esc(str: string | number | null | undefined): string {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Export for use in other routes that build HTML (receipts, career emails). */
export { esc as escapeHtml };

let _resend: Resend | null = null;

export function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY!);
  }
  return _resend;
}

const FROM = process.env.RESEND_FROM_EMAIL || "CouthActs <hello@couthacts.com>";
const BASE = process.env.NEXTAUTH_URL || "https://couthacts.com";

/**
 * Generate an HMAC-based unsubscribe token for a user.
 * No DB migration needed — derived deterministically from userId + secret.
 */
export function generateUnsubscribeToken(userId: string): string {
  const secret = process.env.NEXTAUTH_SECRET || "couthacts-unsub-fallback";
  return createHmac("sha256", secret).update(userId).digest("hex");
}

/**
 * Verify an unsubscribe token and return the userId if valid.
 */
export function verifyUnsubscribeToken(userId: string, token: string): boolean {
  return generateUnsubscribeToken(userId) === token;
}

function unsubscribeUrl(userId: string): string {
  const token = generateUnsubscribeToken(userId);
  return `${BASE}/email-unsubscribe?uid=${userId}&token=${token}`;
}

/**
 * Email notification types — users can toggle each one.
 * Stored as comma-separated string in user.preferredLanguage field
 * (we'll repurpose the unused portion or use a separate field later).
 * Default: all enabled.
 */
export const EMAIL_NOTIFICATION_TYPES = {
  welcome: "Welcome email",
  new_bid: "New bid on your posting",
  bid_accepted: "Your bid was accepted",
  booking_confirmed: "Booking confirmed",
  booking_started: "Job started / in progress",
  booking_completed: "Job completed",
  escrow_released: "Payment released to wallet",
  escrow_refunded: "Escrow refunded",
  dispute_filed: "Dispute filed",
  verification_approved: "Identity verified",
  wallet_topup: "Wallet top-up receipt",
  payment_failed: "Payment failed",
  booking_cancelled: "Booking cancelled",
  payout_initiated: "Withdrawal initiated",
  payout_failed: "Withdrawal failed",
  stripe_connect_ready: "Stripe Connect ready",
  review_received: "New review received",
  score_tier_change: "CouthActs Score tier change",
  advance_disbursed: "Finance advance disbursed",
  course_enrolled: "Academy course enrollment",
  exam_result: "Academy exam result",
  account_suspended: "Account suspended",
  account_reactivated: "Account reactivated",
  kyc_rejected: "Identity verification rejected",
  business_approved: "Business verification approved",
  business_rejected: "Business verification rejected",
  reverification_required: "Re-verification required",
  api_overage: "API overage charges",
  posting_expired: "Posting expired",
  posting_abandoned: "Posting reminder (no bids accepted)",
  first_completion: "Congrats on your first completed move",
  nps_survey: "Quick 2-question feedback",
  inactivity: "We miss you — come back to CouthActs",
  referral_qualified: "You earned a referral bonus",
};

export type EmailNotificationType = keyof typeof EMAIL_NOTIFICATION_TYPES;

/**
 * Check if a user has email notifications enabled for a given type.
 * Reads from the user's notification preferences (stored in DB).
 * Default: all enabled.
 */
async function shouldSendEmail(userId: string, type: EmailNotificationType): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) return false;
  try {
    // Check if user has disabled this notification type
    // We look for a notification with type "EMAIL_PREFS" that stores preferences
    const prefs = await db.notification.findFirst({
      where: { userId, type: "EMAIL_PREFS" },
      orderBy: { createdAt: "desc" },
    });
    if (prefs && prefs.body) {
      try {
        const disabled = JSON.parse(prefs.body) as string[];
        if (disabled.includes(type)) return false;
      } catch { /* parse error = all enabled */ }
    }
    return true;
  } catch {
    return !!process.env.RESEND_API_KEY;
  }
}

async function send(email: string, subject: string, html: string, userId?: string) {
  const headers: Record<string, string> = {};
  if (userId) {
    const unsub = unsubscribeUrl(userId);
    headers["List-Unsubscribe"] = `<${unsub}>`;
    headers["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click";
  }
  await getResend().emails.send({ from: FROM, to: email, subject, html, headers });
}

function wrap(body: string, userId?: string): string {
  const year = new Date().getFullYear();
  const ownership = `&copy; ${year} CouthActs&trade;, Inc., a Texas corporation. A wholly owned subsidiary of The Ravine of Willows, Inc., also a Texas corporation. All intellectual property wholly owned by Enemo Consulting Group, Inc.`;
  const address = `The Adolphus Tower, 1412 Main Street, STE 609, Dallas, TX 75202`;
  const footer = userId
    ? `<div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E8E8ED; text-align: center;">
        <p style="color: #86868B; font-size: 11px; line-height: 1.6; margin: 0;">
          ${ownership}<br/>
          ${address}<br/>
          <a href="${BASE}/settings" style="color: #86868B;">Manage email preferences</a>
          &nbsp;&middot;&nbsp;
          <a href="${unsubscribeUrl(userId)}" style="color: #86868B;">Unsubscribe</a>
        </p>
      </div>`
    : `<div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E8E8ED; text-align: center;">
        <p style="color: #86868B; font-size: 11px; line-height: 1.6; margin: 0;">${ownership}<br/>${address}</p>
      </div>`;
  return `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">${body}${footer}</div>`;
}

function btn(href: string, text: string): string {
  return `<a href="${href}" style="display: inline-block; background: #2563EB; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">${text}</a>`;
}

// ─── Email functions ───────────────────────────────────

export async function sendWelcomeEmail(email: string, firstName: string, userId?: string) {
  await send(email, "Welcome to CouthActs!", wrap(`
    <h1 style="color: #1E3A5F;">Welcome to CouthActs, ${esc(firstName)}!</h1>
    <p style="color: #444; line-height: 1.6;">You've joined the global transportation platform. Whether you're shipping cargo across the ocean or booking a ride across town, CouthActs connects you with verified providers across 18 transport modes.</p>
    <p style="color: #444;"><strong>Next steps:</strong></p>
    <ul style="color: #444; line-height: 1.8;">
      <li>Top up your wallet to start posting jobs</li>
      <li>Verify your identity in Settings</li>
      <li>Post your first transport job</li>
    </ul>
    ${btn(`${BASE}/dashboard`, "Go to Dashboard")}
  `, userId), userId);
}

export async function sendNewBidEmail(
  email: string, firstName: string, postingTitle: string,
  providerName: string, bidAmount: string, postingId: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "new_bid"))) return;
  await send(email, `New bid on "${esc(postingTitle)}"`, wrap(`
    <h1 style="color: #1E3A5F;">You've Got a New Bid!</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, <strong>${esc(providerName)}</strong> placed a bid of <strong>${esc(bidAmount)}</strong> on your posting <strong>"${esc(postingTitle)}"</strong>.</p>
    <p style="color: #444;">Log in to review the bid, check the provider's CouthActs&trade; Score, and accept or wait for more offers.</p>
    ${btn(`${BASE}/postings/${postingId}`, "View Bids")}
  `, userId), userId);
}

export async function sendBidAcceptedEmail(
  email: string, firstName: string, postingTitle: string,
  agreedAmount: string, bookingId: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "bid_accepted"))) return;
  await send(email, `Your bid on "${esc(postingTitle)}" was accepted!`, wrap(`
    <h1 style="color: #1E3A5F;">Bid Accepted!</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, your bid of <strong>${esc(agreedAmount)}</strong> on <strong>"${esc(postingTitle)}"</strong> has been accepted.</p>
    <p style="color: #444;">You can now start the job. The customer's funds are held in escrow and will be released to your wallet upon completion.</p>
    ${btn(`${BASE}/bookings/${bookingId}`, "View Booking")}
  `, userId), userId);
}

export async function sendBookingConfirmationEmail(
  email: string, firstName: string, postingTitle: string,
  trackingCode: string, bookingId: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "booking_confirmed"))) return;
  await send(email, `Booking confirmed: ${esc(postingTitle)}`, wrap(`
    <h1 style="color: #1E3A5F;">Booking Confirmed!</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, your booking for <strong>${esc(postingTitle)}</strong> has been confirmed.</p>
    <div style="background: #F0F9FF; padding: 16px; border-radius: 8px; margin: 16px 0;">
      <p style="margin: 0; color: #0284C7;"><strong>Tracking Code:</strong> ${esc(trackingCode)}</p>
    </div>
    <p style="color: #444;">Escrow funds are being held securely. The provider will only be paid once you confirm delivery.</p>
    ${btn(`${BASE}/bookings/${bookingId}`, "View Booking")}
  `, userId), userId);
}

export async function sendBookingStartedEmail(
  email: string, firstName: string, postingTitle: string,
  bookingId: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "booking_started"))) return;
  await send(email, `Job started: ${esc(postingTitle)}`, wrap(`
    <h1 style="color: #1E3A5F;">Your Job Has Started!</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, the provider has started working on <strong>"${esc(postingTitle)}"</strong>.</p>
    <p style="color: #444;">You can track progress in real-time from your booking page.</p>
    ${btn(`${BASE}/bookings/${bookingId}`, "Track Job")}
  `, userId), userId);
}

export async function sendSosAlertEmail(
  bookingId: string, mode: string, origin: string,
  customer: { firstName: string; lastName: string; email: string; phone: string | null },
  providerName: string, lat: number | null, lng: number | null,
) {
  const mapsLink = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : "Location unavailable";
  await send("safety@couthacts.com", `🚨 SOS ALERT — ${bookingId} — ${mode}`, wrap(`
    <h1 style="color: #B91C1C;">🚨 SOS EMERGENCY ALERT</h1>
    <p><strong>Booking:</strong> ${bookingId}</p>
    <p><strong>Mode:</strong> ${mode}</p>
    <p><strong>Origin:</strong> ${esc(origin)}</p>
    <p><strong>Customer:</strong> ${esc(customer.firstName)} ${esc(customer.lastName)} (${esc(customer.email)}, ${esc(customer.phone || "no phone")})</p>
    <p><strong>Provider:</strong> ${esc(providerName)}</p>
    <p><strong>GPS:</strong> <a href="${mapsLink}">${lat}, ${lng}</a></p>
    <p><strong>Time:</strong> ${new Date().toISOString()}</p>
  `));
}

export async function sendBookingCompletedEmail(
  email: string, firstName: string, postingTitle: string,
  bookingId: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "booking_completed"))) return;
  await send(email, `Job completed: ${esc(postingTitle)}`, wrap(`
    <h1 style="color: #1E3A5F;">Job Complete!</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, <strong>"${esc(postingTitle)}"</strong> has been completed.</p>
    <p style="color: #444;">Both parties have confirmed. Thank you for using CouthActs!</p>
    ${btn(`${BASE}/bookings/${bookingId}`, "View Booking")}
  `, userId), userId);
}

export async function sendEscrowReleasedEmail(
  email: string, firstName: string, amount: number, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "escrow_released"))) return;
  await send(email, `Payment of $${amount.toFixed(2)} released to your wallet`, wrap(`
    <h1 style="color: #1E3A5F;">Payment Released!</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, <strong>$${amount.toFixed(2)}</strong> has been released to your CouthActs wallet.</p>
    ${btn(`${BASE}/wallet`, "View Wallet")}
  `, userId), userId);
}

export async function sendEscrowRefundedEmail(
  email: string, firstName: string, amount: number, bookingId: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "escrow_refunded"))) return;
  await send(email, `Escrow refund: $${amount.toFixed(2)} returned to your wallet`, wrap(`
    <h1 style="color: #1E3A5F;">Escrow Refunded</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, <strong>$${amount.toFixed(2)}</strong> has been refunded to your CouthActs wallet.</p>
    ${btn(`${BASE}/bookings/${bookingId}`, "View Details")}
  `, userId), userId);
}

export async function sendDisputeFiledEmail(
  email: string, firstName: string, postingTitle: string,
  bookingId: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "dispute_filed"))) return;
  await send(email, `Dispute filed on: ${esc(postingTitle)}`, wrap(`
    <h1 style="color: #B91C1C;">Dispute Filed</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, a dispute has been filed on the booking for <strong>${esc(postingTitle)}</strong>.</p>
    <p style="color: #444;">Escrow funds are frozen until the dispute is resolved. Our team will review and reach out.</p>
    ${btn(`${BASE}/bookings/${bookingId}`, "View Booking")}
  `, userId), userId);
}

export async function sendVerificationApprovedEmail(
  email: string, firstName: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "verification_approved"))) return;
  await send(email, "Identity verified — you're all set!", wrap(`
    <h1 style="color: #1E3A5F;">You're Verified!</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, your identity has been verified on CouthActs.</p>
    <p style="color: #444;">You can now post transportation needs and bid on opportunities.</p>
    ${btn(`${BASE}/dashboard`, "Go to Dashboard")}
  `, userId), userId);
}

export async function sendWalletTopUpReceiptEmail(
  email: string, firstName: string, amount: number, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "wallet_topup"))) return;
  await send(email, `Wallet top-up: $${amount.toFixed(2)} added`, wrap(`
    <h1 style="color: #1E3A5F;">Wallet Top-Up Successful</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, <strong>$${amount.toFixed(2)}</strong> has been added to your CouthActs wallet.</p>
    <div style="background: #F0F9FF; padding: 16px; border-radius: 8px; margin: 16px 0;">
      <p style="margin: 0; color: #0284C7;"><strong>Amount:</strong> $${amount.toFixed(2)}</p>
      <p style="margin: 0; color: #0284C7;"><strong>Date:</strong> ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
    </div>
    <p style="color: #444;">You can now use these funds to post jobs or fund escrow for bookings.</p>
    ${btn(`${BASE}/wallet`, "View Wallet")}
  `, userId), userId);
}

export async function sendPaymentFailedEmail(
  email: string, firstName: string, reason: string, bookingId?: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "payment_failed"))) return;
  await send(email, "Payment failed — action required", wrap(`
    <h1 style="color: #B91C1C;">Payment Failed</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, a payment on your account could not be processed.</p>
    <div style="background: #FEF2F2; padding: 16px; border-radius: 8px; margin: 16px 0;">
      <p style="margin: 0; color: #B91C1C;"><strong>Reason:</strong> ${esc(reason)}</p>
    </div>
    <p style="color: #444;">Please check your payment method and try again. If the issue persists, contact your bank or reach out to us.</p>
    ${btn(`${BASE}${bookingId ? `/bookings/${bookingId}` : "/wallet"}`, bookingId ? "View Booking" : "Go to Wallet")}
  `, userId), userId);
}

export async function sendBookingCancelledEmail(
  email: string, firstName: string, postingTitle: string,
  bookingId: string, refunded: boolean, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "booking_cancelled"))) return;
  await send(email, `Booking cancelled: ${esc(postingTitle)}`, wrap(`
    <h1 style="color: #B91C1C;">Booking Cancelled</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, the booking for <strong>"${esc(postingTitle)}"</strong> has been cancelled.</p>
    ${refunded ? `<p style="color: #444;">Escrow funds have been refunded to the customer's wallet.</p>` : ""}
    ${btn(`${BASE}/bookings/${bookingId}`, "View Details")}
  `, userId), userId);
}

export async function sendPayoutInitiatedEmail(
  email: string, firstName: string, amount: number, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "payout_initiated"))) return;
  await send(email, `Withdrawal of $${amount.toFixed(2)} initiated`, wrap(`
    <h1 style="color: #1E3A5F;">Withdrawal Initiated</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, your withdrawal of <strong>$${amount.toFixed(2)}</strong> has been submitted to your bank account.</p>
    <div style="background: #F0F9FF; padding: 16px; border-radius: 8px; margin: 16px 0;">
      <p style="margin: 0; color: #0284C7;"><strong>Amount:</strong> $${amount.toFixed(2)}</p>
      <p style="margin: 0; color: #0284C7;"><strong>Date:</strong> ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
    </div>
    <p style="color: #444;">Funds typically arrive within 2–3 business days.</p>
    ${btn(`${BASE}/wallet`, "View Wallet")}
  `, userId), userId);
}

export async function sendPayoutFailedEmail(
  email: string, firstName: string, amount: number, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "payout_failed"))) return;
  await send(email, `Withdrawal of $${amount.toFixed(2)} failed`, wrap(`
    <h1 style="color: #B91C1C;">Withdrawal Failed</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, your withdrawal of <strong>$${amount.toFixed(2)}</strong> could not be completed. The funds have been returned to your CouthActs wallet.</p>
    <p style="color: #444;">Please verify your bank account details in Stripe Connect settings and try again.</p>
    ${btn(`${BASE}/wallet`, "View Wallet")}
  `, userId), userId);
}

export async function sendStripeConnectReadyEmail(
  email: string, firstName: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "stripe_connect_ready"))) return;
  await send(email, "Stripe Connect is ready — you can now receive payouts!", wrap(`
    <h1 style="color: #1E3A5F;">Payouts Enabled!</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, your Stripe Connect account is fully set up. You can now withdraw earnings from your CouthActs wallet directly to your bank account.</p>
    ${btn(`${BASE}/wallet`, "Go to Wallet")}
  `, userId), userId);
}

export async function sendReviewReceivedEmail(
  email: string, firstName: string, rating: number,
  reviewerName: string, postingTitle: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "review_received"))) return;
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
  await send(email, `New ${rating}-star review on "${esc(postingTitle)}"`, wrap(`
    <h1 style="color: #1E3A5F;">New Review Received</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, <strong>${esc(reviewerName)}</strong> left a review on <strong>"${esc(postingTitle)}"</strong>.</p>
    <div style="background: #F0F9FF; padding: 16px; border-radius: 8px; margin: 16px 0; text-align: center;">
      <p style="margin: 0; font-size: 24px; color: #F59E0B;">${stars}</p>
    </div>
    ${btn(`${BASE}/dashboard`, "View Dashboard")}
  `, userId), userId);
}

export async function sendScoreTierChangeEmail(
  email: string, firstName: string, newTier: string, score: number,
  previousTier: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "score_tier_change"))) return;
  const upgraded = ["PROBATION", "ESTABLISHED", "TRUSTED", "ELITE"].indexOf(newTier) >
    ["PROBATION", "ESTABLISHED", "TRUSTED", "ELITE"].indexOf(previousTier);
  const tierLabels: Record<string, string> = {
    ELITE: "Elite (90–100)",
    TRUSTED: "Trusted (75–89)",
    ESTABLISHED: "Established (60–74)",
    PROBATION: "Probation (0–59)",
  };
  const perks: Record<string, string> = {
    ELITE: "Finance Advances, priority job matching, and highest advance limits.",
    TRUSTED: "Finance Advances and enhanced visibility to customers.",
    ESTABLISHED: "Full platform access and eligibility for more job types.",
    PROBATION: "Complete jobs on time and earn positive reviews to improve your tier.",
  };
  await send(email, upgraded
    ? `Congratulations! You've reached ${esc(newTier)} tier`
    : `CouthActs Score update: ${esc(newTier)} tier`, wrap(`
    <h1 style="color: ${upgraded ? "#1E3A5F" : "#B91C1C"};">${upgraded ? "Tier Upgrade!" : "Tier Update"}</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, your CouthActs Score is now <strong>${score}</strong> and your tier has changed from <strong>${esc(previousTier)}</strong> to <strong>${esc(newTier)}</strong>.</p>
    <div style="background: ${upgraded ? "#F0F9FF" : "#FEF2F2"}; padding: 16px; border-radius: 8px; margin: 16px 0;">
      <p style="margin: 0; color: ${upgraded ? "#0284C7" : "#B91C1C"};"><strong>New Tier:</strong> ${tierLabels[newTier] || newTier}</p>
      <p style="margin: 4px 0 0; color: #444;">${perks[newTier] || ""}</p>
    </div>
    ${btn(`${BASE}/dashboard`, "View Dashboard")}
  `, userId), userId);
}

export async function sendAdvanceDisbursedEmail(
  email: string, firstName: string, advanceAmount: number,
  advanceFee: number, escrowAmount: number, bookingId: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "advance_disbursed"))) return;
  await send(email, `Advance of $${advanceAmount.toFixed(2)} credited to your wallet`, wrap(`
    <h1 style="color: #1E3A5F;">Advance Disbursed</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, your finance advance has been processed and credited to your wallet.</p>
    <div style="background: #F0F9FF; padding: 16px; border-radius: 8px; margin: 16px 0;">
      <p style="margin: 0; color: #0284C7;"><strong>Escrow Amount:</strong> $${escrowAmount.toFixed(2)}</p>
      <p style="margin: 4px 0 0; color: #0284C7;"><strong>Advance (70%):</strong> $${advanceAmount.toFixed(2)}</p>
      <p style="margin: 4px 0 0; color: #0284C7;"><strong>Fee (2.5%):</strong> $${advanceFee.toFixed(2)}</p>
    </div>
    <p style="color: #444;">The fee of $${advanceFee.toFixed(2)} will be deducted when the job is completed and escrow is released.</p>
    ${btn(`${BASE}/bookings/${bookingId}`, "View Booking")}
  `, userId), userId);
}

export async function sendCourseEnrolledEmail(
  email: string, firstName: string, courseTitle: string,
  pricePaid: number, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "course_enrolled"))) return;
  await send(email, `Enrolled: ${esc(courseTitle)}`, wrap(`
    <h1 style="color: #1E3A5F;">Course Enrollment Confirmed</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, you've successfully enrolled in <strong>"${esc(courseTitle)}"</strong>.</p>
    ${pricePaid > 0 ? `<div style="background: #F0F9FF; padding: 16px; border-radius: 8px; margin: 16px 0;">
      <p style="margin: 0; color: #0284C7;"><strong>Amount Charged:</strong> $${pricePaid.toFixed(2)} from your wallet</p>
    </div>` : ""}
    <p style="color: #444;">Start your lessons now and complete all modules before taking the exam.</p>
    ${btn(`${BASE}/academy`, "Go to Academy")}
  `, userId), userId);
}

export async function sendExamResultEmail(
  email: string, firstName: string, courseTitle: string,
  score: number, passed: boolean, certificateId: string | null, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "exam_result"))) return;
  await send(email, passed
    ? `Exam passed: ${esc(courseTitle)} — ${score}%`
    : `Exam result: ${esc(courseTitle)} — ${score}%`, wrap(`
    <h1 style="color: ${passed ? "#1E3A5F" : "#B91C1C"};">${passed ? "Exam Passed!" : "Exam Not Passed"}</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, here are your results for <strong>"${esc(courseTitle)}"</strong>:</p>
    <div style="background: ${passed ? "#F0F9FF" : "#FEF2F2"}; padding: 16px; border-radius: 8px; margin: 16px 0; text-align: center;">
      <p style="margin: 0; font-size: 32px; color: ${passed ? "#0284C7" : "#B91C1C"};"><strong>${score}%</strong></p>
      <p style="margin: 4px 0 0; color: #444;">${passed ? "Passing grade: 70%" : "Required: 70% — you can retake after 24 hours"}</p>
    </div>
    ${passed && certificateId ? `<p style="color: #444;">Your certificate ID: <strong>${esc(certificateId)}</strong></p>` : ""}
    ${btn(`${BASE}/academy`, passed ? "View Certificate" : "Review & Retake")}
  `, userId), userId);
}

export async function sendAccountSuspendedEmail(
  email: string, firstName: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "account_suspended"))) return;
  await send(email, "Your CouthActs account has been suspended", wrap(`
    <h1 style="color: #B91C1C;">Account Suspended</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, your CouthActs account has been suspended by our team.</p>
    <p style="color: #444;">While suspended, you cannot post jobs, place bids, or withdraw funds. Any active bookings remain unaffected until completion.</p>
    <p style="color: #444;">If you believe this is an error, please contact us at <a href="mailto:support@couthacts.com" style="color: #2563EB;">support@couthacts.com</a>.</p>
  `, userId), userId);
}

export async function sendAccountReactivatedEmail(
  email: string, firstName: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "account_reactivated"))) return;
  await send(email, "Your CouthActs account has been reactivated", wrap(`
    <h1 style="color: #1E3A5F;">Account Reactivated</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, your CouthActs account is now active again. You can post jobs, place bids, and use all platform features.</p>
    ${btn(`${BASE}/dashboard`, "Go to Dashboard")}
  `, userId), userId);
}

export async function sendKycRejectedEmail(
  email: string, firstName: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "kyc_rejected"))) return;
  await send(email, "Identity verification was not approved", wrap(`
    <h1 style="color: #B91C1C;">Verification Not Approved</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, your identity verification was not approved. This may be due to document quality, a name mismatch, or an expired ID.</p>
    <p style="color: #444;">You can resubmit your verification from Settings. If you need assistance, contact <a href="mailto:support@couthacts.com" style="color: #2563EB;">support@couthacts.com</a>.</p>
    ${btn(`${BASE}/settings`, "Go to Settings")}
  `, userId), userId);
}

export async function sendBusinessApprovedEmail(
  email: string, firstName: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "business_approved"))) return;
  await send(email, "Business verification approved", wrap(`
    <h1 style="color: #1E3A5F;">Business Verified!</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, your business documents have been reviewed and approved. You can now bid on jobs that require business verification.</p>
    ${btn(`${BASE}/dashboard`, "Go to Dashboard")}
  `, userId), userId);
}

export async function sendBusinessRejectedEmail(
  email: string, firstName: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "business_rejected"))) return;
  await send(email, "Business verification was not approved", wrap(`
    <h1 style="color: #B91C1C;">Business Verification Not Approved</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, your business documents were not approved. Please review your submitted documents and ensure they are valid, legible, and unexpired.</p>
    <p style="color: #444;">You can resubmit from your provider settings, or contact <a href="mailto:support@couthacts.com" style="color: #2563EB;">support@couthacts.com</a> for assistance.</p>
    ${btn(`${BASE}/settings`, "Resubmit Documents")}
  `, userId), userId);
}

export async function sendReverificationRequiredEmail(
  email: string, firstName: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "reverification_required"))) return;
  await send(email, "Re-verification required — profile name changed", wrap(`
    <h1 style="color: #B91C1C;">Re-verification Required</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, because you changed your name on your profile, your identity verification has been reset for security purposes.</p>
    <p style="color: #444;">Please re-verify your identity to continue posting jobs and placing bids.</p>
    ${btn(`${BASE}/settings`, "Verify Identity")}
  `, userId), userId);
}

export async function sendApiOverageEmail(
  email: string, firstName: string, overageCalls: number,
  chargedAmount: number, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "api_overage"))) return;
  await send(email, `API overage: $${chargedAmount.toFixed(2)} charged for ${overageCalls} calls`, wrap(`
    <h1 style="color: #1E3A5F;">API Overage Billing</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, your API usage exceeded the included quota last month. Here's the breakdown:</p>
    <div style="background: #F0F9FF; padding: 16px; border-radius: 8px; margin: 16px 0;">
      <p style="margin: 0; color: #0284C7;"><strong>Overage Calls:</strong> ${overageCalls.toLocaleString()}</p>
      <p style="margin: 4px 0 0; color: #0284C7;"><strong>Rate:</strong> $0.20 per call</p>
      <p style="margin: 4px 0 0; color: #0284C7;"><strong>Total Charged:</strong> $${chargedAmount.toFixed(2)}</p>
    </div>
    <p style="color: #444;">This amount was deducted from your CouthActs wallet. Review your usage in Settings.</p>
    ${btn(`${BASE}/settings`, "View API Usage")}
  `, userId), userId);
}

export async function sendApplicationConfirmationEmail(
  email: string, firstName: string, role: string
) {
  await send(email, `Application received: ${esc(role)}`, wrap(`
    <h1 style="color: #1E3A5F;">Application Received</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, thank you for applying for the <strong>${esc(role)}</strong> position at CouthActs.</p>
    <p style="color: #444;">Our hiring team will review your application and get back to you within 5–7 business days. We appreciate your interest in joining CouthActs.</p>
  `));
}

export async function sendInquiryConfirmationEmail(
  email: string, name: string, type: string
) {
  const label = type === "government" ? "government/NGO" : "enterprise";
  await send(email, "We received your inquiry", wrap(`
    <h1 style="color: #1E3A5F;">Inquiry Received</h1>
    <p style="color: #444;">Hi ${esc(name)}, thank you for your ${esc(label)} inquiry. Our team will review your requirements and reach out within 2–3 business days.</p>
    <p style="color: #444;">For urgent inquiries, contact us directly at <a href="mailto:enterprise@couthacts.com" style="color: #2563EB;">enterprise@couthacts.com</a>.</p>
  `));
}

export async function sendPostingExpiredEmail(
  email: string, firstName: string, postingTitle: string,
  refundAmount: number, isInstant: boolean, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "posting_expired"))) return;
  await send(email, `Posting expired: ${esc(postingTitle)}`, wrap(`
    <h1 style="color: #B91C1C;">Posting Expired</h1>
    <p style="color: #444;">Hi ${esc(firstName)}, your ${isInstant ? "instant job" : "posting"} <strong>"${esc(postingTitle)}"</strong> has expired without being accepted.</p>
    ${refundAmount > 0 ? `<div style="background: #F0F9FF; padding: 16px; border-radius: 8px; margin: 16px 0;">
      <p style="margin: 0; color: #0284C7;"><strong>Refunded:</strong> $${refundAmount.toFixed(2)} returned to your wallet</p>
    </div>` : ""}
    <p style="color: #444;">${isInstant ? "Try increasing your budget or posting during peak hours." : "Consider adjusting your budget or requirements to attract more bids."}</p>
    ${btn(`${BASE}/dashboard`, "Post a New Job")}
  `, userId), userId);
}

// ─── Lifecycle emails ──────────────────────────────────

/**
 * Sent ~24h after a posting was created if no bid has been accepted yet.
 * Nudges the customer to compare bids, adjust budget, or post again.
 */
export async function sendPostingAbandonedEmail(
  email: string, firstName: string, postingTitle: string, postingId: string,
  bidCount: number, userId: string
) {
  if (!(await shouldSendEmail(userId, "posting_abandoned"))) return;
  await send(email, `Your "${esc(postingTitle)}" is still waiting`, wrap(`
    <h1 style="color: #1E3A5F;">Hey ${esc(firstName)} — your move is still open</h1>
    <p style="color: #444; line-height: 1.6;">Your posting <strong>"${esc(postingTitle)}"</strong> hasn't been booked yet.${bidCount > 0 ? ` You have <strong>${bidCount} bid${bidCount === 1 ? '' : 's'}</strong> waiting for your review.` : " No bids yet — a quick budget adjustment often helps."}</p>
    <p style="color: #444;">A few things that tend to help:</p>
    <ul style="color: #444; line-height: 1.8;">
      <li>Review current bids and pick one you like</li>
      <li>Increase your budget slightly if you need faster response</li>
      <li>Add flexibility on pickup date if you can</li>
    </ul>
    ${btn(`${BASE}/postings/${postingId}`, bidCount > 0 ? "Review your bids" : "Manage your posting")}
  `, userId), userId);
}

/**
 * Sent after a user's FIRST booking completes. Big-win congratulations plus
 * a referral nudge.
 */
export async function sendFirstCompletionEmail(
  email: string, firstName: string, postingTitle: string, userId: string
) {
  if (!(await shouldSendEmail(userId, "first_completion"))) return;
  await send(email, "🎉 Your first CouthActs move is done!", wrap(`
    <h1 style="color: #34C759;">Nailed it, ${esc(firstName)}!</h1>
    <p style="color: #444; line-height: 1.6;">Your first move on CouthActs — <strong>"${esc(postingTitle)}"</strong> — just completed. That's a milestone worth celebrating.</p>
    <p style="color: #444;">Want to help a friend out? Share your invite code and you'll both get $25 in wallet credit when they book.</p>
    ${btn(`${BASE}/invite`, "Share CouthActs")}
    <p style="color: #888; font-size: 13px; margin-top: 24px;">Leave a review on the provider — it helps the next person book with confidence.</p>
  `, userId), userId);
}

/**
 * Sent 3 days after a first completion. Two short questions.
 */
export async function sendNpsEmail(
  email: string, firstName: string, userId: string
) {
  if (!(await shouldSendEmail(userId, "nps_survey"))) return;
  const surveyBase = `${BASE}/feedback?u=${encodeURIComponent(userId)}`;
  await send(email, "Got 30 seconds for us?", wrap(`
    <h1 style="color: #1E3A5F;">How'd it go, ${esc(firstName)}?</h1>
    <p style="color: #444; line-height: 1.6;">On a scale of 0–10, how likely are you to recommend CouthActs to a friend?</p>
    <div style="text-align: center; margin: 24px 0;">
      ${Array.from({ length: 11 }).map((_, n) => `<a href="${surveyBase}&score=${n}" style="display: inline-block; width: 34px; height: 34px; line-height: 34px; text-align: center; background: ${n <= 6 ? '#FFE5E3' : n <= 8 ? '#FFF3E0' : '#EEFBF1'}; color: #1D1D1F; font-weight: 600; text-decoration: none; border-radius: 8px; margin: 2px;">${n}</a>`).join('')}
    </div>
    <p style="color: #888; font-size: 13px; text-align: center;">One click and we're done. Thank you.</p>
  `, userId), userId);
}

/**
 * Sent after 30 days of inactivity (no postings, no bookings, no logins).
 */
export async function sendInactivityEmail(
  email: string, firstName: string, userId: string
) {
  if (!(await shouldSendEmail(userId, "inactivity"))) return;
  await send(email, "We miss you at CouthActs", wrap(`
    <h1 style="color: #1E3A5F;">Hey ${esc(firstName)} 👋</h1>
    <p style="color: #444; line-height: 1.6;">It's been a while. Just a friendly check-in to say — we're still here, and the platform's better than when you left.</p>
    <ul style="color: #444; line-height: 1.8;">
      <li>Thousands of new verified providers</li>
      <li>Instant quotes on popular routes</li>
      <li>A smoother escrow flow (seriously, try it)</li>
    </ul>
    ${btn(`${BASE}/dashboard`, "Book something")}
  `, userId), userId);
}

/**
 * Sent when a referral qualifies — both parties get this to celebrate the win.
 */
export async function sendReferralQualifiedEmail(
  email: string, firstName: string, rewardUsd: number, userId: string
) {
  if (!(await shouldSendEmail(userId, "referral_qualified"))) return;
  await send(email, `$${rewardUsd.toFixed(0)} added to your wallet 🎁`, wrap(`
    <h1 style="color: #34C759;">Ka-ching, ${esc(firstName)}!</h1>
    <p style="color: #444; line-height: 1.6;">A friend you invited just completed their first move. We've added <strong>$${rewardUsd.toFixed(2)}</strong> to your wallet as a thank-you.</p>
    ${btn(`${BASE}/wallet`, "View your wallet")}
    <p style="color: #888; font-size: 13px; margin-top: 16px;">Keep sharing — no cap on how many bonuses you can earn.</p>
  `, userId), userId);
}
