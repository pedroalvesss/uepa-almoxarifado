// src/types/better-auth-client.d.ts
import type { Session, User } from "better-auth/client";
import "better-auth/client";

declare module "better-auth/client" {
  // 1) Payload verdadeiro vindo da API
  export interface SessionResponse {
    session: Session;
    user: User;
  }

  // 2) Tipagem correta do hook useSession
  export interface UseSessionResult {
    data?: {
      data: SessionResponse;
      error: null;
    };
    error: null;
    isPending: boolean;
    isRefetching: boolean;
    // Adicione outros métodos se precisar (refetch, mutate, etc)
  }

  // 3) Estendendo o client para usar a nova tipagem
  export interface AuthClient {
    useSession(): UseSessionResult;
  }
}
