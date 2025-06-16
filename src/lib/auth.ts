import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: false,
  },
  basePath: "/api/auth",
  trustedOrigins: [
    "http://localhost:3000",
    "https://api-estoque-7wp0.onrender.com",
  ],
});
