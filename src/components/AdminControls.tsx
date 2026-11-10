"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  EyeOff,
  Loader2,
  Lock,
  LogIn,
  LogOut,
  Trash2,
} from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error ?? "Não foi possível entrar.");
      }

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Não foi possível entrar."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-5">
      <div>
        <label htmlFor="admin-password" className="label">
          Senha de administrador
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            id="admin-password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="field pl-11"
            placeholder="Digite a senha"
            autoComplete="current-password"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-dark w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <LogIn className="h-4 w-4" />
        )}
        {loading ? "Entrando..." : "Entrar no painel"}
      </button>

      <div aria-live="polite" className="min-h-5">
        {error && <p className="text-sm text-rose-700">{error}</p>}
      </div>
    </form>
  );
}

export function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white disabled:opacity-60"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
      Sair
    </button>
  );
}

export function AdminTestimonyActions({
  id,
  approved,
}: {
  id: number;
  approved: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<"toggle" | "delete" | null>(null);
  const [error, setError] = useState("");

  async function toggle() {
    setBusy("toggle");
    setError("");
    try {
      const response = await fetch(`/api/admin/testemunhos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: !approved }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? "Não foi possível atualizar.");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao atualizar.");
    } finally {
      setBusy(null);
    }
  }

  async function remove() {
    if (
      !window.confirm(
        "Tem certeza que deseja excluir este testemunho? Esta ação não pode ser desfeita."
      )
    ) {
      return;
    }

    setBusy("delete");
    setError("");
    try {
      const response = await fetch(`/api/admin/testemunhos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? "Não foi possível excluir.");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={toggle}
        disabled={busy !== null}
        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition disabled:opacity-60 ${
          approved
            ? "border border-slate-300 text-slate-700 hover:bg-slate-50"
            : "bg-emerald-600 text-white hover:bg-emerald-500"
        }`}
      >
        {busy === "toggle" ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : approved ? (
          <EyeOff className="h-3.5 w-3.5" />
        ) : (
          <Check className="h-3.5 w-3.5" />
        )}
        {approved ? "Despublicar" : "Aprovar"}
      </button>
      <button
        type="button"
        onClick={remove}
        disabled={busy !== null}
        className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 px-3.5 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 disabled:opacity-60"
      >
        {busy === "delete" ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Trash2 className="h-3.5 w-3.5" />
        )}
        Excluir
      </button>
      {error && <span className="text-xs text-rose-700">{error}</span>}
    </div>
  );
}
