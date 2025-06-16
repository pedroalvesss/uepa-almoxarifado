import { z } from "zod";

export const cadastroProdutoSchema = z.object({
  nome: z.string({ message: "O nome é obrigatório" }),
  descricao: z.string({ message: "A descrição é obrigatória" }),
  qntde_estoq: z.coerce.number({ message: "A quantidade é obrigatória" }),
});
