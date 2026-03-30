import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const dbUrlExists = !!process.env.DATABASE_URL;
  const dbUrlPrefix = process.env.DATABASE_URL
    ? process.env.DATABASE_URL.substring(0, 30) + "..."
    : "NOT SET";

  // Check alternative env vars
  const altVars = {
    POSTGRES_PRISMA_URL: !!process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL_NON_POOLING: !!process.env.POSTGRES_URL_NON_POOLING,
    POSTGRES_URL: !!process.env.POSTGRES_URL,
  };

  let dbConnected = false;
  let dbError = "";
  try {
    await db.$queryRawUnsafe("SELECT 1");
    dbConnected = true;
  } catch (err: unknown) {
    dbError = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json({
    status: dbConnected ? "healthy" : "unhealthy",
    database: {
      urlExists: dbUrlExists,
      urlPrefix: dbUrlPrefix,
      altVars,
      connected: dbConnected,
      error: dbError || undefined,
    },
    timestamp: new Date().toISOString(),
  });
}
