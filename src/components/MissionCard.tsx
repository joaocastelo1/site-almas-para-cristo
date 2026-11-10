import { Globe2, Map, MapPin, Sun, Users, Target, ChevronDown } from "lucide-react";
import {
  audienceLabel,
  paragraphs,
  regionLabel,
  regionRole,
} from "@/lib/site";

const regionStyles: Record<string, string> = {
  mundo: "bg-brand-50 text-brand-800 ring-brand-200",
  brasil: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  nordeste: "bg-amber-50 text-amber-800 ring-amber-200",
  piaui: "bg-rose-50 text-rose-800 ring-rose-200",
};

function RegionIcon({ region }: { region: string }) {
  const className = "h-4 w-4";
  if (region === "mundo") return <Globe2 className={className} />;
  if (region === "brasil") return <Map className={className} />;
  if (region === "nordeste") return <Sun className={className} />;
  return <MapPin className={className} />;
}

export function MissionCard({
  mission,
}: {
  mission: {
    slug: string;
    title: string;
    region: string;
    audience: string;
    description: string;
    details: string;
    goal: string;
  };
}) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ring-inset ${
            regionStyles[mission.region] ?? "bg-slate-50 text-slate-700 ring-slate-200"
          }`}
        >
          <RegionIcon region={mission.region} />
          {regionLabel(mission.region)}
          <span className="opacity-60">&middot; {regionRole(mission.region)}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
          <Users className="h-3.5 w-3.5" />
          {audienceLabel(mission.audience)}
        </span>
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold text-ink-900">
        {mission.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {mission.description}
      </p>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
        <Target className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
        <span>
          <strong className="font-semibold text-ink-900">Meta: </strong>
          {mission.goal}
        </span>
      </div>

      <details className="group/details mt-4">
        <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-brand-800 transition hover:text-brand-600">
          Conhecer o projeto
          <ChevronDown className="h-4 w-4 transition group-open/details:rotate-180" />
        </summary>
        <div className="mt-3 space-y-3 border-t border-slate-100 pt-3">
          {paragraphs(mission.details).map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-slate-600">
              {paragraph}
            </p>
          ))}
        </div>
      </details>
    </article>
  );
}
