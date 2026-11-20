import { PrismaClient } from "@prisma/client";
import path from "path";

// Ensure DATABASE_URL is always defined so Prisma never fails with "Environment variable not found"
if (!process.env.DATABASE_URL) {
  const dbPath = path.join(process.cwd(), "prisma", "dev.db");
  process.env.DATABASE_URL = `file:${dbPath}`;
}

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
