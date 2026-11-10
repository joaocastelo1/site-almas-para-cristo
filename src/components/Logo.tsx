import Link from "next/link";

export function Logo({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 ${className}`}
      aria-label="Almas Para Cristo - Início"
    >
      <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 via-brand-800 to-ink-950 text-white shadow-lg shadow-brand-900/25 ring-1 ring-white/15 transition group-hover:shadow-brand-900/40">
        <svg
          viewBox="0 0 32 32"
          className="h-6 w-6"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="16"
            cy="16"
            r="10.5"
            stroke="currentColor"
            strokeWidth="1.3"
            opacity="0.55"
          />
          <path
            d="M5.5 16h21M16 5.5c3.1 2.9 4.9 6.5 4.9 10.5s-1.8 7.6-4.9 10.5M16 5.5c-3.1 2.9-4.9 6.5-4.9 10.5s1.8 7.6 4.9 10.5"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.45"
          />
          <path
            d="M16 8.5v15M11.5 13h9"
            stroke="var(--color-gold-300)"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="leading-tight">
        <span
          className={`block font-display text-[1.05rem] font-semibold tracking-tight ${
            variant === "dark" ? "text-white" : "text-ink-900"
          }`}
        >
          Almas Para Cristo
        </span>
        <span className="block text-[9.5px] font-semibold uppercase tracking-[0.24em] text-gold-600">
          Missões &amp; Evangelismo
        </span>
      </span>
    </Link>
  );
}
