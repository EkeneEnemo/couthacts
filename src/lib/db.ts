import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDatabaseUrl(): string {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_URL ||
    "";

  if (!url) {
    throw new Error(
      "No database URL found. Set DATABASE_URL in environment variables."
    );
  }

  // Strip surrounding quotes (Vercel env vars sometimes include them)
  // and remove channel_binding param the Neon serverless driver doesn't support
  return url
    .replace(/^["']|["']$/g, "")
    .trim()
    .replace(/[?&]channel_binding=[^&]*/g, "")
    .replace(/\?&/, "?")
    .replace(/\?$/, "");
}

function createPrismaClient() {
  const connectionString = getDatabaseUrl();
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
