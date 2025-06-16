import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z
    .string({ message: "O e-mail é obrigatório" })
    .email("Informe um e-mail válido")
    .refine((email) => email.endsWith("@uepa.br"), {
      message: "O e-mail deve ser institucional (@uepa.br)",
    }),
  password: z
    .string({ message: "A senha é obrigatória" })
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});
