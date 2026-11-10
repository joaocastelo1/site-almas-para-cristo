import { Download, FileText } from "lucide-react";

const coverStyles: Record<string, string> = {
  evangelismo: "from-brand-700 via-brand-900 to-ink-950",
  "missões": "from-emerald-700 via-emerald-900 to-ink-950",
  crianças: "from-amber-500 via-rose-600 to-rose-900",
  libertação: "from-violet-700 via-violet-900 to-ink-950",
};

export function EbookCard({
  ebook,
}: {
  ebook: {
    slug: string;
    title: string;
    description: string;
    pages: number;
    category: string;
  };
}) {
  const cover =
    coverStyles[ebook.category] ?? "from-brand-700 via-brand-900 to-ink-950";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/5">
      <div
        className={`relative flex min-h-[210px] flex-col justify-between overflow-hidden bg-gradient-to-br ${cover} p-6 text-white`}
      >
        <div className="absolute inset-0 grain opacity-60" />
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/15" />
        <div className="absolute -bottom-14 -left-8 h-36 w-36 rounded-full border border-white/10" />
        <div className="relative flex items-center justify-between">
          <span className="rounded-full border border-white/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
            {ebook.category}
          </span>
          <FileText className="h-5 w-5 text-white/70" />
        </div>
        <div className="relative">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60">
            Almas Para Cristo
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">
            {ebook.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex-1 text-sm leading-relaxed text-slate-600">
          {ebook.description}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <span className="text-xs font-medium text-slate-500">
            PDF gratuito &middot; {ebook.pages} páginas
          </span>
          <a
            href={`/api/ebooks/${ebook.slug}/download`}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-brand-800"
          >
            <Download className="h-3.5 w-3.5" />
            Baixar
          </a>
        </div>
      </div>
    </article>
  );
}
