"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export function NewsletterForm({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error ?? "Não foi possível concluir a inscrição.");
      }

      setStatus("success");
      setMessage(
        "Inscrição confirmada! Você receberá notícias das missões e pedidos de oração."
      );
      setName("");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível concluir a inscrição."
      );
    }
  }

  const dark = tone === "dark";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Seu nome (opcional)"
          className={
            dark
              ? "w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10 sm:w-44"
              : "field"
          }
          autoComplete="name"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Seu melhor e-mail"
          className={
            dark
              ? "w-full flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10"
              : "field flex-1"
          }
          autoComplete="email"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={
            dark
              ? "btn-gold shrink-0 disabled:cursor-not-allowed disabled:opacity-70"
              : "btn-dark shrink-0 disabled:cursor-not-allowed disabled:opacity-70"
          }
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {status === "loading" ? "Enviando" : "Inscrever"}
        </button>
      </div>

      <div aria-live="polite" className="mt-3 min-h-5">
        {message && (
          <p
            className={`flex items-center gap-2 text-sm ${
              status === "success"
                ? dark
                  ? "text-emerald-300"
                  : "text-emerald-700"
                : dark
                  ? "text-rose-300"
                  : "text-rose-700"
            }`}
          >
            {status === "success" && <CheckCircle2 className="h-4 w-4" />}
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
