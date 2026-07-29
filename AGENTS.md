# Agent Directives: Ultimate Stack (Next.js + InsForge + Drizzle + BetterAuth)

**Architecture:** Next.js App Router -> InsForge BaaS (Postgres) -> Drizzle ORM -> BetterAuth

---

## 1. Core Philosophy
- **Agent-First & GUI-less:** Manage infrastructure programmatically (`insforge`, `@better-auth/cli`, `drizzle-kit`).
- **Single Source of Truth:** `src/db/schema.ts` is the single code-first source of truth for application database tables. Maintain `docs/PROJECT_KNOWLEDGE.md` for project context and architectural shifts.
- **Mandatory Skills:** `ponytail` (minimalist YAGNI code) and `caveman` (terse, token-efficient output) are MANDATORY for all agent responses. Leverage domain skills in `.agents/skills/` (`insforge`, `insforge-cli`, `insforge-debug`, `insforge-integrations`).
- **Simplicity (YAGNI):** Favor native primitives, reuse existing code, actively delete dead code. Avoid unnecessary abstractions.

---

## 2. Database, Schema & Auth Strategy
- **Schema Management (Push-Based):** Define tables in `src/db/schema.ts`. Sync changes to InsForge Postgres using `npm run db:push` (`drizzle-kit push`). Do NOT create duplicate migration runners.
- **Server Queries (Drizzle):** Use `db` from `src/db/index.ts` (`drizzle-orm/node-postgres`). Because direct TCP queries run with DB admin privileges, **ALWAYS** scope user queries explicitly with `.where(eq(table.userId, session.user.id))`.
- **Client & RLS Operations (InsForge SDK):** Use `@insforge/sdk` (`useInsforgeClient()`) for client-side queries, storage uploads, realtime pub/sub, and AI gateway calls. The BetterAuth JWT bridge automatically attaches `sub` claim for Postgres Row Level Security (`auth.uid()`).
- **Auth Storage:** BetterAuth manages user sessions in `better_auth` schema (isolated from `public` PostgREST data API).

---

## 3. Development Standards
- **Setup Command:** Run `npm run setup` to bootstrap database schema, apply BetterAuth tables, and push Drizzle schema.
- **Commits:** ALWAYS use Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`). Never write generic messages.
- **State & Styling:** Use Zustand for client state. Use standard Tailwind CSS utility classes.
- **Scratch & Planning:** Use `docs/agent-scratchpad.md` to plan complex migrations or outline architecture before generating code.

<!-- INSFORGE:START -->
## InsForge backend

This project uses [InsForge](https://insforge.dev): an all-in-one, open-source Postgres-based backend (BaaS) that gives this app a database, authentication, file storage, edge functions, realtime, an AI model gateway, and payments through one platform.

- **Project:** **starter-kit** (API base `https://n2u7iwp6.us-east.insforge.app`)
- **Skills:** these InsForge skills are installed for supported coding agents. Reach for them before implementing any InsForge feature instead of guessing the API:
  - `insforge`: app code with the `@insforge/sdk` client (database CRUD, auth, storage, edge functions, realtime, AI, email, and Stripe payments).
  - `insforge-cli`: backend and infrastructure via the `insforge` CLI (projects, SQL, migrations, RLS policies, storage buckets, functions, secrets, payment setup, schedules, deploys).
  - `insforge-debug`: diagnosing failures (SDK/HTTP errors, RLS denials, auth and OAuth issues) and running security or performance audits.
  - `insforge-integrations`: wiring external auth providers (Clerk, Auth0, WorkOS, Better Auth, etc.) for JWT-based RLS, or the OKX x402 payment facilitator.
  - `find-skills`: discovering additional skills on demand.
- **Credentials:** app code reads keys from `.env.local`; the CLI reads `.insforge/project.json`. Never hardcode or commit keys.

Key patterns:

- Database inserts take an array: `insert([{ ... }])`.
- Reference users with `auth.users(id)`; use `auth.uid()` in RLS policies.
- For storage uploads, persist both the returned `url` and `key`.
<!-- INSFORGE:END -->
