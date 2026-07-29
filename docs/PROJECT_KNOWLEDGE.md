# Project Knowledge (Single Source of Truth)

> **Agent Directive:** This file is the absolute source of truth for the project. Read this file before starting any complex task. Update this file when making architectural shifts, adding major dependencies, or changing database schemas.

## 🎯 Core Objective
[TODO: Describe project objective, target users, and key problem statement]

## 🏗 Architecture & Stack
- **Frontend:** Next.js App Router (React, Tailwind CSS, Zustand)
- **Backend/Edge:** Cloudflare Pages/Workers (`workerd` runtime)
- **Database:** Neon (Serverless Postgres) + Drizzle ORM
- **Auth:** BetterAuth (Drizzle Adapter)
- **Storage:** Cloudflare R2 (S3-compatible via `src/lib/storage.ts`)

## 📂 Directory Structure Rules
- `src/app/`: Next.js App Router pages and API routes.
- `src/components/`: Reusable, stateless UI components.
- `src/db/schema.ts`: SINGLE source of truth for database schema & auth tables.
- `src/db/index.ts`: Stateless `neon-http` database client export (`db`).
- `src/lib/`: Utility functions and storage adapters (`storage.ts`, `auth.ts`).

## 💾 Database Schema (High-Level)
- **User / Session / Account / Verification:** Standard BetterAuth core schema.
- [TODO: Document additional custom domain models/entities here]

## 🚧 Current Status & Active Decisions
- [TODO: Add architectural decisions with rationale]
- **Active Task:** Bootstrapping project architecture.
