import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/admin/users — List all users with filters.
 */
export async function GET(req: NextRequest) {
  await requireAdmin();

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
  await requireAdmin();

  const { userId, action, role } = await req.json();

  if (action === "set_role" && role) {
    await db.user.update({
      where: { id: userId },
      data: { role },
    });
    return NextResponse.json({ success: true });
  }

  if (action === "suspend") {
    await db.user.update({
      where: { id: userId },
      data: { isActive: false },
    });
    return NextResponse.json({ success: true });
  }

  if (action === "activate") {
    await db.user.update({
      where: { id: userId },
      data: { isActive: true },
    });
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
    return NextResponse.json({ success: true });
  }

  if (action === "reject_kyc") {
    await db.user.update({
      where: { id: userId },
      data: { kycStatus: "REJECTED" },
    });
    return NextResponse.json({ success: true });
  }

  if (action === "approve_business") {
    await db.provider.updateMany({
      where: { userId },
      data: { isVerified: true, kybStatus: "APPROVED" },
    });
    return NextResponse.json({ success: true });
  }

  if (action === "reject_business") {
    await db.provider.updateMany({
      where: { userId },
      data: { isVerified: false, kybStatus: "REJECTED" },
    });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
