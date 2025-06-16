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
import { CheckCircleIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { RoutePaths } from "@/utils/RoutePaths";
import { cadastroSchema } from "./formSchema";

interface CadastroUserFormProps {
  form: UseFormReturn<z.infer<typeof cadastroSchema>>;
  loading: boolean;
  handleSubmit: (data: z.infer<typeof cadastroSchema>) => Promise<void>;
}

export default function CadastroUserForm({
  form,
  loading,
  handleSubmit,
}: CadastroUserFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-1 w-105 flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Informe seu nome completo"
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
                  placeholder="Informe seu email @uepa.br"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Informe sua senha"
                  className="w-full bg-[#EFEFEF]  text-[#373435] "
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div>
          <span className="font-light text-[0.9rem]">
            Ja possui cadastro?{" "}
            <Link
              className="text-blue-500 hover:text-blue-700"
              href={RoutePaths.CADASTRAR}
            >
              Realizar Login
            </Link>
          </span>
        </div>
        <div className="flex w-full justify-end items-end mt-2">
          <Button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-[0.9rem] text-white p-2 cursor-pointer"
          >
            Confirmar <CheckCircleIcon />
          </Button>
        </div>
      </form>
    </Form>
  );
}
