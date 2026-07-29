# Ultimate Agent-First Starter Kit

> **A GUI-less, agent-native starter template built for modern AI coding workflows.**

Designed to be operated seamlessly by developers using AI coding agents (Antigravity IDE, Claude Code, Cursor, Windsurf, Codex, etc.) or manually via CLI tools.

---

## 🏗 Tech Stack

- **Framework:** Next.js (App Router)
- **Backend-as-a-Service:** InsForge (Postgres, Storage, Realtime, Edge Functions, AI Gateway)
- **ORM & Schema Management:** Drizzle ORM (`drizzle-orm/node-postgres` + `drizzle-kit push`)
- **Authentication:** BetterAuth (`better_auth` Postgres schema + JWT bridge to InsForge RLS)
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Code Quality:** Biome (Linter & Formatter) + TypeScript (`strict: true`)
- **Testing:** Vitest (Unit/Integration) + Playwright (E2E)

---

## ⚡ Prerequisites

- **Node.js** >= 18.x
- **npm** or **pnpm**
- **InsForge CLI** (`npx @insforge/cli`)

---

## 🚀 Quickstart

### 1. Setup Repository & Environment

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

### 2. Database & Auth Setup

Runs InsForge bootstrap, BetterAuth migrations, and pushes `src/db/schema.ts` to Postgres in one step:

```bash
npm run setup
```

### 3. Run Development Server

```bash
npm run dev
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run setup` | Bootstraps DB schema, applies BetterAuth & pushes Drizzle schema |
| `npm run dev` | Starts Next.js dev server |
| `npm run build` | Builds application |
| `npm run start` | Starts Next.js production server |
| `npm run lint` | Runs Biome code format & lint checks |
| `npm run lint:fix` | Automatically fixes formatting & lint issues |
| `npm run typecheck` | Runs TypeScript type checking |
| `npm run test` | Runs Vitest unit & integration tests |
| `npm run test:e2e` | Runs Playwright end-to-end tests |
| `npm run db:push` | Pushes `src/db/schema.ts` changes directly to InsForge Postgres |
| `npm run db:studio` | Launches Drizzle visual database browser |
| `npm run auth:generate` | Generates BetterAuth client code |
| `npm run auth:secret` | Generates BetterAuth secret |
| `npm run auth:migrate` | Applies BetterAuth schema migrations |
| `npm run prepare` | Installs Husky git hooks |

---

## 🔧 Agent Directives & Mandatory Skills

Agent interactions strictly enforce **Ponytail** (minimalist YAGNI code) and **Caveman** (terse output):

```bash
# Ponytail (Lazy Senior Dev Mindset - MANDATORY)
npx -y skills add DietrichGebert/ponytail --skill ponytail --agent '*' --yes

# Caveman (Token Saver - MANDATORY)
npx -y skills add JuliusBrussee/caveman --skill caveman --agent '*' --yes

# InsForge Agent Skills
npx -y skills add https://github.com/insforge/agent-skills --skill insforge --agent '*' --yes
npx -y skills add https://github.com/insforge/agent-skills --skill insforge-cli --agent '*' --yes
npx -y skills add https://github.com/insforge/agent-skills --skill insforge-debug --agent '*' --yes
npx -y skills add https://github.com/insforge/agent-skills --skill insforge-integrations --agent '*' --yes
```
