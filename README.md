# Almas Para Cristo

Site de missões e evangelismo da **Almas Para Cristo**, com base em Teresina, Piauí. O projeto reúne conteúdo bíblico, mensagens, testemunhos, ebooks, projetos missionários e biografias de pastores e missionários evangélicos.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma 6 + SQLite
- Lucide React
- PDF-Lib

## Como rodar

```bash
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
copy .env.example .env
```

Edite o `.env` e defina sua senha do painel administrativo. Depois, prepare o banco e os dados iniciais:

```bash
npm run setup
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse `http://localhost:3000`.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o cliente Prisma e cria a build de produção |
| `npm start` | Inicia a build de produção |
| `npm run db:push` | Sincroniza o schema com o banco SQLite |
| `npm run db:seed` | Popula o banco com os dados iniciais |
| `npm run setup` | Executa `db:push` e `db:seed` |

## Áreas do site

- `/` — página inicial
- `/missoes` — projetos missionários por região e público
- `/missionarios` — biografias de pastores e missionários evangélicos
- `/avivamento` — chamado à oração e ao avivamento
- `/biblia` — leitura bíblica
- `/mensagens` — mensagens e estudos
- `/ebooks` — materiais gratuitos em PDF
- `/testemunhos` — testemunhos aprovados
- `/contato` — contato e pedidos de oração
- `/admin` — painel administrativo

## Banco de dados

O banco local fica em `prisma/dev.db` e não é versionado. O schema está em `prisma/schema.prisma` e os dados iniciais em `prisma/seed.mjs`.

## Segurança

- O arquivo `.env` não é versionado.
- O banco local `prisma/dev.db` não é versionado.
- O painel administrativo usa a senha definida em `ADMIN_PASSWORD`.

## Desenvolvimento

Antes de publicar alterações, valide os tipos e a build:

```bash
npx tsc --noEmit
npx next build
```
