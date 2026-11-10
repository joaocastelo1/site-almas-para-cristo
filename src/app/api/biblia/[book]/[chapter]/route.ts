import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ book: string; chapter: string }> }
) {
  try {
    const { book: bookParam, chapter: chapterParam } = await params;
    const chapter = Number.parseInt(chapterParam, 10);

    if (!Number.isFinite(chapter) || chapter < 1) {
      return NextResponse.json(
        { error: "Capítulo inválido." },
        { status: 400 }
      );
    }

    const book = await prisma.bibleBook.findUnique({
      where: { abbrev: bookParam.toLowerCase() },
    });

    if (!book) {
      return NextResponse.json(
        { error: "Livro não encontrado." },
        { status: 404 }
      );
    }

    if (chapter > book.chapters) {
      return NextResponse.json(
        { error: "Capítulo não encontrado." },
        { status: 404 }
      );
    }

    const verses = await prisma.bibleVerse.findMany({
      where: { bookId: book.id, chapter },
      orderBy: { verse: "asc" },
      select: { verse: true, text: true },
    });

    return NextResponse.json({
      book: {
        abbrev: book.abbrev,
        name: book.name,
        chapters: book.chapters,
        position: book.position,
      },
      chapter,
      verses,
      translation: "Almeida Corrigida Fiel",
    });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível carregar o capítulo." },
      { status: 500 }
    );
  }
}
