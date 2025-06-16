export async function verifySessionToken(token: string): Promise<boolean> {
  const res = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/session`, {
    method: "GET",
    headers: {
      Cookie: `better-auth.session_token=${token}`,
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Sessão inválida");

  return true;
}
