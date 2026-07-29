import { createClient } from "@insforge/sdk";
import jwt from "jsonwebtoken";

export function serverMailer() {
  const secret = process.env.INSFORGE_JWT_SECRET || "";
  const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || "";
  const token = jwt.sign(
    { sub: "better-auth-service", role: "authenticated", aud: "insforge-api" },
    secret,
    { algorithm: "HS256", expiresIn: "5m" },
  );
  const c = createClient({ baseUrl });
  c.getHttpClient().setAuthToken(token);
  return c;
}
