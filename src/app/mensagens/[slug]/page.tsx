import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, User } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate, paragraphs } from "@/lib/site";
import { MessageCard } from "@/components/MessageCard";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const message = await prisma.message.findUnique({
    where: { slug },
    select: { title: true, excerpt: true },
  });

  if (!message) return { title: "Mensagem não encontrada" };

  return { title: message.title, description: message.excerpt };
}

export default async function MessagePage({ params }: { params: Params }) {
  const { slug } = await params;

  const message = await prisma.message.findUnique({ where: { slug } });
  if (!message) notFound();

  const others = await prisma.message.findMany({
    where: { id: { not: message.id } },
    take: 3,
    orderBy: { id: "asc" },
  });

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,98,246,0.3),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(212,149,28,0.16),transparent_50%)]" />
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
          <Link
            href="/mensagens"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition hover:text-gold-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para mensagens
          </Link>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">
            Mensagem evangelística
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {message.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-gold-400" />
              {message.author}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-gold-400" />
              {formatDate(message.createdAt)}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="rounded-2xl border border-gold-200 bg-gold-50/70 p-6 sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-700">
            Palavra para hoje
          </p>
          <p className="mt-3 font-display text-xl italic leading-relaxed text-ink-900 sm:text-2xl">
            {message.verse}
          </p>
        </div>

        <div className="prose-message mt-10">
          {paragraphs(message.content).map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-gradient-to-br from-brand-800 via-brand-900 to-ink-950 p-8 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">
            Dê o próximo passo
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold leading-snug sm:text-3xl">
            Quer entregar sua vida a Jesus hoje?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Você não precisa estar pronto. Basta se aproximar com fé. Se desejar
            conversar com alguém ou pedir oração, fale conosco.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/contato" className="btn-gold">
              Falar com a equipe
            </Link>
            <Link href="/biblia" className="btn-outline">
              <BookOpen className="h-4 w-4" />
              Ler a Bíblia
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/mensagens" className="btn-ghost">
            <ArrowLeft className="h-4 w-4" />
            Todas as mensagens
          </Link>
          <Link href="/testemunhos" className="btn-ghost">
            Ver testemunhos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
              Continue lendo
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((item) => (
                <MessageCard key={item.id} message={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
