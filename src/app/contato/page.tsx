import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  HeartHandshake,
  MessageCircle,
  Instagram,
  Youtube,
  Facebook,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a equipe Almas Para Cristo. Envie seu pedido de oração, tire dúvidas ou descubra como participar das missões.",
};

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Fale conosco. Estamos aqui para você."
        description="Quer conhecer Jesus, precisa de oração, deseja participar de uma missão ou apoiar a obra? Envie sua mensagem. Será uma alegria caminhar com você."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-semibold text-ink-900">
                Envie sua mensagem
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Preencha o formulário e nossa equipe responderá o mais breve
                possível.
              </p>
            </div>
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-[#fbfaf7] p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold text-ink-900">
                Informações de contato
              </h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">E-mail</p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-slate-600 transition hover:text-brand-800"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">Telefone</p>
                    <p className="text-slate-600">{SITE.phone}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">Localização</p>
                    <p className="text-slate-600">{SITE.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <Clock className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">Atendimento</p>
                    <p className="text-slate-600">
                      Segunda a sexta, das 8h às 18h
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-5">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-gold-400 hover:text-gold-600"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href={SITE.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-gold-400 hover:text-gold-600"
                >
                  <Youtube className="h-4 w-4" />
                </a>
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-gold-400 hover:text-gold-600"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-900 to-ink-950 p-6 text-white sm:p-8">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/10" />
              <div className="relative">
                <MessageCircle className="h-6 w-6 text-gold-300" />
                <h2 className="mt-3 font-display text-xl font-semibold">
                  Precisa de oração?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Nossa equipe intercede por cada pedido recebido. Você pode
                  escrever com liberdade: sua mensagem será tratada com cuidado
                  e respeito.
                </p>
                <p className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-300">
                  <HeartHandshake className="h-4 w-4" />
                  Orando por você
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
              <p className="font-display text-base italic text-ink-900">
                &ldquo;O Senhor está perto de todos os que o invocam.&rdquo;
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-600">
                Salmos 145:18
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-slate-200 bg-[#fbfaf7] p-6 text-center sm:p-10">
          <h2 className="font-display text-2xl font-semibold text-ink-900">
            Quer fazer parte da missão?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            Existem várias formas de participar: orando, contribuindo, servindo
            em um projeto ou se preparando para ser enviado. Conheça nossos
            projetos e descubra o seu lugar.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/missoes" className="btn-dark">
              Conhecer as missões
            </Link>
            <Link href="/ebooks" className="btn-ghost">
              Baixar ebooks gratuitos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
