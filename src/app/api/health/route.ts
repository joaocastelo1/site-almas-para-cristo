import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const info = {
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    databaseUrlScheme: process.env.DATABASE_URL?.split(":")[0] ?? null,
    isVercel: Boolean(process.env.VERCEL),
    nodeEnv: process.env.NODE_ENV,
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, ...info });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        ...info,
        name: error instanceof Error ? error.name : "Unknown",
        message: error instanceof Error ? error.message : String(error),
        code: (error as { code?: string }).code ?? null,
      },
      { status: 500 }
    );
  }
}
