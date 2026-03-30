import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY!);
  }
  return _resend;
}

const FROM = process.env.RESEND_FROM_EMAIL || "CouthActs <onboarding@resend.dev>";

export async function sendWelcomeEmail(email: string, firstName: string) {
  if (!process.env.RESEND_API_KEY) return;
  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: "Welcome to CouthActs!",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1E3A5F;">Welcome to CouthActs, ${firstName}!</h1>
        <p style="color: #444; line-height: 1.6;">
          You've joined the global multimodal transportation marketplace.
          Whether you're shipping cargo across the ocean or booking a ride across town,
          CouthActs connects you with verified providers across 18 transport modes.
        </p>
        <p style="color: #444;">
          <strong>Next steps:</strong>
        </p>
        <ul style="color: #444; line-height: 1.8;">
          <li>Top up your wallet to start posting jobs</li>
          <li>Browse verified providers on the marketplace</li>
          <li>Post your first transport job</li>
        </ul>
        <a href="${process.env.NEXTAUTH_URL}/dashboard"
           style="display: inline-block; background: #2563EB; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">
          Go to Dashboard
        </a>
      </div>
    `,
  });
}

export async function sendBookingConfirmationEmail(
  email: string,
  firstName: string,
  postingTitle: string,
  trackingCode: string,
  bookingId: string
) {
  if (!process.env.RESEND_API_KEY) return;
  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: `Booking confirmed: ${postingTitle}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1E3A5F;">Booking Confirmed!</h1>
        <p style="color: #444;">Hi ${firstName}, your booking for <strong>${postingTitle}</strong> has been confirmed.</p>
        <div style="background: #F0F9FF; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 0; color: #0284C7;"><strong>Tracking Code:</strong> ${trackingCode}</p>
        </div>
        <p style="color: #444;">Escrow funds are being held securely. The provider will only be paid once you confirm delivery.</p>
        <a href="${process.env.NEXTAUTH_URL}/bookings/${bookingId}"
           style="display: inline-block; background: #2563EB; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">
          View Booking
        </a>
      </div>
    `,
  });
}

export async function sendEscrowReleasedEmail(
  email: string,
  firstName: string,
  amount: number
) {
  if (!process.env.RESEND_API_KEY) return;
  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: `Payment of $${amount.toFixed(2)} released to your wallet`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1E3A5F;">Payment Released!</h1>
        <p style="color: #444;">Hi ${firstName}, <strong>$${amount.toFixed(2)}</strong> has been released to your CouthActs wallet.</p>
        <a href="${process.env.NEXTAUTH_URL}/wallet"
           style="display: inline-block; background: #2563EB; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">
          View Wallet
        </a>
      </div>
    `,
  });
}

export async function sendNewBidEmail(
  email: string,
  firstName: string,
  postingTitle: string,
  providerName: string,
  bidAmount: string,
  postingId: string
) {
  if (!process.env.RESEND_API_KEY) return;
  const baseUrl = process.env.NEXTAUTH_URL || "https://couthacts.com";
  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: `New bid on "${postingTitle}"`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1E3A5F;">You've Got a New Bid!</h1>
        <p style="color: #444;">Hi ${firstName}, <strong>${providerName}</strong> placed a bid of <strong>${bidAmount}</strong> on your posting <strong>"${postingTitle}"</strong>.</p>
        <p style="color: #444;">Log in to review the bid, check the provider's CouthActs&trade; Score, and accept or wait for more offers.</p>
        <a href="${baseUrl}/postings/${postingId}"
           style="display: inline-block; background: #2563EB; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">
          View Bids
        </a>
      </div>
    `,
  });
}

export async function sendBidAcceptedEmail(
  email: string,
  firstName: string,
  postingTitle: string,
  agreedAmount: string,
  bookingId: string
) {
  if (!process.env.RESEND_API_KEY) return;
  const baseUrl = process.env.NEXTAUTH_URL || "https://couthacts.com";
  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: `Your bid on "${postingTitle}" was accepted!`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1E3A5F;">Bid Accepted!</h1>
        <p style="color: #444;">Hi ${firstName}, your bid of <strong>${agreedAmount}</strong> on <strong>"${postingTitle}"</strong> has been accepted.</p>
        <p style="color: #444;">You can now start the job. The customer's funds are held in escrow and will be released to your wallet upon completion.</p>
        <a href="${baseUrl}/bookings/${bookingId}"
           style="display: inline-block; background: #2563EB; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">
          View Booking
        </a>
      </div>
    `,
  });
}

export async function sendDisputeFiledEmail(
  email: string,
  firstName: string,
  postingTitle: string,
  bookingId: string
) {
  if (!process.env.RESEND_API_KEY) return;
  await getResend().emails.send({
    from: FROM,
    to: email,
    subject: `Dispute filed on: ${postingTitle}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #B91C1C;">Dispute Filed</h1>
        <p style="color: #444;">Hi ${firstName}, a dispute has been filed on the booking for <strong>${postingTitle}</strong>.</p>
        <p style="color: #444;">Escrow funds are frozen until the dispute is resolved. Our team will review and reach out.</p>
        <a href="${process.env.NEXTAUTH_URL}/bookings/${bookingId}"
           style="display: inline-block; background: #2563EB; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">
          View Booking
        </a>
      </div>
    `,
  });
}
