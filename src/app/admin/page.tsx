import type { Metadata } from "next";
import Link from "next/link";
import {
  HeartHandshake,
  Inbox,
  Lock,
  Mail,
  ShieldCheck,
  Users,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin";
import { categoryLabel, formatDate } from "@/lib/site";
import {
  AdminLoginForm,
  AdminLogoutButton,
  AdminTestimonyActions,
} from "@/components/AdminControls";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Painel administrativo",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const admin = await isAdmin();

  if (!admin) {
    return (
      <section className="mx-auto max-w-xl px-5 py-20 sm:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
            <Lock className="h-5 w-5" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-semibold text-ink-900">
            Painel administrativo
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Área restrita da equipe Almas Para Cristo. Informe a senha para
            revisar testemunhos, contatos e inscrições.
          </p>
          <div className="mt-8">
            <AdminLoginForm />
          </div>
        </div>
      </section>
    );
  }

  const [pending, approved, contacts, subscribers] = await Promise.all([
    prisma.testimony.findMany({
      where: { approved: false },
      orderBy: { createdAt: "desc" },
    }),
    prisma.testimony.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.contact.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
    prisma.subscriber.findMany({ orderBy: { createdAt: "desc" }, take: 30 }),
  ]);

  const stats = [
    { label: "Aguardando revisão", value: pending.length, icon: Clock },
    { label: "Testemunhos publicados", value: approved.length, icon: CheckCircle2 },
    { label: "Mensagens de contato", value: contacts.length, icon: Mail },
    { label: "Inscritos na newsletter", value: subscribers.length, icon: Users },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
            <ShieldCheck className="h-4 w-4" />
            Área restrita
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900">
            Painel administrativo
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Gerencie os testemunhos enviados e acompanhe os contatos do site.
          </p>
        </div>
        <AdminLogoutButton />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <stat.icon className="h-5 w-5 text-gold-600" />
            <p className="mt-3 font-display text-3xl font-semibold text-ink-900">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold text-ink-900">
            Testemunhos aguardando aprovação
          </h2>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            {pending.length}
          </span>
        </div>

        {pending.length === 0 ? (
          <p className="mt-6 flex items-center gap-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
            <Inbox className="h-4 w-4" />
            Nenhum testemunho pendente no momento.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {pending.map((testimony) => (
              <article
                key={testimony.id}
                className="rounded-xl border border-amber-200 bg-amber-50/40 p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">
                    {categoryLabel(testimony.category)}
                  </span>
                  <span className="text-xs text-slate-500">
                    {formatDate(testimony.createdAt)}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink-900">
                  {testimony.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {testimony.name} &middot; {testimony.location}
                </p>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                  {testimony.content}
                </p>
                <div className="mt-4">
                  <AdminTestimonyActions
                    id={testimony.id}
                    approved={testimony.approved}
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="font-display text-xl font-semibold text-ink-900">
          Testemunhos publicados
        </h2>
        {approved.length === 0 ? (
          <p className="mt-6 text-sm text-slate-500">
            Nenhum testemunho publicado ainda.
          </p>
        ) : (
          <div className="mt-6 divide-y divide-slate-100">
            {approved.map((testimony) => (
              <div
                key={testimony.id}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-ink-900">
                    {testimony.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {testimony.name} &middot; {testimony.location} &middot;{" "}
                    {categoryLabel(testimony.category)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/testemunhos/${testimony.id}`}
                    className="text-xs font-semibold text-brand-800 hover:text-brand-600"
                  >
                    Ver no site
                  </Link>
                  <AdminTestimonyActions
                    id={testimony.id}
                    approved={testimony.approved}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink-900">
            <Mail className="h-5 w-5 text-gold-600" />
            Mensagens de contato
          </h2>
          {contacts.length === 0 ? (
            <p className="mt-6 text-sm text-slate-500">
              Nenhuma mensagem recebida ainda.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {contacts.map((contact) => (
                <article
                  key={contact.id}
                  className="rounded-xl border border-slate-100 bg-[#fbfaf7] p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-ink-900">
                      {contact.name}
                    </p>
                    <span className="text-[11px] text-slate-400">
                      {formatDate(contact.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {contact.email} &middot; {contact.subject}
                  </p>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                    {contact.message}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold text-ink-900">
            <HeartHandshake className="h-5 w-5 text-gold-600" />
            Inscritos na newsletter
          </h2>
          {subscribers.length === 0 ? (
            <p className="mt-6 text-sm text-slate-500">
              Nenhuma inscrição recebida ainda.
            </p>
          ) : (
            <ul className="mt-6 divide-y divide-slate-100">
              {subscribers.map((subscriber) => (
                <li
                  key={subscriber.id}
                  className="flex items-center justify-between gap-3 py-3 text-sm"
                >
                  <span className="text-slate-700">
                    {subscriber.name ?? "Sem nome"}
                  </span>
                  <span className="truncate text-xs text-slate-500">
                    {subscriber.email}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
