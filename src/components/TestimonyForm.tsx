"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { TESTIMONY_CATEGORIES } from "@/lib/site";

export function TestimonyForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/testemunhos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          title: formData.get("title"),
          category: formData.get("category"),
          location: formData.get("location"),
          content: formData.get("content"),
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error ?? "Não foi possível enviar seu testemunho.");
      }

      setStatus("success");
      setMessage(
        "Glória a Deus! Seu testemunho foi recebido e será revisado pela nossa equipe antes de ser publicado."
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar seu testemunho."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="testimony-name" className="label">
            Seu nome
          </label>
          <input
            id="testimony-name"
            name="name"
            type="text"
            required
            className="field"
            placeholder="Seu nome"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="testimony-location" className="label">
            Cidade / Estado
          </label>
          <input
            id="testimony-location"
            name="location"
            type="text"
            required
            className="field"
            placeholder="Ex.: Teresina, PI"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="testimony-title" className="label">
            Título do testemunho
          </label>
          <input
            id="testimony-title"
            name="title"
            type="text"
            required
            className="field"
            placeholder="Ex.: Deus curou minha família"
          />
        </div>
        <div>
          <label htmlFor="testimony-category" className="label">
            Categoria
          </label>
          <select
            id="testimony-category"
            name="category"
            className="field"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Selecione
            </option>
            {Object.entries(TESTIMONY_CATEGORIES).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="testimony-content" className="label">
          Conte o que Deus fez
        </label>
        <textarea
          id="testimony-content"
          name="content"
          required
          rows={6}
          minLength={40}
          className="field resize-y"
          placeholder="Compartilhe com detalhes o que Deus realizou na sua vida..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {status === "loading" ? "Enviando..." : "Enviar testemunho"}
      </button>

      <div aria-live="polite" className="min-h-5">
        {message && (
          <p
            className={`flex items-start gap-2 text-sm ${
              status === "success" ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {status === "success" && (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
