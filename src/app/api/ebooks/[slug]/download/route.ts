import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const PAGE = { width: 595.28, height: 841.89 };
const MARGIN = 64;
const NAVY = rgb(0.043, 0.071, 0.125);
const GOLD = rgb(0.89, 0.68, 0.17);
const SLATE = rgb(0.29, 0.34, 0.42);
const SOFT = rgb(0.62, 0.67, 0.75);
const WHITE = rgb(1, 1, 1);

function safeText(input: string) {
  return input
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\u00a0/g, " ")
    .replace(/[^\x00-\xFF]/g, "");
}

function wrapText(
  text: string,
  font: PDFFont,
  size: number,
  maxWidth: number
) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) lines.push(current);
  return lines;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const ebook = await prisma.ebook.findUnique({ where: { slug } });

    if (!ebook) {
      return NextResponse.json(
        { error: "Ebook não encontrado." },
        { status: 404 }
      );
    }

    const pdf = await PDFDocument.create();
    pdf.setTitle(safeText(ebook.title));
    pdf.setAuthor("Almas Para Cristo");
    pdf.setSubject(safeText(ebook.description));
    pdf.setCreator("Almas Para Cristo - Missoes e Evangelismo");

    const body = await pdf.embedFont(StandardFonts.Helvetica);
    const bodyBold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const display = await pdf.embedFont(StandardFonts.TimesRomanBold);
    const displayItalic = await pdf.embedFont(StandardFonts.TimesRomanItalic);

    const cover = pdf.addPage([PAGE.width, PAGE.height]);
    cover.drawRectangle({
      x: 0,
      y: 0,
      width: PAGE.width,
      height: PAGE.height,
      color: NAVY,
    });
    cover.drawCircle({
      x: PAGE.width - 40,
      y: PAGE.height - 60,
      size: 170,
      color: rgb(0.23, 0.34, 0.86),
      opacity: 0.22,
    });
    cover.drawCircle({
      x: 50,
      y: 110,
      size: 130,
      color: GOLD,
      opacity: 0.12,
    });
    cover.drawRectangle({
      x: MARGIN,
      y: PAGE.height - 122,
      width: 64,
      height: 4,
      color: GOLD,
    });
    cover.drawText(safeText(ebook.category.toUpperCase()), {
      x: MARGIN,
      y: PAGE.height - 158,
      size: 10,
      font: bodyBold,
      color: GOLD,
    });

    let titleY = PAGE.height - 216;
    for (const line of wrapText(
      safeText(ebook.title),
      display,
      34,
      PAGE.width - MARGIN * 2
    )) {
      cover.drawText(line, {
        x: MARGIN,
        y: titleY,
        size: 34,
        font: display,
        color: WHITE,
      });
      titleY -= 42;
    }

    let descY = titleY - 18;
    for (const line of wrapText(
      safeText(ebook.description),
      body,
      12,
      PAGE.width - MARGIN * 2 - 20
    ).slice(0, 5)) {
      cover.drawText(line, {
        x: MARGIN,
        y: descY,
        size: 12,
        font: body,
        color: rgb(0.76, 0.81, 0.89),
      });
      descY -= 19;
    }

    cover.drawText("ALMAS PARA CRISTO", {
      x: MARGIN,
      y: 92,
      size: 11,
      font: bodyBold,
      color: WHITE,
    });
    cover.drawText("Missoes e Evangelismo", {
      x: MARGIN,
      y: 74,
      size: 9,
      font: body,
      color: GOLD,
    });
    cover.drawText(`${ebook.pages} paginas | PDF gratuito`, {
      x: PAGE.width - MARGIN - 132,
      y: 92,
      size: 9,
        font: body,
        color: SOFT,
      });

    const blocks = ebook.content
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean);

    let page = pdf.addPage([PAGE.width, PAGE.height]);
    let y = PAGE.height - MARGIN;
    const maxWidth = PAGE.width - MARGIN * 2;
    const lineHeight = 20;

    const addPage = () => {
      page = pdf.addPage([PAGE.width, PAGE.height]);
      y = PAGE.height - MARGIN;
    };

    const ensure = (space: number) => {
      if (y - space < MARGIN + 28) addPage();
    };

    for (const block of blocks) {
      if (block.startsWith("## ")) {
        const heading = safeText(block.replace(/^##\s+/, ""));
        ensure(72);
        y -= 14;
        for (const line of wrapText(heading, bodyBold, 17, maxWidth)) {
          ensure(28);
          page.drawText(line, {
            x: MARGIN,
            y,
            size: 17,
            font: bodyBold,
            color: NAVY,
          });
          y -= 24;
        }
        page.drawRectangle({
          x: MARGIN,
          y: y + 4,
          width: 46,
          height: 2.5,
          color: GOLD,
        });
        y -= 14;
      } else {
        const text = safeText(block.replace(/\s+/g, " "));
        for (const line of wrapText(text, body, 12, maxWidth)) {
          ensure(lineHeight);
          page.drawText(line, {
            x: MARGIN,
            y,
            size: 12,
            font: body,
            color: SLATE,
          });
          y -= lineHeight;
        }
        y -= 11;
      }
    }

    const closing = pdf.addPage([PAGE.width, PAGE.height]);
    closing.drawRectangle({
      x: 0,
      y: 0,
      width: PAGE.width,
      height: PAGE.height,
      color: rgb(0.98, 0.97, 0.95),
    });
    closing.drawRectangle({
      x: MARGIN,
      y: PAGE.height - 190,
      width: 56,
      height: 4,
      color: GOLD,
    });
    closing.drawText("Que Deus abencoe voce", {
      x: MARGIN,
      y: PAGE.height - 240,
      size: 26,
      font: display,
      color: NAVY,
    });
    const blessing = wrapText(
      "Este material foi preparado com oracao para edificar a sua vida. Compartilhe com quem voce ama e continue caminhando com Jesus.",
      body,
      12,
      maxWidth - 40
    );
    let blessingY = PAGE.height - 280;
    for (const line of blessing) {
      closing.drawText(line, {
        x: MARGIN,
        y: blessingY,
        size: 12,
        font: body,
        color: SLATE,
      });
      blessingY -= 20;
    }
    closing.drawText(
      "Almas Para Cristo | Missoes e Evangelismo | almasparacristo.org",
      {
        x: MARGIN,
        y: MARGIN,
        size: 9,
        font: displayItalic,
        color: SOFT,
      }
    );

    const pages = pdf.getPages();
    pages.forEach((current, index) => {
      if (index === 0) return;
      current.drawRectangle({
        x: MARGIN,
        y: 54,
        width: PAGE.width - MARGIN * 2,
        height: 0.5,
        color: rgb(0.84, 0.85, 0.88),
      });
      current.drawText("Almas Para Cristo", {
        x: MARGIN,
        y: 38,
        size: 8,
        font: body,
        color: SOFT,
      });
      current.drawText(`${index + 1}`, {
        x: PAGE.width - MARGIN - 8,
        y: 38,
        size: 8,
        font: body,
        color: SOFT,
      });
    });

    const bytes = await pdf.save();

    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="almas-para-cristo-${slug}.pdf"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível gerar o PDF. Tente novamente." },
      { status: 500 }
    );
  }
}
