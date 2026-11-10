import type { Metadata } from "next";
import Link from "next/link";
import { Filter, HeartHandshake, PenLine, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { TESTIMONY_CATEGORIES } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { TestimonyCard } from "@/components/TestimonyCard";
import { TestimonyForm } from "@/components/TestimonyForm";
import { SectionHeading } from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Testemunhos",
  description:
    "Histórias reais de cura, libertação, milagres, provisão e restauração. Veja o que Deus tem feito e compartilhe o seu testemunho.",
};

type SearchParams = Promise<{ categoria?: string }>;

export default async function TestemunhosPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { categoria } = await searchParams;
  const validCategory = categoria && categoria in TESTIMONY_CATEGORIES;

  const testimonies = await prisma.testimony.findMany({
    where: {
      approved: true,
      ...(validCategory ? { category: categoria } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageHero
        eyebrow="Testemunhos"
        title="O que Deus tem feito em nossas vidas"
        description="Cura, libertação, milagres, provisão e restauração. Estas são histórias de pessoas que experimentaram o poder e o amor de Jesus. A Deus toda a glória."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#compartilhar" className="btn-gold">
            <PenLine className="h-4 w-4" />
            Compartilhar testemunho
          </Link>
          <Link href="/mensagens" className="btn-outline">
            Ler mensagens
          </Link>
        </div>
      </PageHero>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <Filter className="h-4 w-4" />
              Filtrar por categoria
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/testemunhos"
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  !validCategory
                    ? "bg-ink-900 text-white"
                    : "border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-800"
                }`}
              >
                Todos
              </Link>
              {Object.entries(TESTIMONY_CATEGORIES).map(([value, label]) => (
                <Link
                  key={value}
                  href={`/testemunhos?categoria=${value}`}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    categoria === value
                      ? "bg-ink-900 text-white"
                      : "border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-800"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        {testimonies.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <HeartHandshake className="mx-auto h-10 w-10 text-slate-300" />
            <h2 className="mt-4 font-display text-2xl font-semibold text-ink-900">
              Ainda não há testemunhos nesta categoria
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Seja o primeiro a compartilhar o que Deus fez na sua vida.
            </p>
            <Link href="#compartilhar" className="btn-dark mt-6">
              Enviar meu testemunho
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonies.map((testimony) => (
              <TestimonyCard key={testimony.id} testimony={testimony} />
            ))}
          </div>
        )}
      </section>

      <section
        id="compartilhar"
        className="scroll-mt-24 border-y border-slate-200 bg-white"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Sua história importa"
              title="Compartilhe o que Deus fez por você"
              description="Seu testemunho pode fortalecer a fé de muitas pessoas. Conte-nos como Deus agiu na sua vida: cura, libertação, provisão, restauração ou qualquer outro milagre."
            />
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#fbfaf7] p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">
                    Revisão cuidadosa
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Cada testemunho é lido pela nossa equipe antes de ser
                    publicado, para cuidar das pessoas e da verdade.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#fbfaf7] p-4">
                <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">
                    Para a glória de Deus
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Nosso desejo é que cada história aponte para Jesus e
                    console quem está passando por lutas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-[#fbfaf7] p-6 shadow-sm sm:p-8">
            <TestimonyForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-900 to-ink-950 px-6 py-12 text-white sm:px-12 sm:py-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">
              Continue caminhando
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Toda história de transformação começa com um encontro com Jesus.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              Se você ainda não conhece o amor de Cristo, leia a mensagem
              &ldquo;O amor que transforma&rdquo; e descubra como dar o primeiro
              passo.
            </p>
            <Link
              href="/mensagens/o-amor-que-transforma"
              className="btn-gold mt-8"
            >
              Conheça Jesus
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
