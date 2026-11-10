import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin, Quote, User } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { categoryLabel, formatDate, paragraphs } from "@/lib/site";
import { TestimonyCard } from "@/components/TestimonyCard";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number.parseInt(id, 10);
  if (!Number.isFinite(numericId)) return { title: "Testemunho" };

  const testimony = await prisma.testimony.findFirst({
    where: { id: numericId, approved: true },
    select: { title: true, content: true },
  });

  if (!testimony) return { title: "Testemunho não encontrado" };

  return {
    title: testimony.title,
    description: testimony.content.slice(0, 155),
  };
}

export default async function TestimonyPage({ params }: { params: Params }) {
  const { id } = await params;
  const numericId = Number.parseInt(id, 10);

  if (!Number.isFinite(numericId)) notFound();

  const testimony = await prisma.testimony.findFirst({
    where: { id: numericId, approved: true },
  });

  if (!testimony) notFound();

  const related = await prisma.testimony.findMany({
    where: {
      approved: true,
      category: testimony.category,
      id: { not: testimony.id },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,98,246,0.3),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(212,149,28,0.16),transparent_50%)]" />
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <Link
            href="/testemunhos"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition hover:text-gold-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para testemunhos
          </Link>

          <span className="mt-8 inline-flex items-center rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-300">
            {categoryLabel(testimony.category)}
          </span>

          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {testimony.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-gold-400" />
              {testimony.name}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gold-400" />
              {testimony.location}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-gold-400" />
              {formatDate(testimony.createdAt)}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <Quote className="absolute right-8 top-8 h-12 w-12 text-slate-100" />
          <div className="relative space-y-5">
            {paragraphs(testimony.content).map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-[1.02rem] leading-[1.85] text-slate-600"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="relative mt-10 border-t border-slate-100 pt-6">
            <p className="text-sm font-semibold text-ink-900">
              {testimony.name}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">
              {testimony.location}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-gold-200 bg-gold-50/70 p-6 text-center">
          <p className="font-display text-lg italic text-ink-900">
            &ldquo;Grandes coisas fez o Senhor por nós, pelas quais estamos
            alegres.&rdquo;
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-700">
            Salmos 126:3
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/testemunhos" className="btn-ghost">
            <ArrowLeft className="h-4 w-4" />
            Ver outros testemunhos
          </Link>
          <Link href="/testemunhos#compartilhar" className="btn-gold">
            Compartilhar meu testemunho
          </Link>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
              Outros testemunhos de {categoryLabel(testimony.category).toLowerCase()}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <TestimonyCard key={item.id} testimony={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
