import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sendInquiryConfirmationEmail } from "@/lib/email";

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY!);
  return _resend;
}

const FROM = process.env.RESEND_FROM_EMAIL || "CouthActs <no-reply@couthacts.com>";

/**
 * POST /api/enterprise-inquiry — Receive enterprise and government sales inquiries.
 * Validates required fields and sends a notification email to the sales team.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, company, phone, volume, modes, message, type } = body as {
      name?: string;
      email?: string;
      company?: string;
      phone?: string;
      volume?: string;
      modes?: string;
      message?: string;
      type?: string;
    };

    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "Name, email, and company/organization are required." },
        { status: 400 },
      );
    }

    const isGovernment = type === "government";
    const recipient = isGovernment ? "government@couthacts.com" : "sales@couthacts.com";
    const label = isGovernment ? "Government / NGO" : "Enterprise";

    if (process.env.RESEND_API_KEY) {
      await getResend().emails.send({
        from: FROM,
        to: recipient,
        subject: `New ${label} Inquiry from ${name} (${company})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1E3A5F;">New ${label} Inquiry</h1>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr><td style="padding: 8px 0; color: #6E6E73; width: 140px;">Name</td><td style="padding: 8px 0; color: #1D1D1F;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #6E6E73;">Organization</td><td style="padding: 8px 0; color: #1D1D1F;">${company}</td></tr>
              <tr><td style="padding: 8px 0; color: #6E6E73;">Email</td><td style="padding: 8px 0; color: #1D1D1F;">${email}</td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #6E6E73;">Phone</td><td style="padding: 8px 0; color: #1D1D1F;">${phone}</td></tr>` : ""}
              ${volume ? `<tr><td style="padding: 8px 0; color: #6E6E73;">Annual Spend</td><td style="padding: 8px 0; color: #1D1D1F;">${volume}</td></tr>` : ""}
              ${modes ? `<tr><td style="padding: 8px 0; color: #6E6E73;">Transport Modes</td><td style="padding: 8px 0; color: #1D1D1F;">${modes}</td></tr>` : ""}
            </table>
            ${message ? `<div style="margin-top: 16px; padding: 16px; background: #F0F9FF; border-radius: 8px;"><p style="margin: 0; color: #444;">${message}</p></div>` : ""}
            <p style="margin-top: 24px; color: #86868B; font-size: 12px;">Submitted at ${new Date().toISOString()}</p>
          </div>
        `,
      });
    }

    // Send confirmation to the inquirer
    sendInquiryConfirmationEmail(email, name, type || "enterprise").catch(() => {});

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process inquiry. Please try again." },
      { status: 500 },
    );
  }
}
