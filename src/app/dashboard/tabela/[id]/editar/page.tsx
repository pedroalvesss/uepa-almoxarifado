"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useEffect, useState } from "react";
import { cadastroProdutoSchema } from "./components/formSchema";
import { updateProduto } from "@/services/produtos-service";
import EditarProdutoForm from "./components/EditarProdutoForm";
import { ProdutoRequestParams } from "@/types";
import { toast } from "sonner";
import { RoutePaths } from "@/utils/RoutePaths";
import { authClient } from "@/lib/auth-client";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const form = useForm<z.infer<typeof cadastroProdutoSchema>>({
    resolver: zodResolver(cadastroProdutoSchema),
    mode: "onChange",
    defaultValues: {
      nome: "",
      descricao: "",
      qntd_estoq: 0,
    },
  });
  const session = authClient.useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  async function onSubmit(data: ProdutoRequestParams) {
    setLoading(true);
    try {
      const response = await updateProduto(Number(id), data);
      if (response) {
        toast.success("Produto editado com sucesso!");
        router.replace("/dashboard/tabela");
      }
    } catch (error) {
      toast.error("Erro ao editar produto: " + error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session?.data?.data?.user?.name == null) {
      router.replace(RoutePaths.LOGIN);
    }
  }, [session, router]);

  return (
    <div className="flex flex-col p-10 gap-4">
      <h2 className="text-[2rem] font-bold">{`Editando Produto - ID ${id}`}</h2>
      <EditarProdutoForm
        router={router}
        loading={loading}
        form={form}
        handleSubmit={onSubmit}
      />
    </div>
  );
}
