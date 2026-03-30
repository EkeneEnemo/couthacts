import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDatabaseUrl(): string {
  // Vercel Neon integration may use different env var names
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_URL;

  if (!url) {
    throw new Error(
      "No database URL found. Set DATABASE_URL in environment variables."
    );
  }

  // Strip channel_binding param — the Neon serverless driver doesn't support it
  // and it causes "Invalid URL" errors in the adapter
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete("channel_binding");
    return parsed.toString();
  } catch {
    // If URL parsing fails, return as-is and let the adapter handle the error
    return url;
  }
}

function createPrismaClient() {
  const connectionString = getDatabaseUrl();
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
