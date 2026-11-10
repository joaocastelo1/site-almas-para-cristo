import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { SITE } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | Esperança, fé e missões`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "esperança",
    "fé",
    "Jesus",
    "missões",
    "evangelismo",
    "avivamento",
    "Piauí",
    "Teresina",
    "Nordeste",
    "Brasil",
    "Bíblia",
    "testemunhos",
    "ebooks cristãos",
    "Almas Para Cristo",
  ],
  openGraph: {
    title: `${SITE.name} | Esperança, fé e missões`,
    description: SITE.description,
    type: "website",
    locale: "pt_BR",
    siteName: SITE.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem("theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
