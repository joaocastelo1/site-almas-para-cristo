import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Globe2,
  HeartHandshake,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import {
  BRAZIL_MISSIONARIES,
  NORTHEAST_MISSIONARIES,
  NORTHEAST_STATE_COVERAGE,
  WORLD_MISSIONARIES,
} from "@/lib/missionaries";
import type { Missionary } from "@/lib/missionaries";

export const metadata: Metadata = {
  title: "Missionários",
  description:
    "Biografias resumidas de pastores e missionários evangélicos que marcaram o mundo, o Brasil e o Nordeste. Histórias de fé, coragem e compromisso com a Grande Comissão.",
};

const anchors = [
  { href: "#mundo", label: "Mundo", icon: Globe2 },
  { href: "#brasil", label: "Brasil", icon: Compass },
  { href: "#nordeste", label: "Nordeste", icon: MapPin },
] as const;

function MissionaryCard({ missionary }: { missionary: Missionary }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-xl font-semibold leading-snug text-ink-900">
            {missionary.name}
          </h3>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-600">
            {missionary.years}
          </p>
        </div>
        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-800">
          {missionary.field}
        </span>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
        <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-600" />
        {missionary.place}
      </p>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
        {missionary.summary}
      </p>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          Legado
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
          {missionary.legacy}
        </p>
      </div>
    </article>
  );
}

function MissionarySection({
  id,
  eyebrow,
  title,
  description,
  missionaries,
  tone = "light",
  beforeGrid,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  missionaries: Missionary[];
  tone?: "light" | "white";
  beforeGrid?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-32 ${
        tone === "white"
          ? "border-y border-slate-200 bg-white"
          : "bg-[#fbfaf7]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold-200 bg-gold-50/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-700">
            <Users className="h-3.5 w-3.5" />
            {missionaries.length} nomes
          </span>
        </div>

        {beforeGrid && <div className="mt-10">{beforeGrid}</div>}

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {missionaries.map((missionary) => (
            <MissionaryCard key={missionary.name} missionary={missionary} />
          ))}
        </div>

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export default function MissionariosPage() {
  return (
    <>
      <PageHero
        eyebrow="Galeria da fé"
        title="Missionários evangélicos que marcaram o mundo, o Brasil e o Nordeste"
        description="Histórias de pastores e missionários que amaram a Cristo e gastaram a vida para que outros o conhecessem. Não é um ranking nem um panteão: é uma nuvem de testemunhas que nos chama a continuar a missão."
      >
        <div className="flex flex-wrap gap-3">
          <a href="#mundo" className="btn-gold">
            <Globe2 className="h-4 w-4" />
            Explorar biografias
          </a>
          <Link href="/missoes" className="btn-outline">
            Conhecer as missões
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      <div className="sticky top-[74px] z-30 border-b border-slate-200 bg-[#fbfaf7]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-5 py-3 sm:px-8">
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Ir para
          </span>
          {anchors.map((anchor) => {
            const Icon = anchor.icon;
            return (
              <a
                key={anchor.href}
                href={anchor.href}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-800"
              >
                <Icon className="h-3.5 w-3.5 text-gold-600" />
                {anchor.label}
              </a>
            );
          })}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Por que conhecer esses nomes"
              title="Histórias que nos enviam mais longe."
              description="Alguns são amplamente conhecidos; outros serviram em silêncio. Todos nos lembram de que a missão não pertence a uma geração, mas continua de mãos em mãos."
            />
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Escolhemos nomes de pastores e missionários evangélicos que
              marcaram a história da missão pelo amor às Escrituras, pela
              coragem em campos difíceis e pelos frutos que deixaram. O objetivo
              não é admirar pessoas, mas seguir o Cristo que elas serviram.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                {
                  title: "Fidelidade",
                  text: "Amor a Cristo e às Escrituras acima de tudo.",
                },
                {
                  title: "Coragem",
                  text: "Disposição de servir em campos difíceis.",
                },
                {
                  title: "Frutos",
                  text: "Vidas alcançadas e igrejas fortalecidas.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-600">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-900 to-ink-950 p-8 text-white sm:p-10">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
            <div className="absolute -bottom-20 -left-12 h-64 w-64 rounded-full border border-gold-400/20" />
            <div className="relative">
              <BookOpen className="h-7 w-7 text-gold-300" />
              <p className="mt-5 font-display text-2xl font-semibold leading-snug">
                &ldquo;Portanto, nós também, pois estamos rodeados de tão grande
                nuvem de testemunhas, deixemos todo o embaraço e corramos com
                perseverança a carreira que nos está proposta.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">
                Hebreus 12:1
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-16">
        <MissionarySection
          id="mundo"
          eyebrow="Mundo"
          title="Missionários que atravessaram fronteiras"
          description="De Paulo aos campos mais difíceis da atualidade, estes nomes ajudaram a igreja a enxergar além do próprio quintal."
          missionaries={WORLD_MISSIONARIES}
        />
      </div>

      <MissionarySection
        id="brasil"
        eyebrow="Brasil"
        title="Missionários que plantaram o evangelho em nossa nação"
        description="Dos primeiros missionários protestantes aos avivamentos e movimentos pentecostais, pastores e missionários serviram para que o evangelho chegasse a cada região."
        missionaries={BRAZIL_MISSIONARIES}
        tone="white"
      />

      <MissionarySection
        id="nordeste"
        eyebrow="Nordeste"
        title="Missionários que serviram no nosso chão"
        description="Os nove estados do Nordeste estão representados por pastores e missionários evangélicos que plantaram igrejas, formaram obreiros e serviram em campos difíceis."
        missionaries={NORTHEAST_MISSIONARIES}
        beforeGrid={
          <div>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-600">
                  Presença por estado
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Todos os nove estados do Nordeste estão representados.
                </p>
              </div>
              <span className="rounded-full border border-gold-200 bg-gold-50/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-700">
                9 estados
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {NORTHEAST_STATE_COVERAGE.map((item) => (
                <div
                  key={item.uf}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-display text-base font-semibold text-ink-900">
                      {item.state}
                    </p>
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-800">
                      {item.uf}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {item.missionaries.join(" • ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <div className="rounded-2xl border border-gold-200 bg-gold-50/70 p-6 sm:flex sm:items-center sm:justify-between sm:gap-8">
          <div className="flex gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-ink-900 text-gold-300">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-ink-900">
                Nosso chão também está nessa história.
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                George William Butler visitou Teresina em 1886 e 1887, e William
                McQuown Thompson batizou os primeiros presbiterianos da capital
                em 1902. Hoje, a Almas Para Cristo serve comunidades ribeirinhas,
                rurais e urbanas do nosso estado, levando o mesmo evangelho.
              </p>
            </div>
          </div>
          <Link
            href="/missoes?regiao=piaui"
            className="btn-dark mt-5 shrink-0 sm:mt-0"
          >
            Ver missões no Piauí
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </MissionarySection>

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-24">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-6 py-12 text-white sm:px-12 sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,98,246,0.32),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(212,149,28,0.2),transparent_50%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">
                <Sparkles className="h-4 w-4" />
                A missão continua
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                A mesma fé que os enviou continua nos enviando.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
                Se Deus despertou seu coração para servir, orar ou sustentar a
                obra, dê o próximo passo. Você não precisa ser famoso para ser
                usado por Deus.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link href="/contato" className="btn-gold">
                <HeartHandshake className="h-4 w-4" />
                Quero servir
              </Link>
              <Link href="/missoes" className="btn-outline">
                Conhecer projetos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
