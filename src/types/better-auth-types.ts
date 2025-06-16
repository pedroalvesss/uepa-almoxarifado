import { Session } from "better-auth";

export interface SessionResponse {
  session: Session;
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    image: string | null | undefined;
    createdAt: Date;
    updatedAt: Date;
    role: string;
  };
}

export interface UseSessionResult {
  data?: {
    data: SessionResponse;
    error: null;
  };
  error: null;
  isPending: boolean;
  isRefetching: boolean;
}

export interface CustomAuthClient {
  useSession(): UseSessionResult;
  signUp: {
    email: (
      data: {
        name: string;
        email: string;
        password: string;
        callbackURL?: string;
      },
      options?: {
        onRequest?: () => void;
        onSuccess?: () => void;
        onError?: (error: string) => void;
      }
    ) => Promise<void>;
  };
  signIn: {
    email: (
      data: { email: string; password: string },
      options?: {
        onRequest?: () => void;
        onSuccess?: () => void;
        onError?: (error: string) => void;
      }
    ) => Promise<void>;
  };
  signOut: () => Promise<{ signedOut: boolean }>;

  // adicione outros métodos do client se usar mais (ex: signOut, signIn etc)
}
