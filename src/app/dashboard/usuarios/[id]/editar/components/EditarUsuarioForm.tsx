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
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { editUserSchema } from "./formSchema";

interface EditarUsuarioFormProps {
  form: UseFormReturn<z.infer<typeof editUserSchema>>;
  loading: boolean;
  handleSubmit: (data: z.infer<typeof editUserSchema>) => Promise<void>;
  router: AppRouterInstance;
}

export default function EditarUsuarioForm({
  form,
  loading,
  handleSubmit,
  router,
}: EditarUsuarioFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Informe o novo nome do usuário"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="Informe o novo email do usuário"
                  className="w-full bg-[#EFEFEF]  text-[#373435]"
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
            onClick={() => router.push("/dashboard/usuarios")}
            className="cursor-pointer bg-gray-200 text-green-800 p-3 w-[6rem] hover:bg-gray-300"
          >
            Voltar <Undo2 />
          </Button>
        </div>
      </form>
    </Form>
  );
}
