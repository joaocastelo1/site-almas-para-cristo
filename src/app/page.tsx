import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import {
  ArrowRight,
  BookOpen,
  Cross,
  Flame,
  Globe2,
  Heart,
  HeartHandshake,
  Map,
  MapPin,
  MessagesSquare,
  Sparkles,
  Sun,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { JOURNEY_ORDER, REGIONS } from "@/lib/site";
import { SectionHeading } from "@/components/SectionHeading";
import { MissionCard } from "@/components/MissionCard";
import { TestimonyCard } from "@/components/TestimonyCard";
import { NewsletterForm } from "@/components/NewsletterForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Esperança, fé e missões no Piauí e no Brasil",
  description:
    "Há esperança para você. Encontre uma palavra de esperança, leia a Bíblia, conheça projetos missionários no Piauí, no Nordeste e no Brasil e faça parte do que Deus está fazendo.",
};

const regionIcons = {
  mundo: Globe2,
  brasil: Map,
  nordeste: Sun,
  piaui: MapPin,
} as const;

const nextSteps = [
  {
    title: "Receba esperança",
    text: "Leia a mensagem O amor que transforma.",
    href: "/mensagens/o-amor-que-transforma",
  },
  {
    title: "Fortaleça sua fé",
    text: "Leia a Bíblia online, de graça.",
    href: "/biblia",
  },
  {
    title: "Faça parte da missão",
    text: "Conheça os projetos no Piauí e no mundo.",
    href: "/missoes",
  },
];

const values = [
  {
    title: "Palavra que transforma",
    text: "A Bíblia é a base de tudo o que cremos e ensinamos.",
    icon: BookOpen,
  },
  {
    title: "Amor que acolhe",
    text: "Cada pessoa importa. Servimos com compaixão, sem julgamento.",
    icon: Heart,
  },
  {
    title: "Missão que envia",
    text: "Do sertão às nações, o evangelho não pode parar.",
    icon: Globe2,
  },
];

export default async function HomePage() {
  const [
    missions,
    testimonies,
    missionCount,
    testimonyCount,
    messageCount,
    ebookCount,
    verseCount,
  ] = await Promise.all([
    prisma.mission.findMany({
      where: { region: { in: ["piaui", "nordeste"] } },
      take: 3,
      orderBy: { id: "asc" },
    }),
    prisma.testimony.findMany({
      where: { approved: true },
      take: 3,
      orderBy: { createdAt: "desc" },
    }),
    prisma.mission.count(),
    prisma.testimony.count({ where: { approved: true } }),
    prisma.message.count(),
    prisma.ebook.count(),
    prisma.bibleVerse.count(),
  ]);

  const stats = [
    {
      value: verseCount.toLocaleString("pt-BR"),
      label: "versículos na Bíblia",
      icon: BookOpen,
    },
    { value: String(missionCount), label: "projetos missionários", icon: Globe2 },
    { value: String(testimonyCount), label: "testemunhos de fé", icon: Heart },
    { value: String(ebookCount), label: "ebooks gratuitos", icon: Sparkles },
  ];

  const resources = [
    {
      meta: `${verseCount.toLocaleString("pt-BR")} versículos`,
      title: "Bíblia online",
      text: "Leia a Palavra de Deus em qualquer lugar, de graça.",
      cta: "Ler a Bíblia",
      href: "/biblia",
      icon: BookOpen,
    },
    {
      meta: `${messageCount} mensagens`,
      title: "Mensagens de esperança",
      text: "Palavras de fé para fortalecer o seu coração.",
      cta: "Ler mensagens",
      href: "/mensagens",
      icon: MessagesSquare,
    },
    {
      meta: `${ebookCount} ebooks`,
      title: "Biblioteca gratuita",
      text: "Materiais para baixar, ler e compartilhar.",
      cta: "Baixar ebooks",
      href: "/ebooks",
      icon: Sparkles,
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,98,246,0.35),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(212,149,28,0.18),transparent_50%)]" />
        <div className="hero-grid absolute inset-0 opacity-70" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Do Piauí ao mundo
            </span>

            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Há esperança para você. E ela tem nome:{" "}
              <span className="text-gold-300">Jesus</span>.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              A Almas Para Cristo é uma comunidade que ora, serve e anuncia o
              evangelho do Piauí ao mundo. Aqui você encontra uma palavra de
              esperança, fortalece a sua fé e descobre como fazer parte da
              missão de Deus.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/mensagens/o-amor-que-transforma"
                className="btn-gold"
              >
                <Cross className="h-4 w-4" />
                Quero conhecer Jesus
              </Link>
              <Link href="/missoes" className="btn-outline">
                Ver as missões
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Conteúdo gratuito &middot; Para todas as idades &middot; Sem
              cadastro
            </p>
          </div>

          <div className="relative animate-fade-in">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-500/20 via-transparent to-gold-400/20 blur-2xl" />
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">
                    Seu próximo passo
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Três caminhos para começar hoje.
                  </p>
                </div>
                <Sparkles className="h-5 w-5 text-gold-400" />
              </div>

              <ol className="mt-6 space-y-3">
                {nextSteps.map((step, index) => (
                  <li key={step.title}>
                    <Link
                      href={step.href}
                      className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-gold-400/40 hover:bg-white/[0.06]"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold-400/15 text-sm font-semibold text-gold-300">
                        {index + 1}
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-white">
                          {step.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-400">
                          {step.text}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-gold-300" />
                    </Link>
                  </li>
                ))}
              </ol>

              <blockquote className="mt-6 border-l-2 border-gold-400 pl-4">
                <p className="font-display text-base italic leading-snug text-white">
                  &ldquo;Vinde a mim, todos os que estais cansados e oprimidos, e
                  eu vos aliviarei.&rdquo;
                </p>
                <cite className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-300 not-italic">
                  Mateus 11:28
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 sm:px-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <stat.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Missões"
            title="Do Piauí ao mundo, uma fé que se move."
            description="Conheça projetos reais que levam o evangelho, o cuidado e a esperança a crianças, adolescentes e adultos. Você pode orar, contribuir ou ir."
          />
          <Link
            href="/missoes"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-800 transition hover:text-brand-600"
          >
            Ver todos os projetos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {JOURNEY_ORDER.map((key, index) => {
            const Icon = regionIcons[key];
            return (
              <Fragment key={key}>
                <Link
                  href={`/missoes?regiao=${key}`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-ink-900 transition hover:border-brand-200 hover:text-brand-800"
                >
                  <Icon className="h-3.5 w-3.5 text-gold-600" />
                  {REGIONS[key].label}
                  <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-slate-400">
                    {REGIONS[key].role}
                  </span>
                </Link>
                {index < JOURNEY_ORDER.length - 1 && (
                  <ArrowRight className="h-3.5 w-3.5 text-slate-300" />
                )}
              </Fragment>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/missoes" className="btn-ghost">
            Ver todos os projetos
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/contato" className="btn-gold">
            <HeartHandshake className="h-4 w-4" />
            Quero participar
          </Link>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Quem somos"
                title="Não somos apenas um site. Somos uma igreja em movimento."
                description="Nascemos no Piauí com um chamado simples: amar pessoas, anunciar Jesus e servir com dignidade. Cremos que a fé verdadeira se expressa em oração, comunhão e missão."
              />

              <div className="mt-8 space-y-5">
                {values.map((value) => (
                  <div key={value.title} className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                      <value.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-ink-900">
                        {value.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {value.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-[#fbfaf7] p-8 sm:p-10">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-700 to-ink-950 text-gold-300">
                <Cross className="h-5 w-5" />
              </span>
              <p className="mt-6 font-display text-2xl italic leading-snug text-ink-900">
                &ldquo;A seara é grande, mas os trabalhadores são poucos.&rdquo;
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">
                Mateus 9:37
              </p>
              <p className="mt-6 text-sm leading-relaxed text-slate-600">
                Você pode fazer parte. Ore, contribua ou vá. Deus chama pessoas
                comuns para uma missão extraordinária.
              </p>
              <Link href="/contato" className="btn-dark mt-6">
                Quero fazer parte
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Vidas transformadas"
            title="O que Deus tem feito"
            description="Histórias reais de cura, libertação, provisão e restauração. A Deus toda a glória."
          />
          <Link
            href="/testemunhos"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-800 transition hover:text-brand-600"
          >
            Ver todos os testemunhos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonies.map((testimony) => (
            <TestimonyCard key={testimony.id} testimony={testimony} />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionHeading
            eyebrow="Gratuito para você"
            title="Comece hoje. Sem cadastro, sem custo."
            description="Ferramentas simples para fortalecer a sua fé e compartilhar a esperança."
            align="center"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {resources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="group rounded-2xl border border-slate-200 bg-[#fbfaf7] p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-700 to-ink-950 text-gold-300">
                  <resource.icon className="h-5 w-5" />
                </span>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-600">
                  {resource.meta}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-ink-900">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {resource.text}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-800">
                  {resource.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-12 text-white sm:px-12 sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,98,246,0.32),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(212,149,28,0.2),transparent_50%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">
                <Flame className="h-4 w-4" />
                Avivamento
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Clamamos por um avivamento que comece no Piauí e alcance o
                mundo.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Ore conosco por um derramar do Espírito Santo sobre a igreja, as
                famílias e as nações. Avivamento e missões caminham juntos.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/avivamento" className="btn-gold">
                  <Flame className="h-4 w-4" />
                  Conhecer o avivamento
                </Link>
                <Link href="/contato" className="btn-outline">
                  Orar conosco
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">
                Fique conectado
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">
                Receba notícias e pedidos de oração.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Acompanhe os projetos e ore conosco pelo Piauí, pelo Brasil e
                pelas nações.
              </p>
              <div className="mt-5">
                <NewsletterForm tone="dark" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
