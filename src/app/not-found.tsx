import Link from "next/link";
import { Compass, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,98,246,0.3),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(212,149,28,0.16),transparent_50%)]" />
      <div className="hero-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
        <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-white/5 text-gold-300">
          <Compass className="h-7 w-7" />
        </span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">
          Erro 404
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Esta página não foi encontrada
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base">
          Talvez o endereço tenha mudado ou o conteúdo não esteja mais
          disponível. Mas a boa notícia é que há muito mais para você explorar.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-gold">
            <Home className="h-4 w-4" />
            Voltar ao início
          </Link>
          <Link href="/missoes" className="btn-outline">
            <ArrowLeft className="h-4 w-4" />
            Ver missões
          </Link>
        </div>
      </div>
    </section>
  );
}
