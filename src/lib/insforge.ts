"use client";

import { type InsForgeClient, createClient } from "@insforge/sdk";
import { useEffect, useMemo, useState } from "react";
import { authClient } from "./auth-client";

const REFRESH_INTERVAL_MS = 50 * 60 * 1000;

function setBridgeToken(client: InsForgeClient, token: string | null) {
  if (typeof (client as unknown as { setAccessToken?: unknown }).setAccessToken === "function") {
    (client as unknown as { setAccessToken: (t: string | null) => void }).setAccessToken(token);
    return;
  }
  client.getHttpClient().setAuthToken(token);
  (
    client.realtime as unknown as {
      tokenManager: { setAccessToken: (t: string | null) => void };
    }
  ).tokenManager.setAccessToken(token);
}

export function useInsforgeClient(): { client: InsForgeClient; isReady: boolean } {
  const session = authClient.useSession();
  const [isReady, setIsReady] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || "";
  const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "";

  const client = useMemo(
    () =>
      createClient({
        baseUrl,
        anonKey,
      }),
    [baseUrl, anonKey],
  );

  const userId = session.data?.user?.id;

  useEffect(() => {
    if (!userId) {
      setBridgeToken(client, null);
      setIsReady(false);
      return;
    }

    let cancelled = false;
    const refresh = async () => {
      try {
        const res = await fetch("/api/insforge-token", { credentials: "same-origin" });
        if (!res.ok) throw new Error(`bridge ${res.status}`);
        const { token } = (await res.json()) as { token?: string };
        if (cancelled) return;
        if (typeof token !== "string" || !token) throw new Error("bridge: no token in response");
        setBridgeToken(client, token);
        setIsReady(true);
      } catch {
        if (cancelled) return;
        setBridgeToken(client, null);
        setIsReady(false);
      }
    };

    void refresh();
    const id = setInterval(() => void refresh(), REFRESH_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [client, userId]);

  return { client, isReady };
}
