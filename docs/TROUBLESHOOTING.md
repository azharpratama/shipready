# Troubleshooting & Diagnostics Guide

Common edge runtime errors and resolution strategies for this stack.

---

## 1. Runtime Error: `TCP`, `Socket`, or `Module not found (fs/crypto/net)`

- **Root Cause:** Standard Node.js TCP driver or native filesystem module imported into an Edge route (`workerd` runtime).
- **Fix:**
  1. Audit import tree of failing route/file.
  2. Ensure database imports use `@neondatabase/serverless` with `drizzle-orm/neon-http`.
  3. Remove Node-native package imports in edge routes.

---

## 2. Database Connection Stalls / Timeout in Worker Isolates

- **Root Cause:** Re-using global socket instances across isolate cold-starts without HTTP fallback.
- **Fix:** Switch from WebSocket `Pool` to stateless `neon()` HTTP driver (`drizzle-orm/neon-http`) for REST/API endpoints.

---

## 3. Schema Mismatch / Missing Auth Tables

- **Root Cause:** BetterAuth schema is out of sync with Drizzle definitions.
- **Fix:**
  ```bash
  npx @better-auth/cli generate
  npx drizzle-kit push
  ```

---

## 4. Environment Variable `undefined` on Deploy

- **Root Cause:** Missing secret in Cloudflare Pages/Workers environment bindings.
- **Fix:**
  ```bash
  npx wrangler secret put DATABASE_URL
  ```
  Or configure environment variables in the Cloudflare dashboard.
