import { NextRequest, NextResponse } from "next/server";
import { getResend, sendApplicationConfirmationEmail, escapeHtml as esc } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

const FROM = process.env.RESEND_FROM_EMAIL || "CouthActs <no-reply@couthacts.com>";

/**
 * POST /api/careers/apply — receive job applications with resume upload.
 * Sends a notification email to the hiring team with applicant details.
 */
export async function POST(req: NextRequest) {
  const blocked = rateLimit(req, 5, "careers-apply");
  if (blocked) return blocked;

  try {
    const formData = await req.formData();

    const role = formData.get("role") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string) || "";
    const linkedin = (formData.get("linkedin") as string) || "";
    const portfolio = (formData.get("portfolio") as string) || "";
    const coverLetter = formData.get("coverLetter") as string;
    const resume = formData.get("resume") as File | null;

    if (!firstName || !lastName || !email || !coverLetter || !role) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!resume || resume.size === 0) {
      return NextResponse.json(
        { error: "Resume is required." },
        { status: 400 }
      );
    }

    if (resume.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Resume must be under 5 MB." },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(resume.type)) {
      return NextResponse.json(
        { error: "Resume must be a PDF or Word document." },
        { status: 400 }
      );
    }

    // Convert resume to base64 for email attachment
    const bytes = await resume.arrayBuffer();
    const resumeBase64 = Buffer.from(bytes).toString("base64");
    const resumeSizeKB = (resume.size / 1024).toFixed(1);

    const coverLetterSummary =
      coverLetter.slice(0, 500) + (coverLetter.length > 500 ? "..." : "");
    const submittedAt = new Date().toISOString();

    // Send notification email to the hiring team with resume attached
    await getResend().emails.send({
      from: FROM,
      to: "careers@couthacts.com",
      subject: `New Application: ${firstName} ${lastName} — ${role}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1E3A5F;">New Job Application</h1>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px; font-weight: bold; color: #444;">Role</td><td style="padding: 8px;">${esc(role)}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #444;">Name</td><td style="padding: 8px;">${esc(firstName)} ${esc(lastName)}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #444;">Email</td><td style="padding: 8px;">${esc(email)}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #444;">Phone</td><td style="padding: 8px;">${esc(phone) || "N/A"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #444;">LinkedIn</td><td style="padding: 8px;">${linkedin ? esc(linkedin) : "N/A"}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #444;">Portfolio</td><td style="padding: 8px;">${portfolio ? esc(portfolio) : "N/A"}</td></tr>
          </table>
          <h2 style="color: #1E3A5F;">Cover Letter</h2>
          <p style="color: #444; line-height: 1.6; white-space: pre-wrap;">${esc(coverLetterSummary)}</p>
          <h2 style="color: #1E3A5F;">Resume</h2>
          <p style="color: #444;">File: <strong>${esc(resume.name)}</strong> (${resumeSizeKB} KB) — attached below.</p>
          <p style="color: #888; font-size: 12px;">Submitted at ${submittedAt}</p>
        </div>
      `,
      attachments: [
        {
          filename: resume.name,
          content: resumeBase64,
        },
      ],
    });

    // Send confirmation to applicant
    sendApplicationConfirmationEmail(email, firstName, role).catch((err) => console.error("[CouthActs]", err));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process application. Please try again." },
      { status: 500 }
    );
  }
}
