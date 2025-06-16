import { CustomAuthClient } from "@/types/better-auth-types";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://api-estoque-7wp0.onrender.com",
  fetch: (url: RequestInfo, options: RequestInit = {}) =>
    fetch(url, {
      ...options,
      credentials: "include",
    }),
}) as unknown as CustomAuthClient;
