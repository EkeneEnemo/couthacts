import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import {
  sendAccountSuspendedEmail, sendAccountReactivatedEmail,
  sendKycRejectedEmail, sendBusinessApprovedEmail, sendBusinessRejectedEmail,
  sendVerificationApprovedEmail,
} from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

async function checkAdmin() {
  const session = await getSession();
  if (!session || session.user.role !== "ADMIN") return null;
  return session;
}

/**
 * GET /api/admin/users — List all users with filters.
 */
export async function GET(req: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");
  const kyc = searchParams.get("kyc");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 20;

  const where: Record<string, unknown> = {};
  if (role) where.role = role;
  if (kyc) where.kycStatus = kyc;
  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: "insensitive" } },
      { lastName: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const [users, total] = await Promise.all([
    db.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        kycStatus: true,
        isActive: true,
        trustScore: true,
        avatarUrl: true,
        createdAt: true,
        provider: { select: { id: true, businessName: true, isVerified: true, kybStatus: true } },
      },
    }),
    db.user.count({ where }),
  ]);

  return NextResponse.json({ users, total, page, pages: Math.ceil(total / limit) });
}

/**
 * PATCH /api/admin/users — Update user role, status, or verification.
 */
export async function PATCH(req: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const { userId, action, role } = await req.json();

  if (action === "set_role" && role) {
    await db.user.update({
      where: { id: userId },
      data: { role },
    });
    return NextResponse.json({ success: true });
  }

  // Helper to fetch user for email notifications
  const getUser = () => db.user.findUniqueOrThrow({ where: { id: userId } });

  if (action === "suspend") {
    await db.user.update({
      where: { id: userId },
      data: { isActive: false },
    });
    const user = await getUser();
    sendAccountSuspendedEmail(user.email!, user.firstName, user.id).catch((err) => console.error("[CouthActs]", err));
    return NextResponse.json({ success: true });
  }

  if (action === "activate") {
    await db.user.update({
      where: { id: userId },
      data: { isActive: true },
    });
    const user = await getUser();
    sendAccountReactivatedEmail(user.email!, user.firstName, user.id).catch((err) => console.error("[CouthActs]", err));
    return NextResponse.json({ success: true });
  }

  if (action === "approve_kyc") {
    await db.user.update({
      where: { id: userId },
      data: { kycStatus: "APPROVED" },
    });
    await db.provider.updateMany({
      where: { userId },
      data: { isVerified: true, kybStatus: "APPROVED" },
    });
    const user = await getUser();
    sendVerificationApprovedEmail(user.email!, user.firstName, user.id).catch((err) => console.error("[CouthActs]", err));
    return NextResponse.json({ success: true });
  }

  if (action === "reject_kyc") {
    await db.user.update({
      where: { id: userId },
      data: { kycStatus: "REJECTED" },
    });
    const user = await getUser();
    sendKycRejectedEmail(user.email!, user.firstName, user.id).catch((err) => console.error("[CouthActs]", err));
    return NextResponse.json({ success: true });
  }

  if (action === "approve_business") {
    await db.provider.updateMany({
      where: { userId },
      data: { isVerified: true, kybStatus: "APPROVED" },
    });
    const user = await getUser();
    sendBusinessApprovedEmail(user.email!, user.firstName, user.id).catch((err) => console.error("[CouthActs]", err));
    return NextResponse.json({ success: true });
  }

  if (action === "reject_business") {
    await db.provider.updateMany({
      where: { userId },
      data: { isVerified: false, kybStatus: "REJECTED" },
    });
    const user = await getUser();
    sendBusinessRejectedEmail(user.email!, user.firstName, user.id).catch((err) => console.error("[CouthActs]", err));
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
