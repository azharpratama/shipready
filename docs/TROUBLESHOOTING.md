# Troubleshooting & Diagnostics Guide

Common runtime errors and resolution strategies for this stack.

---

## 1. Database Connection Errors

- **Root Cause:** `DATABASE_URL` is invalid, missing, or SSL mode options are misconfigured.
- **Fix:**
  1. Check `.env.local` contains valid InsForge `DATABASE_URL`.
  2. Run connection diagnostic:
     ```bash
     npx @insforge/cli db connection-string
     ```

---

## 2. Schema Mismatch / Missing Auth Tables

- **Root Cause:** BetterAuth schema is out of sync with Postgres `better_auth` schema.
- **Fix:**
  ```bash
  npm run setup
  ```

---

## 3. Environment Variable `undefined` on Deploy

- **Root Cause:** Missing secret in InsForge backend environment secrets.
- **Fix:**
  ```bash
  npx @insforge/cli secrets set DATABASE_URL=<url>
  ```
