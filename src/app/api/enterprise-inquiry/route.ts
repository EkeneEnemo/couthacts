import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/enterprise-inquiry — Receive enterprise sales inquiries.
 * In production, forward to CRM (HubSpot, Salesforce) or email.
 * For now, log and acknowledge.
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  // TODO: Forward to CRM or send email to sales@couthacts.com
  console.log("Enterprise inquiry received:", body);

  return NextResponse.json({ success: true });
}
