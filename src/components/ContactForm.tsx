"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export function ContactForm() {
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
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error ?? "Não foi possível enviar sua mensagem.");
      }

      setStatus("success");
      setMessage(
        "Mensagem enviada com sucesso! Em breve entraremos em contato. Deus abençoe."
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar sua mensagem."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="label">
            Seu nome
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            className="field"
            placeholder="Como podemos chamar você?"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="label">
            Seu e-mail
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className="field"
            placeholder="voce@email.com"
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="label">
          Assunto
        </label>
        <select id="contact-subject" name="subject" className="field" required>
          <option value="">Selecione um assunto</option>
          <option value="Quero conhecer Jesus">Quero conhecer Jesus</option>
          <option value="Quero participar de uma missão">
            Quero participar de uma missão
          </option>
          <option value="Pedido de oração">Pedido de oração</option>
          <option value="Parceria e doações">Parceria e doações</option>
          <option value="Outro assunto">Outro assunto</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="label">
          Mensagem
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          className="field resize-y"
          placeholder="Escreva sua mensagem, pedido de oração ou testemunho..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-dark w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        {status === "loading" ? "Enviando..." : "Enviar mensagem"}
      </button>

      <div aria-live="polite" className="min-h-5">
        {message && (
          <p
            className={`flex items-center gap-2 text-sm ${
              status === "success" ? "text-emerald-700" : "text-rose-700"
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
