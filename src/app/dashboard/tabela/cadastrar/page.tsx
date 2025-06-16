"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useEffect, useState } from "react";
import { cadastroProdutoSchema } from "./components/formSchema";
import { createProduto } from "@/services/produtos-service";
import CadastrarProdutoForm from "./components/CadastrarProdutoForm";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { RoutePaths } from "@/utils/RoutePaths";

export default function Page() {
  const form = useForm<z.infer<typeof cadastroProdutoSchema>>({
    resolver: zodResolver(cadastroProdutoSchema),
    mode: "onChange",
    defaultValues: {
      nome: "",
      descricao: "",
      qntde_estoq: 0,
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const session = authClient.useSession();

  useEffect(() => {
    if (session?.data?.data?.user?.name == null) {
      router.replace(RoutePaths.LOGIN);
    }
  }, [session, router]);

  async function onSubmit(data: z.infer<typeof cadastroProdutoSchema>) {
    setLoading(true);
    try {
      const response = await createProduto({
        nome: data.nome,
        descricao: data.descricao,
        qntd_estoq: data.qntde_estoq,
      });
      if (response) {
        toast.success("Produto cadastrado com sucesso!");
        setTimeout(() => {
          redirect("/dashboard/tabela");
        }, 3000);
      }
    } catch (error) {
      toast.error("Erro ao cadastrar produto" + error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col p-10 gap-4">
      <h2 className="text-[2rem] font-bold">Cadastrar Produto</h2>

      <CadastrarProdutoForm
        router={router}
        loading={loading}
        form={form}
        handleSubmit={onSubmit}
      />
    </div>
  );
}
