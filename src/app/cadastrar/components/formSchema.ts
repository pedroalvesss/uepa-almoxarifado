import { z } from "zod";

export const cadastroSchema = z.object({
  name: z
    .string({ message: "O nome é obrigatório" })
    .min(5, "O nome não pode ser tão curto"),
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
