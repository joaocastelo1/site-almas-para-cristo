import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Informe seu nome." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Informe um e-mail válido." },
        { status: 400 }
      );
    }

    if (!subject) {
      return NextResponse.json(
        { error: "Selecione um assunto." },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: "Escreva uma mensagem com pelo menos 10 caracteres." },
        { status: 400 }
      );
    }

    await prisma.contact.create({
      data: { name, email, subject, message },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível enviar sua mensagem. Tente novamente." },
      { status: 500 }
    );
  }
}
