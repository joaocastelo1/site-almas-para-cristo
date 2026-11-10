import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const numericId = Number.parseInt(id, 10);
  if (!Number.isFinite(numericId)) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

  const body = await request.json().catch(() => ({}));

  try {
    const testimony = await prisma.testimony.update({
      where: { id: numericId },
      data: { approved: Boolean(body.approved) },
    });
    return NextResponse.json({ ok: true, approved: testimony.approved });
  } catch {
    return NextResponse.json(
      { error: "Testemunho não encontrado." },
      { status: 404 }
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const numericId = Number.parseInt(id, 10);
  if (!Number.isFinite(numericId)) {
    return NextResponse.json({ error: "ID inválido." }, { status: 400 });
  }

  try {
    await prisma.testimony.delete({ where: { id: numericId } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Testemunho não encontrado." },
      { status: 404 }
    );
  }
}
