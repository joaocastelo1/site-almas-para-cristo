"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, HeartHandshake } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_LINKS } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[#fbfaf7]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-0 xl:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-2.5 py-2 text-sm font-bold transition ${
                isActive(link.href)
                  ? "text-brand-800"
                  : "text-slate-600 hover:text-ink-900"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-gold-400" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <Link href="/contato" className="btn-gold !px-5 !py-2.5">
            <HeartHandshake className="h-4 w-4" aria-hidden="true" />
            Quero participar
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-slate-300 text-ink-900 transition hover:bg-white xl:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="menu-mobile"
          className="border-t border-slate-200 bg-[#fbfaf7] px-5 pb-6 pt-3 xl:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Menu móvel">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                  isActive(link.href)
                    ? "bg-brand-50 text-brand-800"
                    : "text-slate-700 hover:bg-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contato" className="btn-gold mt-3">
              <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              Quero participar
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
