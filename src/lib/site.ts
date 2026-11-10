export const SITE = {
  name: "Almas Para Cristo",
  tagline: "Missões & Evangelismo",
  slogan: "Do Piauí ao mundo",
  description:
    "Há esperança para você. Do Piauí ao mundo, a Almas Para Cristo ora, serve e anuncia Jesus. Encontre uma palavra de esperança, leia a Bíblia, conheça projetos missionários e faça parte do que Deus está fazendo.",
  email: "contato@almasparacristo.org",
  phone: "+55 (86) 99999-0000",
  address: "Teresina, Piauí - Brasil",
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
  facebook: "https://facebook.com",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/missoes", label: "Missões" },
  { href: "/missionarios", label: "Missionários" },
  { href: "/avivamento", label: "Avivamento" },
  { href: "/biblia", label: "Bíblia" },
  { href: "/testemunhos", label: "Testemunhos" },
  { href: "/mensagens", label: "Mensagens" },
  { href: "/ebooks", label: "Ebooks" },
  { href: "/contato", label: "Contato" },
] as const;

export const FOOTER_LINKS = [
  { href: "/", label: "Início" },
  { href: "/missoes", label: "Missões" },
  { href: "/missionarios", label: "Missionários" },
  { href: "/avivamento", label: "Avivamento" },
  { href: "/biblia", label: "Bíblia" },
  { href: "/testemunhos", label: "Testemunhos" },
  { href: "/mensagens", label: "Mensagens" },
  { href: "/ebooks", label: "Ebooks" },
  { href: "/contato", label: "Contato" },
] as const;

export type RegionKey = "mundo" | "brasil" | "nordeste" | "piaui";
export type AudienceKey = "criancas" | "adolescentes" | "adultos";

export const REGIONS: Record<
  RegionKey,
  { label: string; short: string; role: string; description: string }
> = {
  mundo: {
    label: "Mundo",
    short: "Nações",
    role: "Alcance",
    description:
      "O alcance global: obreiros enviados e sustentados em nações onde o evangelho ainda precisa chegar.",
  },
  brasil: {
    label: "Brasil",
    short: "Nacional",
    role: "Nação",
    description:
      "A nação que amamos: plantação de igrejas e projetos em regiões com pouca presença evangélica.",
  },
  nordeste: {
    label: "Nordeste",
    short: "Sertão",
    role: "Região",
    description:
      "Nossa região: evangelização e cuidado integral com famílias do sertão, do agreste e do litoral.",
  },
  piaui: {
    label: "Piauí",
    short: "Local",
    role: "Base",
    description:
      "Nossa base: de Teresina ao interior, servindo comunidades ribeirinhas, rurais e urbanas.",
  },
};

export const JOURNEY_ORDER: RegionKey[] = [
  "piaui",
  "nordeste",
  "brasil",
  "mundo",
];

export const REVIVAL_FOCUS: Record<RegionKey, string> = {
  piaui:
    "Um avivamento que comece na base: famílias restauradas, comunidades ribeirinhas alcançadas e cidades do interior despertadas para Deus.",
  nordeste:
    "Uma onda de avivamento no sertão, no agreste e no litoral, com igrejas cheias do Espírito e comprometidas com a missão.",
  brasil:
    "Uma nação despertada para a santidade, a oração e o envio de obreiros para todos os lugares.",
  mundo:
    "Avivamento entre os povos, com portas abertas para o evangelho e missionários sustentados até os confins da terra.",
};

export const REVIVAL_PILLARS = [
  {
    title: "Oração e intercessão",
    text: "Avivamento começa de joelhos. Convocamos a igreja a clamar dia e noite por um derramar do Espírito.",
    verse: "2 Crônicas 7:14",
  },
  {
    title: "Palavra e santidade",
    text: "Não há avivamento sem retorno à Bíblia. Buscamos uma vida transformada pela verdade e consagrada a Deus.",
    verse: "Salmo 119:9",
  },
  {
    title: "Evangelismo e missões",
    text: "Um coração avivado transborda. O avivamento nos envia a proclamar Jesus em todas as partes do mundo.",
    verse: "Atos 1:8",
  },
  {
    title: "Unidade e renovação",
    text: "O Espírito une a igreja em torno da mesma missão: ver vidas restauradas e comunidades transformadas.",
    verse: "Efésios 4:3",
  },
];

export const REVIVAL_PRAYERS = [
  {
    day: "Dia 1",
    title: "Arrependimento",
    text: "Peça a Deus um coração quebrantado e disposto a abandonar tudo o que entristece o Espírito.",
  },
  {
    day: "Dia 2",
    title: "Santidade",
    text: "Ore por pureza de pensamentos, palavras e atitudes, em casa, no trabalho e na igreja.",
  },
  {
    day: "Dia 3",
    title: "Famílias",
    text: "Clame pela restauração dos lares, pela unidade dos casamentos e pela fé das crianças.",
  },
  {
    day: "Dia 4",
    title: "Igreja",
    text: "Peça avivamento à igreja: amor fraternal, fome da Palavra e paixão pela oração.",
  },
  {
    day: "Dia 5",
    title: "Cidades",
    text: "Interceda pelas cidades do Piauí, do Nordeste e do Brasil, para que o evangelho alcance cada lar.",
  },
  {
    day: "Dia 6",
    title: "Nações",
    text: "Ore pelos povos não alcançados e pelos missionários que servem em campos difíceis.",
  },
  {
    day: "Dia 7",
    title: "Envio",
    text: "Peça que o avivamento produza obreiros dispostos a ir e igrejas dispostas a enviar.",
  },
];

export const AUDIENCES: Record<
  AudienceKey,
  { label: string; description: string }
> = {
  criancas: {
    label: "Crianças",
    description:
      "Ministérios infantis, escolas bíblicas e cuidado com as crianças mais vulneráveis.",
  },
  adolescentes: {
    label: "Adolescentes",
    description:
      "Discipulado, mentoria, esporte e formação de líderes para uma geração com propósito.",
  },
  adultos: {
    label: "Adultos",
    description:
      "Evangelização, plantação de igrejas, capacitação e envio de missionários.",
  },
};

export const TESTIMONY_CATEGORIES: Record<string, string> = {
  cura: "Cura",
  libertacao: "Libertação",
  milagre: "Milagre",
  provisao: "Provisão",
  restauracao: "Restauração",
};

export function regionLabel(region: string) {
  return REGIONS[region as RegionKey]?.label ?? region;
}

export function regionRole(region: string) {
  return REGIONS[region as RegionKey]?.role ?? "";
}

export function audienceLabel(audience: string) {
  return AUDIENCES[audience as AudienceKey]?.label ?? audience;
}

export function categoryLabel(category: string) {
  return TESTIMONY_CATEGORIES[category] ?? category;
}

export function formatDate(date: Date | string) {
  const value = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(value);
}

export function paragraphs(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
