import { Resend } from "resend";
import { db } from "@/lib/db";

let _resend: Resend | null = null;

function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY!);
  }
  return _resend;
}

const FROM = process.env.RESEND_FROM_EMAIL || "CouthActs <onboarding@resend.dev>";
const BASE = process.env.NEXTAUTH_URL || "https://couthacts.com";

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

async function send(email: string, subject: string, html: string) {
  await getResend().emails.send({ from: FROM, to: email, subject, html });
}

function wrap(body: string): string {
  return `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">${body}</div>`;
}

function btn(href: string, text: string): string {
  return `<a href="${href}" style="display: inline-block; background: #2563EB; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">${text}</a>`;
}

// ─── Email functions ───────────────────────────────────

export async function sendWelcomeEmail(email: string, firstName: string) {
  await send(email, "Welcome to CouthActs!", wrap(`
    <h1 style="color: #1E3A5F;">Welcome to CouthActs, ${firstName}!</h1>
    <p style="color: #444; line-height: 1.6;">You've joined the global multimodal transportation marketplace. Whether you're shipping cargo across the ocean or booking a ride across town, CouthActs connects you with verified providers across 18 transport modes.</p>
    <p style="color: #444;"><strong>Next steps:</strong></p>
    <ul style="color: #444; line-height: 1.8;">
      <li>Top up your wallet to start posting jobs</li>
      <li>Verify your identity in Settings</li>
      <li>Post your first transport job</li>
    </ul>
    ${btn(`${BASE}/dashboard`, "Go to Dashboard")}
  `));
}

export async function sendNewBidEmail(
  email: string, firstName: string, postingTitle: string,
  providerName: string, bidAmount: string, postingId: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "new_bid"))) return;
  await send(email, `New bid on "${postingTitle}"`, wrap(`
    <h1 style="color: #1E3A5F;">You've Got a New Bid!</h1>
    <p style="color: #444;">Hi ${firstName}, <strong>${providerName}</strong> placed a bid of <strong>${bidAmount}</strong> on your posting <strong>"${postingTitle}"</strong>.</p>
    <p style="color: #444;">Log in to review the bid, check the provider's CouthActs&trade; Score, and accept or wait for more offers.</p>
    ${btn(`${BASE}/postings/${postingId}`, "View Bids")}
  `));
}

export async function sendBidAcceptedEmail(
  email: string, firstName: string, postingTitle: string,
  agreedAmount: string, bookingId: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "bid_accepted"))) return;
  await send(email, `Your bid on "${postingTitle}" was accepted!`, wrap(`
    <h1 style="color: #1E3A5F;">Bid Accepted!</h1>
    <p style="color: #444;">Hi ${firstName}, your bid of <strong>${agreedAmount}</strong> on <strong>"${postingTitle}"</strong> has been accepted.</p>
    <p style="color: #444;">You can now start the job. The customer's funds are held in escrow and will be released to your wallet upon completion.</p>
    ${btn(`${BASE}/bookings/${bookingId}`, "View Booking")}
  `));
}

export async function sendBookingConfirmationEmail(
  email: string, firstName: string, postingTitle: string,
  trackingCode: string, bookingId: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "booking_confirmed"))) return;
  await send(email, `Booking confirmed: ${postingTitle}`, wrap(`
    <h1 style="color: #1E3A5F;">Booking Confirmed!</h1>
    <p style="color: #444;">Hi ${firstName}, your booking for <strong>${postingTitle}</strong> has been confirmed.</p>
    <div style="background: #F0F9FF; padding: 16px; border-radius: 8px; margin: 16px 0;">
      <p style="margin: 0; color: #0284C7;"><strong>Tracking Code:</strong> ${trackingCode}</p>
    </div>
    <p style="color: #444;">Escrow funds are being held securely. The provider will only be paid once you confirm delivery.</p>
    ${btn(`${BASE}/bookings/${bookingId}`, "View Booking")}
  `));
}

export async function sendBookingStartedEmail(
  email: string, firstName: string, postingTitle: string,
  bookingId: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "booking_started"))) return;
  await send(email, `Job started: ${postingTitle}`, wrap(`
    <h1 style="color: #1E3A5F;">Your Job Has Started!</h1>
    <p style="color: #444;">Hi ${firstName}, the provider has started working on <strong>"${postingTitle}"</strong>.</p>
    <p style="color: #444;">You can track progress in real-time from your booking page.</p>
    ${btn(`${BASE}/bookings/${bookingId}`, "Track Job")}
  `));
}

export async function sendBookingCompletedEmail(
  email: string, firstName: string, postingTitle: string,
  bookingId: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "booking_completed"))) return;
  await send(email, `Job completed: ${postingTitle}`, wrap(`
    <h1 style="color: #1E3A5F;">Job Complete!</h1>
    <p style="color: #444;">Hi ${firstName}, <strong>"${postingTitle}"</strong> has been completed.</p>
    <p style="color: #444;">Both parties have confirmed. Thank you for using CouthActs!</p>
    ${btn(`${BASE}/bookings/${bookingId}`, "View Booking")}
  `));
}

export async function sendEscrowReleasedEmail(
  email: string, firstName: string, amount: number, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "escrow_released"))) return;
  await send(email, `Payment of $${amount.toFixed(2)} released to your wallet`, wrap(`
    <h1 style="color: #1E3A5F;">Payment Released!</h1>
    <p style="color: #444;">Hi ${firstName}, <strong>$${amount.toFixed(2)}</strong> has been released to your CouthActs wallet.</p>
    ${btn(`${BASE}/wallet`, "View Wallet")}
  `));
}

export async function sendEscrowRefundedEmail(
  email: string, firstName: string, amount: number, bookingId: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "escrow_refunded"))) return;
  await send(email, `Escrow refund: $${amount.toFixed(2)} returned to your wallet`, wrap(`
    <h1 style="color: #1E3A5F;">Escrow Refunded</h1>
    <p style="color: #444;">Hi ${firstName}, <strong>$${amount.toFixed(2)}</strong> has been refunded to your CouthActs wallet.</p>
    ${btn(`${BASE}/bookings/${bookingId}`, "View Details")}
  `));
}

export async function sendDisputeFiledEmail(
  email: string, firstName: string, postingTitle: string,
  bookingId: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "dispute_filed"))) return;
  await send(email, `Dispute filed on: ${postingTitle}`, wrap(`
    <h1 style="color: #B91C1C;">Dispute Filed</h1>
    <p style="color: #444;">Hi ${firstName}, a dispute has been filed on the booking for <strong>${postingTitle}</strong>.</p>
    <p style="color: #444;">Escrow funds are frozen until the dispute is resolved. Our team will review and reach out.</p>
    ${btn(`${BASE}/bookings/${bookingId}`, "View Booking")}
  `));
}

export async function sendVerificationApprovedEmail(
  email: string, firstName: string, userId?: string
) {
  if (userId && !(await shouldSendEmail(userId, "verification_approved"))) return;
  await send(email, "Identity verified — you're all set!", wrap(`
    <h1 style="color: #1E3A5F;">You're Verified!</h1>
    <p style="color: #444;">Hi ${firstName}, your identity has been verified on CouthActs.</p>
    <p style="color: #444;">You can now post transportation needs and bid on opportunities.</p>
    ${btn(`${BASE}/dashboard`, "Go to Dashboard")}
  `));
}
