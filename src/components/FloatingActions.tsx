"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Moon, Sun } from "lucide-react";

export function FloatingActions() {
  const [dark, setDark] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));

    const onScroll = () => setShowTop(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage indisponível: mantém apenas a preferência da sessão.
    }
    setDark(next);
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-center gap-2.5 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
        title={dark ? "Modo claro" : "Modo escuro"}
        aria-pressed={dark}
        className="fab"
      >
        {dark ? (
          <Sun className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Moon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Voltar ao topo"
        aria-hidden={!showTop}
        tabIndex={showTop ? 0 : -1}
        title="Voltar ao topo"
        className={`fab ${
          showTop
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
