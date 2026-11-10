import Link from "next/link";
import { ArrowRight, MapPin, Quote } from "lucide-react";
import { categoryLabel } from "@/lib/site";

const categoryStyles: Record<string, string> = {
  cura: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  libertacao: "bg-violet-50 text-violet-700 ring-violet-200",
  milagre: "bg-amber-50 text-amber-700 ring-amber-200",
  provisao: "bg-sky-50 text-sky-700 ring-sky-200",
  restauracao: "bg-rose-50 text-rose-700 ring-rose-200",
};

export function TestimonyCard({
  testimony,
  featured = false,
}: {
  testimony: {
    id: number;
    name: string;
    title: string;
    category: string;
    location: string;
    content: string;
  };
  featured?: boolean;
}) {
  const excerpt =
    testimony.content.length > 190
      ? `${testimony.content.slice(0, 190).trimEnd()}...`
      : testimony.content;

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/5 ${
        featured ? "sm:p-8" : ""
      }`}
    >
      <Quote className="absolute right-5 top-5 h-10 w-10 text-slate-100" />
      <span
        className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ring-inset ${
          categoryStyles[testimony.category] ??
          "bg-slate-50 text-slate-700 ring-slate-200"
        }`}
      >
        {categoryLabel(testimony.category)}
      </span>
      <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-ink-900">
        {testimony.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
        {excerpt}
      </p>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div>
          <p className="text-sm font-semibold text-ink-900">{testimony.name}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="h-3.5 w-3.5" />
            {testimony.location}
          </p>
        </div>
        <Link
          href={`/testemunhos/${testimony.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-800 transition hover:text-brand-600"
        >
          Ler
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
