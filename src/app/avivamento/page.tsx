import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Cross,
  Flame,
  Globe2,
  HeartHandshake,
  Map,
  MapPin,
  Sun,
} from "lucide-react";
import {
  JOURNEY_ORDER,
  REGIONS,
  REVIVAL_FOCUS,
  REVIVAL_PILLARS,
  REVIVAL_PRAYERS,
} from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Avivamento",
  description:
    "Clamamos por avivamento em todas as partes do mundo: no Piauí, no Nordeste, no Brasil e entre as nações. Oração, santidade, evangelismo e missões.",
};

const regionIcons = {
  mundo: Globe2,
  brasil: Map,
  nordeste: Sun,
  piaui: MapPin,
} as const;

export default function AvivamentoPage() {
  return (
    <>
      <PageHero
        eyebrow="Avivamento"
        title="Avivamento em todas as partes do mundo"
        description="Não nos contentamos com projetos e programas. Clamamos por um derramar do Espírito Santo que desperte a igreja, restaure famílias e alcance nações. Avivamento e missões caminham juntos."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contato" className="btn-gold">
            <Flame className="h-4 w-4" />
            Orar por avivamento
          </Link>
          <Link href="/missoes" className="btn-outline">
            Conhecer as missões
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="O que é avivamento"
              title="Um despertar que começa em Deus e transborda em missão."
              description="Avivamento não é um evento passageiro nem um show emocional. É a ação soberana do Espírito Santo que traz arrependimento, fome da Palavra, santidade e paixão pelas almas."
            />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              <p>
                Ao longo da história, Deus visitou seu povo com avivamentos que
                transformaram igrejas, cidades e nações. Homens e mulheres
                voltaram-se para a oração, confessaram seus pecados e passaram a
                viver o evangelho com ousadia.
              </p>
              <p>
                Cremos que o mesmo Deus continua agindo hoje. Por isso, oramos
                pelo Piauí, pelo Nordeste, pelo Brasil e pelo mundo, pedindo que
                o Espírito Santo desperte uma geração comprometida com a grande
                comissão.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/biblia" className="btn-dark">
                <BookOpen className="h-4 w-4" />
                Ler a Bíblia
              </Link>
              <Link href="/testemunhos" className="btn-ghost">
                Ver testemunhos
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-900 to-ink-950 p-8 text-white sm:p-10">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
            <div className="absolute -bottom-20 -left-12 h-64 w-64 rounded-full border border-gold-400/20" />
            <div className="relative">
              <Flame className="h-7 w-7 text-gold-300" />
              <p className="mt-5 font-display text-2xl font-semibold leading-snug sm:text-3xl">
                &ldquo;Se o meu povo, que se chama pelo meu nome, se humilhar, e
                orar, e buscar a minha face, e se converter dos seus maus
                caminhos, então eu ouvirei dos céus, e perdoarei os seus
                pecados, e sararei a sua terra.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">
                2 Crônicas 7:14
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            eyebrow="Um clamor que atravessa fronteiras"
            title="Avivamento do Piauí ao mundo"
            description="Oramos por um despertar que comece na nossa base e alcance cada vez mais longe, sem esquecer as pessoas e os lugares onde Deus nos colocou."
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY_ORDER.map((key) => {
              const Icon = regionIcons[key];
              return (
                <Link
                  key={key}
                  href={`/missoes?regiao=${key}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-[#fbfaf7] p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-700 to-ink-950 text-gold-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gold-700 ring-1 ring-gold-200">
                      {REGIONS[key].role}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink-900">
                    {REGIONS[key].label}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {REVIVAL_FOCUS[key]}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-800">
                    Ver projetos
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Como buscamos"
          title="Quatro marcas de um avivamento verdadeiro"
          description="Avivamento não é apenas emoção; é transformação profunda que alcança a vida inteira e nos envia ao mundo."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {REVIVAL_PILLARS.map((pillar, index) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl font-semibold text-slate-200">
                  0{index + 1}
                </span>
                <Flame className="h-5 w-5 text-gold-500" />
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink-900">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {pillar.text}
              </p>
              <p className="mt-4 inline-flex rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-800">
                {pillar.verse}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionHeading
            eyebrow="Guia de oração"
            title="7 dias de oração por avivamento"
            description="Separe alguns minutos por dia e junte-se a nós neste clamor. O avivamento começa quando a igreja volta a orar."
            align="center"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REVIVAL_PRAYERS.map((prayer) => (
              <div
                key={prayer.day}
                className="rounded-2xl border border-slate-200 bg-[#fbfaf7] p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-ink-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-300">
                    {prayer.day}
                  </span>
                  <Flame className="h-4 w-4 text-gold-500" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-ink-900">
                  {prayer.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {prayer.text}
                </p>
              </div>
            ))}
            <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-brand-800 via-brand-900 to-ink-950 p-6 text-white">
              <Cross className="h-5 w-5 text-gold-300" />
              <p className="mt-3 font-display text-lg font-semibold leading-snug">
                Quer que oremos com você?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Envie seu pedido de oração. Nossa equipe intercede por cada
                mensagem recebida.
              </p>
              <Link
                href="/contato"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-300 transition hover:text-gold-200"
              >
                Enviar pedido
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-12 text-white sm:px-12 sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,98,246,0.32),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(212,149,28,0.2),transparent_50%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">
                <HeartHandshake className="h-4 w-4" />
                Junte-se a nós
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Receba os pedidos de oração e notícias de avivamento.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
                Inscreva-se para acompanhar os projetos missionários, receber
                mensagens de fé e orar conosco pelo Piauí, pelo Brasil e pelas
                nações.
              </p>
            </div>
            <NewsletterForm tone="dark" />
          </div>
        </div>
      </section>
    </>
  );
}
