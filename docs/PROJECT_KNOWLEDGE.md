# Project Knowledge (Single Source of Truth)

> **Agent Directive:** This file is the absolute source of truth for the project. Read this file before starting any complex task. Update this file when making architectural shifts, adding major dependencies, or changing database schemas.

## 🎯 Core Objective
[TODO: Describe project objective, target users, and key problem statement]

## 🏗 Architecture & Stack
- **Frontend:** Next.js App Router (React, Tailwind CSS, Zustand)
- **Backend:** InsForge BaaS (Postgres, Storage, Realtime, Functions, AI Gateway)
- **Database:** InsForge Managed Postgres + Drizzle ORM (`drizzle-orm/node-postgres`)
- **Auth:** BetterAuth (`better_auth` schema) + JWT Bridge to InsForge RLS
- **Storage:** InsForge Storage (`@insforge/sdk`)

## 📂 Directory Structure Rules
- `src/app/`: Next.js App Router pages and API routes.
- `src/components/`: Reusable, stateless UI components.
- `src/db/schema.ts`: Application database schema definitions.
- `src/db/index.ts`: Drizzle ORM `pg` Pool client export (`db`).
- `src/lib/`: InsForge client/server SDK helpers and auth configuration (`insforge.ts`, `insforge.server.ts`, `auth.ts`).

## 💾 Database Schema (High-Level)
- **User / Session / Account / Verification:** Standard BetterAuth core schema in `better_auth` schema.
- [TODO: Document additional custom domain models/entities here]

## 🚧 Current Status & Active Decisions
- **Stack Migration:** Replaced Cloudflare & Neon with InsForge backend stack.
- **Active Task:** Bootstrapping project architecture.
