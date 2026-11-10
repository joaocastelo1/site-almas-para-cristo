import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Download, Gift, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/PageHero";
import { EbookCard } from "@/components/EbookCard";
import { SectionHeading } from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ebooks gratuitos",
  description:
    "Baixe gratuitamente ebooks cristãos sobre evangelismo, missões, oração, crianças e libertação. Materiais em PDF para fortalecer a sua fé.",
};

export default async function EbooksPage() {
  const ebooks = await prisma.ebook.findMany({ orderBy: { id: "asc" } });

  return (
    <>
      <PageHero
        eyebrow="Biblioteca gratuita"
        title="Ebooks para fortalecer a sua fé"
        description="Materiais em PDF preparados com oração para ajudar você a crescer na Palavra, orar pelas missões e compartilhar o amor de Jesus. Tudo gratuito, sem cadastro."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#biblioteca" className="btn-gold">
            <Download className="h-4 w-4" />
            Ver ebooks
          </Link>
          <Link href="/biblia" className="btn-outline">
            <BookOpen className="h-4 w-4" />
            Ler a Bíblia
          </Link>
        </div>
      </PageHero>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:grid-cols-3 sm:px-8">
          {[
            {
              icon: Gift,
              title: "100% gratuito",
              text: "Nenhum custo e nenhum cadastro obrigatório.",
            },
            {
              icon: Download,
              title: "Download imediato",
              text: "Baixe o PDF e leia onde quiser, no celular ou no computador.",
            },
            {
              icon: ShieldCheck,
              title: "Conteúdo bíblico",
              text: "Materiais fiéis à Palavra de Deus e edificantes.",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-100 text-gold-700">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-900">
                  {item.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="biblioteca"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ebooks.map((ebook) => (
            <EbookCard key={ebook.id} ebook={ebook} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Compartilhe"
                title="Um material abençoa muita gente"
                description="Você pode baixar, imprimir e compartilhar estes ebooks livremente com sua família, sua igreja e seus amigos. O nosso desejo é que a Palavra alcance cada vez mais pessoas."
              />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contato" className="btn-dark">
                  Sugerir um tema
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/missoes" className="btn-ghost">
                  Conhecer as missões
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-900 to-ink-950 p-8 text-white sm:p-10">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">
                Palavra viva
              </p>
              <p className="mt-4 font-display text-2xl font-semibold leading-snug sm:text-3xl">
                &ldquo;Lâmpada para os meus pés é a tua palavra, e luz para o
                meu caminho.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-gold-300">
                Salmos 119:105
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
