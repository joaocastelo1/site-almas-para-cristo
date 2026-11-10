import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,98,246,0.32),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(212,149,28,0.16),transparent_50%)]" />
      <div className="hero-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold-300">
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {description}
          </p>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
