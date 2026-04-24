import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  sendPostingAbandonedEmail,
  sendFirstCompletionEmail,
  sendNpsEmail,
  sendInactivityEmail,
} from "@/lib/email";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * GET|POST /api/cron/lifecycle
 *
 * Run daily by Vercel Cron. Processes four non-transactional email flows:
 *
 *   1. posting_abandoned  — open postings ~24h old that haven't been booked.
 *   2. first_completion    — user whose first booking just completed.
 *   3. nps_survey          — 3 days after first_completion, ask for NPS.
 *   4. inactivity          — active accounts with no activity in 30 days.
 *
 * Idempotency: we write a lightweight marker into the Notification table
 * for each send (type = "EMAIL_LIFECYCLE:<key>") so reruns don't spam users.
 *
 * Secured by the `CRON_SECRET` env var (Vercel Cron adds it via the
 * `x-vercel-cron` header or a query parameter — we verify the header).
 */
function isAuthorized(req: NextRequest): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  if (req.headers.get("x-vercel-cron")) return true; // Vercel Cron
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

async function hasSent(userId: string, key: string): Promise<boolean> {
  const existing = await db.notification.findFirst({
    where: { userId, type: `EMAIL_LIFECYCLE:${key}` },
    select: { id: true },
  });
  return !!existing;
}

async function markSent(userId: string, key: string, title: string) {
  await db.notification.create({
    data: {
      userId,
      type: `EMAIL_LIFECYCLE:${key}`,
      title,
      body: `Sent at ${new Date().toISOString()}`,
      isRead: true,
    },
  });
}

async function processAbandoned() {
  const now = Date.now();
  const since = new Date(now - 24 * 60 * 60 * 1000);
  const until = new Date(now - 23 * 60 * 60 * 1000);

  const postings = await db.posting.findMany({
    where: {
      status: "OPEN",
      createdAt: { gte: since, lte: until },
    },
    include: {
      customer: { select: { id: true, email: true, firstName: true } },
      _count: { select: { bids: true } },
    },
    take: 200,
  });

  let sent = 0;
  for (const p of postings) {
    const key = `abandoned:${p.id}`;
    if (await hasSent(p.customer.id, key)) continue;
    if (!p.customer.email) continue;
    try {
      await sendPostingAbandonedEmail(
        p.customer.email,
        p.customer.firstName,
        p.title,
        p.id,
        p._count.bids,
        p.customer.id,
      );
      await markSent(p.customer.id, key, `Abandoned-posting nudge for ${p.title}`);
      sent += 1;
    } catch (err) {
      console.error("[CouthActs] lifecycle abandoned", err);
    }
  }
  return sent;
}

async function processFirstCompletion() {
  // Bookings completed in the last 24h, by customers who have exactly one
  // completed booking (= it's their first).
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const completed = await db.booking.findMany({
    where: { status: "COMPLETED", completedAt: { gte: since } },
    orderBy: { completedAt: "desc" },
    include: {
      posting: { select: { title: true } },
      customer: { select: { id: true, email: true, firstName: true } },
    },
    take: 500,
  });

  let sent = 0;
  for (const b of completed) {
    const key = `first_completion:${b.customerId}`;
    if (await hasSent(b.customerId, key)) continue;
    const priorCompleted = await db.booking.count({
      where: {
        customerId: b.customerId,
        status: "COMPLETED",
        completedAt: { lt: b.completedAt ?? new Date() },
      },
    });
    if (priorCompleted > 0) continue;
    if (!b.customer.email) continue;
    try {
      await sendFirstCompletionEmail(
        b.customer.email,
        b.customer.firstName,
        b.posting.title,
        b.customer.id,
      );
      await markSent(b.customer.id, key, "First-completion congrats");
      sent += 1;
    } catch (err) {
      console.error("[CouthActs] lifecycle first_completion", err);
    }
  }
  return sent;
}

async function processNps() {
  // 3 days after first completion.
  const from = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000);
  const to = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

  const firstMarkers = await db.notification.findMany({
    where: {
      type: "EMAIL_LIFECYCLE:first_completion:*",
      createdAt: { gte: from, lte: to },
    },
    select: { userId: true },
  });
  // The `type` contains a wildcard above; Prisma won't do that. Redo with
  // a contains filter on the type string.
  const raw = await db.notification.findMany({
    where: {
      type: { startsWith: "EMAIL_LIFECYCLE:first_completion:" },
      createdAt: { gte: from, lte: to },
    },
    select: { userId: true },
  });
  const userIds = Array.from(new Set(raw.map((r) => r.userId)));

  let sent = 0;
  for (const userId of userIds) {
    const key = `nps:${userId}`;
    if (await hasSent(userId, key)) continue;
    const u = await db.user.findUnique({ where: { id: userId }, select: { email: true, firstName: true } });
    if (!u?.email) continue;
    try {
      await sendNpsEmail(u.email, u.firstName, userId);
      await markSent(userId, key, "NPS 2-question survey");
      sent += 1;
    } catch (err) {
      console.error("[CouthActs] lifecycle nps", err);
    }
  }
  void firstMarkers;
  return sent;
}

async function processInactivity() {
  const threshold = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const users = await db.user.findMany({
    where: {
      isActive: true,
      updatedAt: { lt: threshold },
    },
    select: { id: true, email: true, firstName: true, updatedAt: true },
    take: 200,
  });

  let sent = 0;
  for (const u of users) {
    const key = `inactivity:${u.updatedAt.toISOString().slice(0, 7)}`; // monthly bucket
    if (await hasSent(u.id, key)) continue;
    if (!u.email) continue;
    try {
      await sendInactivityEmail(u.email, u.firstName, u.id);
      await markSent(u.id, key, "30-day inactivity re-engagement");
      sent += 1;
    } catch (err) {
      console.error("[CouthActs] lifecycle inactivity", err);
    }
  }
  return sent;
}

async function run() {
  const [abandoned, firstCompletion, nps, inactivity] = await Promise.all([
    processAbandoned(),
    processFirstCompletion(),
    processNps(),
    processInactivity(),
  ]);
  return { abandoned, firstCompletion, nps, inactivity };
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const results = await run();
  return NextResponse.json({ ok: true, results });
}

export async function POST(req: NextRequest) {
  return GET(req);
}
