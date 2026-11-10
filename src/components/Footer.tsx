import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { Logo } from "./Logo";
import { FOOTER_LINKS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-slate-400">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand-700/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo variant="dark" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Somos um movimento de cristãos apaixonados por missões e
              evangelismo. Nossa base é o Piauí; nosso campo é o mundo.
              Alcançamos crianças, adolescentes e adultos com o amor de Jesus.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-gold-400/60 hover:text-gold-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SITE.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-gold-400/60 hover:text-gold-300"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-gold-400/60 hover:text-gold-300"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Navegação
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-gold-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Missões
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/missoes?regiao=piaui" className="transition hover:text-gold-300">
                  Piauí <span className="text-[10px] uppercase tracking-wider text-slate-500">Base</span>
                </Link>
              </li>
              <li>
                <Link href="/missoes?regiao=nordeste" className="transition hover:text-gold-300">
                  Nordeste <span className="text-[10px] uppercase tracking-wider text-slate-500">Região</span>
                </Link>
              </li>
              <li>
                <Link href="/missoes?regiao=brasil" className="transition hover:text-gold-300">
                  Brasil <span className="text-[10px] uppercase tracking-wider text-slate-500">Nação</span>
                </Link>
              </li>
              <li>
                <Link href="/missoes?regiao=mundo" className="transition hover:text-gold-300">
                  Mundo <span className="text-[10px] uppercase tracking-wider text-slate-500">Alcance</span>
                </Link>
              </li>
              <li>
                <Link href="/testemunhos" className="transition hover:text-gold-300">
                  Testemunhos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Fale conosco
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a href={`mailto:${SITE.email}`} className="transition hover:text-gold-300">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>{SITE.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>{SITE.address}</span>
              </li>
            </ul>
            <Link
              href="/contato"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 transition hover:text-gold-200"
            >
              Enviar uma mensagem
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-center">
          <p className="font-display text-base italic text-slate-300">
            &ldquo;Portanto ide, fazei discípulos de todas as nações...&rdquo;
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            Mateus 28:19
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. Todos os direitos
            reservados.
          </p>
          <p>Feito com fé, para a glória de Deus.</p>
        </div>

        <div className="mt-4 flex flex-col items-center justify-center gap-1 text-center text-xs text-slate-500 sm:flex-row sm:gap-2">
          <p>
            Desenvolvido por{" "}
            <span className="font-semibold text-slate-300">
              João Castelo de Sousa Ferreira
            </span>
          </p>
          <span className="hidden text-slate-700 sm:inline">·</span>
          <a
            href="https://wa.me/5586999032854"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-gold-300 transition hover:text-gold-200"
          >
            <Phone className="h-3.5 w-3.5" />
            WhatsApp (86) 99903-2854
          </a>
        </div>
      </div>
    </footer>
  );
}
