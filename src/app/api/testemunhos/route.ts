import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { TESTIMONY_CATEGORIES } from "@/lib/site";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const title = String(body.title ?? "").trim();
    const category = String(body.category ?? "").trim();
    const location = String(body.location ?? "").trim();
    const content = String(body.content ?? "").trim();

    if (!name || !title || !location) {
      return NextResponse.json(
        { error: "Preencha nome, título e cidade." },
        { status: 400 }
      );
    }

    if (!(category in TESTIMONY_CATEGORIES)) {
      return NextResponse.json(
        { error: "Selecione uma categoria válida." },
        { status: 400 }
      );
    }

    if (content.length < 40) {
      return NextResponse.json(
        { error: "Conte seu testemunho com pelo menos 40 caracteres." },
        { status: 400 }
      );
    }

    await prisma.testimony.create({
      data: {
        name,
        title,
        category,
        location,
        content,
        approved: false,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível enviar seu testemunho. Tente novamente." },
      { status: 500 }
    );
  }
}
