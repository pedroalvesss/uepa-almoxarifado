import { z } from "zod";

export const editUserSchema = z.object({
  name: z
    .string({ message: "O nome é obrigatório" })
    .min(3, { message: "O nome deve ser superior a 3 caracteres" }),
  email: z
    .string({ message: "O email é obrigatório" })
    .min(10, { message: "O email deve ser superior a 10 caracteres" })
    .email("Informe um e-mail válido")
    .refine((email) => email.endsWith("@uepa.br"), {
      message: "O e-mail deve ser institucional (@uepa.br)",
    }),
});
