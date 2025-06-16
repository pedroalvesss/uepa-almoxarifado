import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CheckCircleIcon, Undo2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { cadastroProdutoSchema } from "./formSchema";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface EditarProdutoFormProps {
  form: UseFormReturn<z.infer<typeof cadastroProdutoSchema>>;
  loading: boolean;
  handleSubmit: (data: z.infer<typeof cadastroProdutoSchema>) => Promise<void>;
  router: AppRouterInstance;
}

export default function EditarProdutoForm({
  form,
  loading,
  handleSubmit,
  router,
}: EditarProdutoFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Informe o nome do produto"
                  className="w-full bg-[#EFEFEF]  text-[#373435]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input
                  placeholder="Informe a descrição do produto"
                  className="w-full bg-[#EFEFEF]  text-[#373435]"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="qntd_estoq"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade em Estoque</FormLabel>
              <FormControl>
                <Input
                  placeholder="Informe a quantidade de produtos em estoque"
                  className="w-full bg-[#EFEFEF]  text-[#373435] "
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="flex w-auto gap-10 mt-[1.5rem]">
          <Button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-[0.9rem] text-white p-2 cursor-pointer"
          >
            Confirmar <CheckCircleIcon />
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/dashboard/tabela")}
            className="cursor-pointer bg-gray-200 text-green-800 p-3 w-[6rem] hover:bg-gray-300"
          >
            Voltar <Undo2 />
          </Button>
        </div>
      </form>
    </Form>
  );
}
