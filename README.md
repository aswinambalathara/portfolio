# Portfolio

Personal developer portfolio for Aswin Nair T M, built with Next.js and Payload CMS. Site content is managed in Payload, so it can be updated without a redeploy.

**Live site:** https://portfolio.aswin-ambalathara.space

> Work in progress. The project is set up, and the site pages are still being built.

## Tech stack

- Next.js (App Router), React and TypeScript
- Payload CMS 3
- MongoDB (Atlas in production)
- Tailwind CSS v4 and shadcn/ui

## Getting started

You'll need Node.js 22.23.4 (see `.node-version`), pnpm and a local MongoDB.

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy `.env.example` to `.env`, then set at least these values:

   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   PAYLOAD_SECRET=any-long-random-string
   DATABASE_URI=mongodb://localhost:27017/portfolio
   ```

3. Start the dev server:

   ```bash
   pnpm dev
   ```

The site runs at http://localhost:3000, and the admin panel at http://localhost:3000/admin.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Create a production build |
| `pnpm start` | Run the production build |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Check TypeScript types |
| `pnpm generate:types` | Regenerate Payload types |
