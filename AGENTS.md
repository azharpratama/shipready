# Agent Directives: Ultimate Stack (Next.js Edge + Cloudflare + Neon + Drizzle + BetterAuth)

**Architecture:** Next.js App Router -> Cloudflare Pages/Workers (`workerd`) -> Neon (Postgres) -> Drizzle ORM -> BetterAuth -> Cloudflare R2/KV/AI

---

## 1. Core Philosophy
- **Agent-First & GUI-less:** No web dashboard clicking. Manage all infrastructure programmatically (`wrangler`, `drizzle-kit`, `neonctl`).
- **Single Source of Truth:** Read and maintain `docs/PROJECT_KNOWLEDGE.md` for project context, schema changes, and active decisions. Update it when making architectural shifts.
- **Skills:** Leverage skills in `.agents/skills/` (or `.claude/skills/`) for domain-specific tasks. Available skills: `cloudflare`, `wrangler`, `workers-best-practices`, `neon-postgres`, `neon-postgres-branches`, `ponytail`, `caveman`.
- **Environment Parity:** Local dev must mirror production using `wrangler pages dev` and local Postgres/Docker.
- **Simplicity (YAGNI):** Favor native primitives, reuse existing code, actively delete dead code. Avoid unnecessary abstractions.

---

## 2. Runtime Environment & Edge Constraints
- **CRITICAL:** Target environment is Cloudflare Edge (`workerd`). Standard Node.js runtime is NOT available.
- **NEVER** import Node.js native TCP/filesystem modules (`fs`, `path`, `net`, `tls`, `dns`) in Edge routes.
- **Route Configuration:** Include `export const runtime = "edge";` at the top of all Next.js API routes, server actions, or layouts accessing Edge/DB primitives (unless using `@opennextjs/cloudflare` Node compatibility mode).
- **Env Variables:** Access via `process.env`. Never hardcode secrets. Never assume `process.env` persistence across isolate re-initializations.

---

## 3. Database & Auth
- **Database Driver:** ALWAYS use `@neondatabase/serverless` with `drizzle-orm/neon-http` for stateless HTTP queries (see `src/db/index.ts`). Do NOT use standard `pg`/`postgres` TCP drivers — they will crash on the Edge.
- **Transactions:** For multi-query transactions requiring WebSockets, use `Pool` from `@neondatabase/serverless` with `drizzle-orm/neon-serverless`. Avoid WebSocket Pool for standard REST/API endpoints to prevent isolate exhaustion.
- **Schema:** All schema definitions live in `src/db/schema.ts` (single source of truth). BetterAuth core tables (`user`, `session`, `account`, `verification`) coexist with domain models.
- **BetterAuth:** Configured in `src/lib/auth.ts` using Drizzle adapter (`provider: "pg"`). Catch-all route at `src/app/api/auth/[...all]/route.ts`.

---

## 4. Extended Edge Primitives
- **R2 Storage:** Use `src/lib/storage.ts` S3-compatible SDK abstraction for all file uploads. **Do NOT** call `env.R2_BUCKET` bindings directly in routes (prevents vendor lock-in).
- **KV / Upstash Redis:** Use for caching expensive Neon queries or API rate limiting. Edge functions are stateless; KV provides global state.
- **Cloudflare Queues:** Use for offloading heavy tasks (image resizing, batch emails) to avoid Edge HTTP timeout limits.
- **Workers AI:** Use for native LLM inference (Llama, embeddings) directly on the edge without external API keys.
- **PostHog:** Use for analytics & feature flags. API-first, no GUI dependency.
- **Resend:** Use for transactional email via BetterAuth.

---

## 5. Testing Strategy
- **Unit/Integration:** Use **Vitest** with `@cloudflare/vitest-pool-workers` to mock Cloudflare bindings locally. Do NOT use Jest.
- **Database:** Do not hit live Neon in unit tests. Use a local Docker `postgres` instance with `drizzle-kit push`.
- **E2E:** Use **Playwright**. The project is pre-configured with `@playwright/test` (see `playwright.config.ts` and `npm run test:e2e`). By default, it tests against `npm run dev`. To test Edge-specific behavior, configure Playwright to run `npx wrangler pages dev`.

---

## 6. Development Standards
- **Commits:** ALWAYS use Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`). Never write generic messages.
- **Type Safety:** Maintain `strict: true` in `tsconfig.json`. Avoid `any`; infer or define types explicitly.
- **Lint & Format:** Use Biome (`npm run lint` / `npm run lint:fix`).
- **State & Styling:** Use Zustand for client state (avoid Context API re-render hell). Use standard Tailwind CSS utility classes. Do NOT introduce bloated UI component libraries unless explicitly requested.
- **Scratch & Planning:** Use `docs/agent-scratchpad.md` to plan complex migrations or outline architecture before generating code.
- **Diagnostics:** See `docs/TROUBLESHOOTING.md` for common edge runtime error fixes.

---

## 7. CLI Quick Reference

| Tool | Command | Purpose |
|---|---|---|
| Dev | `npm run dev` | Local Next.js dev server |
| Edge Dev | `npx wrangler pages dev` | Emulate Cloudflare Edge runtime |
| Drizzle | `npx drizzle-kit generate` | Generate SQL migrations from schema |
| Drizzle | `npx drizzle-kit push` | Push schema directly to Neon preview DB |
| Drizzle | `npx drizzle-kit migrate` | Apply migrations to production |
| BetterAuth | `npx @better-auth/cli generate` | Sync auth schema with active plugins |
| BetterAuth | `npx @better-auth/cli secret` | Generate secure auth secret |
| Neon | `npx neonctl branches create --name <branch> --parent main` | Ephemeral database branch |
| Neon | `npx neonctl connection-string <branch>` | Get branch connection string |
| Deploy | `npx wrangler pages deploy` | Deploy to Cloudflare Pages |

---

## Appendix: Skill Installation & Update

Run these commands to install or update agent skills. The `skills` CLI routes them to the correct directories for your IDE (Antigravity, Cursor, Windsurf, Claude Code, etc.).

```bash
# Cloudflare
npx -y skills add cloudflare/skills --skill cloudflare --agent '*' --yes
npx -y skills add cloudflare/skills --skill wrangler --agent '*' --yes
npx -y skills add cloudflare/skills --skill workers-best-practices --agent '*' --yes

# Neon
npx -y skills add neondatabase/agent-skills --skill neon-postgres --agent '*' --yes
npx -y skills add neondatabase/agent-skills --skill neon-postgres-branches --agent '*' --yes

# Ponytail (Lazy Senior Dev Mindset)
npx -y skills add DietrichGebert/ponytail --skill ponytail --agent '*' --yes

# Caveman (Token Saver)
npx -y skills add JuliusBrussee/caveman --skill caveman --agent '*' --yes
```
