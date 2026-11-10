import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const name = String(body.name ?? "").trim() || null;

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Informe um e-mail válido." },
        { status: 400 }
      );
    }

    await prisma.subscriber.upsert({
      where: { email },
      update: { name: name ?? undefined },
      create: { email, name },
    });

    return NextResponse.json({
      ok: true,
      message: "Inscrição realizada com sucesso.",
    });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível concluir a inscrição. Tente novamente." },
      { status: 500 }
    );
  }
}
