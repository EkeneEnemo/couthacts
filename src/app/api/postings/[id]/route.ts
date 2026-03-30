import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posting = await db.posting.findUnique({
    where: { id: params.id },
    include: {
      customer: {
        select: { id: true, firstName: true, lastName: true, avatarUrl: true },
      },
      bids: {
        where: { isWithdrawn: false },
        orderBy: { createdAt: "desc" },
        include: {
          provider: {
            select: {
              id: true,
              businessName: true,
              couthActsScore: true,
              scoreTier: true,
              completionRate: true,
              onTimeRate: true,
              totalJobs: true,
              logoUrl: true,
              isVerified: true,
            },
          },
        },
      },
      booking: {
        include: {
          provider: {
            select: { id: true, businessName: true },
          },
          escrow: true,
        },
      },
    },
  });

  if (!posting) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ posting });
}
