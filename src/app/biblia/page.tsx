import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Heart, Lightbulb, Cross, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/PageHero";
import { BibleReader } from "@/components/BibleReader";
import { SectionHeading } from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bíblia Sagrada",
  description:
    "Leia a Bíblia Sagrada completa, na tradução Almeida Corrigida Fiel, livro por livro e capítulo por capítulo.",
};

export default async function BibliaPage() {
  const books = await prisma.bibleBook.findMany({
    orderBy: { position: "asc" },
    select: { abbrev: true, name: true, chapters: true, position: true },
  });

  return (
    <>
      <PageHero
        eyebrow="Bíblia Sagrada"
        title="A Palavra de Deus para a sua vida"
        description="Leia a Bíblia completa, de Gênesis a Apocalipse, na tradução Almeida Corrigida Fiel. Escolha um livro e um capítulo e mergulhe na verdade que transforma."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="#leitor" className="btn-gold">
            <BookOpen className="h-4 w-4" />
            Começar a ler
          </Link>
          <Link href="/mensagens" className="btn-outline">
            Ler mensagens
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      <section
        id="leitor"
        className="mx-auto max-w-5xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20"
      >
        <BibleReader books={books} />
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionHeading
            eyebrow="Comece por aqui"
            title="Dicas para uma leitura que transforma"
            description="A Bíblia não é um livro comum. Ela é viva e eficaz. Estas dicas simples vão ajudar você a aproveitar melhor cada leitura."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: "Leia com oração",
                text: "Antes de abrir a Bíblia, peça ao Espírito Santo que ilumine o seu entendimento e prepare o seu coração.",
              },
              {
                icon: Lightbulb,
                title: "Busque o contexto",
                text: "Leia o capítulo inteiro e observe a história. A Palavra ganha profundidade quando entendemos o todo.",
              },
              {
                icon: Cross,
                title: "Aplique à sua vida",
                text: "Anote o que chamou sua atenção e pergunte: como esta verdade pode transformar o meu dia hoje?",
              },
            ].map((tip) => (
              <div
                key={tip.title}
                className="rounded-2xl border border-slate-200 bg-[#fbfaf7] p-7"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                  <tip.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">
                  {tip.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-900 to-ink-950 px-6 py-12 text-white sm:px-12 sm:py-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">
              Um convite
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              A Bíblia aponta para Jesus.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              Mais do que um livro de regras, a Palavra de Deus nos apresenta o
              Salvador. Se você deseja conhecer Jesus e começar uma nova vida
              com Ele, leia a mensagem abaixo.
            </p>
            <Link
              href="/mensagens/o-amor-que-transforma"
              className="btn-gold mt-8"
            >
              <Cross className="h-4 w-4" />
              Conheça Jesus
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
