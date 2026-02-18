import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis as unknown as { prisma: ReturnType<typeof createPrisma> };

function createPrisma() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Set it in .env (e.g. postgresql://user:password@host:5432/dbname or prisma:// Accelerate link)."
    );
  }
  const client = new PrismaClient();
  if (url.startsWith("prisma://")) {
    return client.$extends(withAccelerate());
  }
  return client;
}

export const prisma = globalForPrisma.prisma ?? createPrisma();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
