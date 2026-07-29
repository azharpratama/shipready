import { Database, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-4 py-1.5 text-xs text-neutral-300 backdrop-blur">
          <Zap className="h-3.5 w-3.5 text-amber-400" />
          <span>Agent-First & GUI-Less Edge Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
          Ultimate Starter Kit
        </h1>

        <p className="text-lg text-neutral-400 leading-relaxed max-w-xl mx-auto">
          Next.js App Router scaffolded with Cloudflare Pages Edge Runtime, Neon Serverless
          Postgres, Drizzle ORM, and BetterAuth.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-2">
            <Zap className="h-5 w-5 text-sky-400" />
            <h3 className="font-semibold text-white text-sm">Edge Native</h3>
            <p className="text-xs text-neutral-400">
              Deployed to Cloudflare Pages workerd runtime with near-zero cold starts.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-2">
            <Database className="h-5 w-5 text-emerald-400" />
            <h3 className="font-semibold text-white text-sm">Neon & Drizzle</h3>
            <p className="text-xs text-neutral-400">
              Stateless HTTP queries with instant database branching.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-2">
            <Shield className="h-5 w-5 text-purple-400" />
            <h3 className="font-semibold text-white text-sm">BetterAuth</h3>
            <p className="text-xs text-neutral-400">
              Type-safe authentication with unified Drizzle ORM schema management.
            </p>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-center gap-4 text-xs text-neutral-500">
          <span>
            Edit <code className="text-neutral-300">src/app/page.tsx</code> to get started
          </span>
        </div>
      </div>
    </main>
  );
}
