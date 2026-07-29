# Ultimate Agent-First Starter Kit

> **A GUI-less, agent-native, serverless Edge starter template built for modern AI coding workflows.**

Designed to be operated seamlessly by developers using AI coding agents (Antigravity IDE, Claude Code, Cursor, Windsurf, Codex, etc.) or manually via CLI tools.

---

## 🏗 Tech Stack

- **Framework:** Next.js (App Router, Edge Runtime)
- **Deployment & Edge:** Cloudflare Pages / Workers (`workerd`)
- **Database:** Neon Serverless Postgres
- **ORM & Schema:** Drizzle ORM (`drizzle-orm/neon-http`)
- **Authentication:** BetterAuth (Drizzle Adapter)
- **Storage:** Cloudflare R2 (S3-compatible abstraction)
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Code Quality:** Biome (Linter & Formatter) + TypeScript (`strict: true`)
- **Testing:** Vitest (Unit/Integration) + Playwright (E2E)

---

## ⚡ Prerequisites

- **Node.js** >= 18.x
- **npm** or **pnpm**
- **Neon account** (for Postgres `DATABASE_URL`)
- **Cloudflare account** (for Pages/Workers deployment & R2 storage)

---

## 🚀 Quickstart

### 1. Setup Repository & Environment

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

Edit `.env.local` with your database URL and secrets.

<details>
<summary><b>🛠 How to get your API Keys</b></summary>

<br>

**1. Neon Postgres (`DATABASE_URL`)**:
- Create a project at [Neon.tech](https://neon.tech).
- On your project dashboard, copy the **Connection String** for your default branch.
- Paste it as `DATABASE_URL` in `.env.local` (make sure it ends with `?sslmode=require`).

**2. Cloudflare R2 Storage (`S3_*`)**:
- Go to the [Cloudflare Dashboard](https://dash.cloudflare.com) -> **R2** -> **Create bucket**. Note the bucket name for `S3_BUCKET_NAME`.
- Go to **Manage R2 API Tokens** -> **Create API token**.
- Give the token **Object Read & Write** permissions.
- Copy the **Access Key ID**, **Secret Access Key**, and **Jurisdiction-specific endpoint** into your `.env.local`.

**3. BetterAuth Secret**:
- Run `npx @better-auth/cli secret` in your terminal to automatically generate and append a secure key to your `.env.local` file.
</details>

### 2. Database Sync

```bash
# Push schema to Neon
npm run db:push
```

### 3. Run Development Server

```bash
# Local Next.js dev server
npm run dev
```

```bash
# Run local Cloudflare Edge runtime simulation (OpenNext)
npm run dev:edge
```

> **Note:** The `dev:edge` script uses `@opennextjs/cloudflare` to compile your Next.js app and run it inside Cloudflare's `workerd` runtime via Wrangler. This ensures 100% parity with your production environment before deploying.

---

## 🤖 Bootstrapping with AI Agents

When opening this project in an AI coding agent (Cursor, Antigravity, Claude Code, etc.), paste this prompt:

> "I am building a new application using this starter kit. Please read `docs/PROJECT_KNOWLEDGE.md` and `AGENTS.md`. Help me refine the schema in `src/db/schema.ts` and set up our core features."

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts Next.js dev server |
| `npm run build` | Builds application |
| `npm run lint` | Runs Biome code format & lint checks |
| `npm run lint:fix` | Automatically fixes formatting & lint issues |
| `npm run typecheck` | Runs TypeScript type checking |
| `npm run db:push` | Pushes Drizzle schema changes directly to Neon |
| `npm run db:generate` | Generates SQL migration files |
| `npm run db:migrate` | Applies SQL migrations to production |
| `npm run db:studio` | Launches Drizzle visual database browser |
| `npm run test` | Runs Vitest unit & integration tests |
| `npm run test:e2e` | Runs Playwright end-to-end tests |
| `npm run dev:edge` | Simulates Cloudflare Edge runtime locally |
| `npm run build:edge` | Builds OpenNext Cloudflare worker |
| `npm run preview:edge`| Previews built Cloudflare worker locally |

---

## 🔧 Agent Skills Setup

Install or update the agent skills used by this project. These commands work across IDEs (Antigravity, Cursor, Windsurf, Claude Code).

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
