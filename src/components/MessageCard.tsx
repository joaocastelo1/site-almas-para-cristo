import Link from "next/link";
import { ArrowRight, BookOpen, User } from "lucide-react";
import { formatDate } from "@/lib/site";

export function MessageCard({
  message,
}: {
  message: {
    slug: string;
    title: string;
    excerpt: string;
    verse: string;
    author: string;
    createdAt: Date | string;
  };
}) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">
        <BookOpen className="h-4 w-4" />
        Mensagem
      </div>
      <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-ink-900">
        <Link href={`/mensagens/${message.slug}`} className="hover:text-brand-800">
          {message.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
        {message.excerpt}
      </p>
      <p className="mt-4 rounded-xl bg-brand-50/70 px-4 py-3 text-xs font-medium italic leading-relaxed text-brand-900">
        {message.verse}
      </p>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5" />
          {message.author}
        </span>
        <span>{formatDate(message.createdAt)}</span>
      </div>
      <Link
        href={`/mensagens/${message.slug}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-800 transition hover:text-brand-600"
      >
        Ler mensagem
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </Link>
    </article>
  );
}
