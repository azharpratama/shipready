import { createClient } from "@insforge/sdk";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { auth } from "./auth";

export async function createInsForgeClient() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return null;

  const secret = process.env.INSFORGE_JWT_SECRET || "";
  const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || "";

  const insforgeToken = jwt.sign(
    {
      sub: session.user.id,
      role: "authenticated",
      aud: "insforge-api",
    },
    secret,
    { algorithm: "HS256", expiresIn: "1h" },
  );

  return createClient({
    baseUrl,
    edgeFunctionToken: insforgeToken,
  });
}
