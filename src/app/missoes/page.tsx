import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Flame,
  Globe2,
  HeartHandshake,
  MapPin,
  SlidersHorizontal,
} from "lucide-react";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  AUDIENCES,
  JOURNEY_ORDER,
  REGIONS,
  audienceLabel,
  regionRole,
} from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { MissionCard } from "@/components/MissionCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Missões",
  description:
    "Do Piauí ao mundo: nossa base no Piauí, a região Nordeste, a nação brasileira e o alcance às nações. Projetos para crianças, adolescentes e adultos.",
};

type SearchParams = Promise<{ regiao?: string; publico?: string }>;

function buildHref({
  regiao,
  publico,
}: {
  regiao?: string;
  publico?: string;
}) {
  const params = new URLSearchParams();
  if (regiao) params.set("regiao", regiao);
  if (publico) params.set("publico", publico);
  const query = params.toString();
  return query ? `/missoes?${query}` : "/missoes";
}

export default async function MissoesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { regiao, publico } = await searchParams;

  const where: Prisma.MissionWhereInput = {};
  if (regiao && regiao in REGIONS) where.region = regiao;
  if (publico && publico in AUDIENCES) where.audience = publico;

  const [missions, piauiMissions] = await Promise.all([
    prisma.mission.findMany({
      where,
      orderBy: [{ region: "asc" }, { audience: "asc" }],
    }),
    prisma.mission.findMany({
      where: { region: "piaui" },
      orderBy: { audience: "asc" },
    }),
  ]);

  const audienceKeys = Object.keys(AUDIENCES) as Array<
    keyof typeof AUDIENCES
  >;

  return (
    <>
      <PageHero
        eyebrow="Missões"
        title="Do Piauí ao mundo"
        description="Nossa base é o Piauí, nossa região é o Nordeste, nossa nação é o Brasil e nosso campo é o mundo. Conheça os projetos e descubra como você pode fazer parte."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contato" className="btn-gold">
            <HeartHandshake className="h-4 w-4" />
            Quero participar
          </Link>
          <Link href="/ebooks" className="btn-outline">
            Materiais gratuitos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div className="grid gap-8 rounded-3xl border border-gold-200 bg-gradient-to-br from-gold-50 via-[#fbfaf7] to-white p-6 shadow-sm sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-700">
              <MapPin className="h-4 w-4" />
              Nossa base
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
              Do Piauí para o mundo
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              Teresina é a nossa base. Daqui saem oração, equipes e recursos
              para o Nordeste, o Brasil e as nações. Antes de enviar, servimos
              onde Deus nos colocou: nas comunidades ribeirinhas, rurais e
              urbanas do Piauí.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/missoes?regiao=piaui" className="btn-dark">
                Ver projetos no Piauí
              </Link>
              <Link href="/contato" className="btn-ghost">
                Servir na base
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Projetos na base
            </p>
            {piauiMissions.map((mission) => (
              <div
                key={mission.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4"
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-600">
                    {audienceLabel(mission.audience)}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-ink-900">
                    {mission.title}
                  </p>
                </div>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-800">
                  {regionRole(mission.region)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY_ORDER.map((key, index) => (
            <Link
              key={key}
              href={`/missoes?regiao=${key}`}
              className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-200 hover:shadow-sm"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink-900 font-display text-sm font-semibold text-gold-300">
                {index + 1}
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {REGIONS[key].role}
                </p>
                <p className="text-sm font-semibold text-ink-900">
                  {REGIONS[key].label}
                </p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-brand-700" />
            </Link>
          ))}
        </div>

        <Link
          href="/missionarios"
          className="group mt-6 flex flex-col gap-3 rounded-2xl border border-gold-200 bg-gold-50/70 p-5 transition hover:border-gold-300 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-700">
              Galeria da fé
            </p>
            <p className="mt-1 text-sm font-semibold text-ink-900">
              Conheça missionários que marcaram o mundo, o Brasil e o Nordeste.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-800">
            Ver biografias
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </span>
        </Link>
      </section>

      <section className="mt-16 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                <SlidersHorizontal className="h-4 w-4" />
                Filtrar por campo missionário
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href={buildHref({ publico })}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    !regiao
                      ? "bg-ink-900 text-white"
                      : "border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-800"
                  }`}
                >
                  Todas
                </Link>
                {JOURNEY_ORDER.map((key) => (
                  <Link
                    key={key}
                    href={buildHref({ regiao: key, publico })}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      regiao === key
                        ? "bg-ink-900 text-white"
                        : "border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-800"
                    }`}
                  >
                    {REGIONS[key].label}
                    <span className="ml-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] opacity-60">
                      {REGIONS[key].role}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                <Globe2 className="h-4 w-4" />
                Filtrar por público
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href={buildHref({ regiao })}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    !publico
                      ? "bg-gold-400 text-ink-900"
                      : "border border-slate-200 text-slate-600 hover:border-gold-300 hover:text-ink-900"
                  }`}
                >
                  Todos
                </Link>
                {audienceKeys.map((key) => (
                  <Link
                    key={key}
                    href={buildHref({ regiao, publico: key })}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      publico === key
                        ? "bg-gold-400 text-ink-900"
                        : "border border-slate-200 text-slate-600 hover:border-gold-300 hover:text-ink-900"
                    }`}
                  >
                    {AUDIENCES[key].label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-8 flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4 text-gold-600" />
            {missions.length}{" "}
            {missions.length === 1
              ? "projeto encontrado"
              : "projetos encontrados"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        {missions.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Globe2 className="mx-auto h-10 w-10 text-slate-300" />
            <h2 className="mt-4 font-display text-2xl font-semibold text-ink-900">
              Nenhum projeto encontrado
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Tente combinar outros filtros ou veja todos os projetos.
            </p>
            <Link href="/missoes" className="btn-dark mt-6">
              Ver todos os projetos
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {missions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-900 to-ink-950 px-6 py-12 text-white sm:px-12 sm:py-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full border border-gold-400/20" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">
              Faça parte
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Deus pode estar chamando você para a missão.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              Você pode orar, contribuir ou ir. Seja qual for o seu chamado,
              existe um lugar para você na obra de Deus. Fale conosco e
              descubra como participar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contato" className="btn-gold">
                <HeartHandshake className="h-4 w-4" />
                Quero participar
              </Link>
              <Link href="/avivamento" className="btn-outline">
                <Flame className="h-4 w-4" />
                Avivamento
              </Link>
              <Link href="/mensagens" className="btn-outline">
                Ler mensagens
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
