import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

/**
 * POST /api/careers/apply — receive job applications with resume upload.
 * Stores the resume to disk and logs the application.
 * In production, this would forward to an ATS or send via Resend/SendGrid.
 */
export async function POST(req: NextRequest) {
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

    if (resume.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Resume must be under 10 MB." },
        { status: 400 }
      );
    }

    // Save resume to disk
    const uploadsDir = join(process.cwd(), "uploads", "applications");
    await mkdir(uploadsDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const safeName = `${firstName}-${lastName}-${timestamp}`.replace(/[^a-zA-Z0-9-]/g, "");
    const ext = resume.name.split(".").pop() || "pdf";
    const filename = `${safeName}.${ext}`;
    const filepath = join(uploadsDir, filename);

    const bytes = await resume.arrayBuffer();
    await writeFile(filepath, Buffer.from(bytes));

    // Log the application (in production: store in DB + send notification email)
    const application = {
      role,
      name: `${firstName} ${lastName}`,
      email,
      phone,
      linkedin,
      portfolio,
      coverLetter: coverLetter.slice(0, 500) + (coverLetter.length > 500 ? "..." : ""),
      resumeFile: filename,
      submittedAt: new Date().toISOString(),
    };

    // Save application metadata
    const metaPath = join(uploadsDir, `${safeName}.json`);
    await writeFile(metaPath, JSON.stringify(application, null, 2));

    console.log(`[CAREERS] New application: ${application.name} for ${application.role}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[CAREERS] Application error:", err);
    return NextResponse.json(
      { error: "Failed to process application. Please try again." },
      { status: 500 }
    );
  }
}
