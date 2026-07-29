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


---

## 4. Extended Edge Primitives
- **R2 Storage:** Use `src/lib/storage.ts` S3-compatible SDK abstraction for all file uploads. Do NOT call `env.R2_BUCKET` bindings directly in routes.
- **Optional Primitives:** KV (caching/rate limits), Queues (async jobs), Workers AI (native LLM), PostHog, Resend.

---

## 5. Testing Strategy
- **Database:** Do not hit live Neon in unit tests. Use a local Docker `postgres` instance with `drizzle-kit push`.
- **E2E:** To test Edge-specific behavior, configure Playwright to run `npx wrangler pages dev`.

---

## 6. Development Standards
- **Commits:** ALWAYS use Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`). Never write generic messages.

- **State & Styling:** Use Zustand for client state (avoid Context API re-render hell). Use standard Tailwind CSS utility classes. Do NOT introduce bloated UI component libraries unless explicitly requested.
- **Scratch & Planning:** Use `docs/agent-scratchpad.md` to plan complex migrations or outline architecture before generating code.
- **Diagnostics:** See `docs/TROUBLESHOOTING.md` for common edge runtime error fixes.
