# Portfolio

Developer portfolio for Aswin Nair T M (Aswin Ambalathara): home, skills, projects and contact.

**Live site:** https://aswin-ambalathara.space

## Tech stack

- Next.js (static export), React and TypeScript
- Tailwind CSS v4
- Docker (static files served by Nginx) and GitHub Actions for CI/CD

## Getting started

You'll need Node.js 22 (see `.node-version`) and pnpm.

```bash
pnpm install
pnpm dev
```

The site runs at http://localhost:3000. All content lives in `src/content/site.ts`.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Build the static site into `out/` |
| `pnpm preview` | Serve the built site locally |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Check TypeScript types |

## Deployment

Every push to `main` runs the checks, builds an arm64 Docker image, pushes it to GitHub Container
Registry and deploys it to the server over SSH. Server setup, GitHub settings and rollback are in
[deploy/README.md](deploy/README.md).
