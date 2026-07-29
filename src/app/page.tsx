import { Database, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-4 py-1.5 text-xs text-neutral-300 backdrop-blur">
          <Zap className="h-3.5 w-3.5 text-amber-400" />
          <span>InsForge + BetterAuth Stack</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
          Ultimate Starter Kit
        </h1>

        <p className="text-lg text-neutral-400 leading-relaxed max-w-xl mx-auto">
          Next.js App Router scaffolded with InsForge backend-as-a-service and BetterAuth
          authentication.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-left">
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-2">
            <Zap className="h-5 w-5 text-sky-400" />
            <h3 className="font-semibold text-white text-sm">InsForge BaaS</h3>
            <p className="text-xs text-neutral-400">
              Database, Storage, Edge Functions, Realtime, AI, and Payments in one unified backend.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-2">
            <Database className="h-5 w-5 text-emerald-400" />
            <h3 className="font-semibold text-white text-sm">Managed Postgres</h3>
            <p className="text-xs text-neutral-400">
              Full relational power with row-level security and auto migrations.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-2">
            <Shield className="h-5 w-5 text-purple-400" />
            <h3 className="font-semibold text-white text-sm">BetterAuth</h3>
            <p className="text-xs text-neutral-400">
              Complete authentication integration with JWT bridge into InsForge RLS.
            </p>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-center gap-4 text-sm">
          <Link
            href="/sign-in"
            className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-neutral-200 transition"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-800 transition"
          >
            Sign Up
          </Link>
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
