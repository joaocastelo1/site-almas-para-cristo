import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Cross, HeartHandshake } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/PageHero";
import { MessageCard } from "@/components/MessageCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mensagens",
  description:
    "Mensagens evangelísticas cheias de esperança, baseadas na Palavra de Deus. Leia, medite e compartilhe.",
};

export default async function MensagensPage() {
  const messages = await prisma.message.findMany({ orderBy: { id: "asc" } });

  return (
    <>
      <PageHero
        eyebrow="Mensagens"
        title="Palavras de esperança para o seu coração"
        description="Mensagens simples, bíblicas e profundas para quem busca paz, propósito e um encontro verdadeiro com Jesus."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/mensagens/o-amor-que-transforma" className="btn-gold">
            <Cross className="h-4 w-4" />
            Comece por aqui
          </Link>
          <Link href="/biblia" className="btn-outline">
            <BookOpen className="h-4 w-4" />
            Ler a Bíblia
          </Link>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {messages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-600">
                Precisa de oração?
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
                Estamos aqui para caminhar com você.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Se você deseja entregar sua vida a Jesus, precisa de oração ou
                quer conversar com alguém, envie uma mensagem. Nossa equipe terá
                alegria em orar e caminhar ao seu lado.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contato" className="btn-dark">
                  <HeartHandshake className="h-4 w-4" />
                  Enviar mensagem
                </Link>
                <Link href="/testemunhos" className="btn-ghost">
                  Ver testemunhos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-900 to-ink-950 p-8 text-white sm:p-10">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">
                Jesus disse
              </p>
              <p className="mt-4 font-display text-2xl font-semibold leading-snug sm:text-3xl">
                &ldquo;Vinde a mim, todos os que estais cansados e oprimidos, e
                eu vos aliviarei.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-gold-300">
                Mateus 11:28
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
