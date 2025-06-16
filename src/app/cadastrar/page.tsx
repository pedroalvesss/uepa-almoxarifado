"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { UsuarioCadastro } from "@/types/userAuth";
import { RoutePaths } from "@/utils/RoutePaths";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import CadastroUserForm from "./components/CadastroUserForm";
import { cadastroSchema } from "./components/formSchema";
import { toast } from "sonner";

export default function Page() {
  const session = authClient.useSession();
  if (session?.data?.data.user != null) {
    redirect(RoutePaths.DASHBOARD);
  }
  const form = useForm<z.infer<typeof cadastroSchema>>({
    resolver: zodResolver(cadastroSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(data: UsuarioCadastro) {
    setLoading(true);
    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: RoutePaths.DASHBOARD,
      },
      {
        onRequest: () => {
          setLoading(true);
          toast.loading("Fazendo cadastro...");
        },
        onSuccess: () => {
          toast.success("Cadastro realizado com sucesso!");
          toast.loading("Redirecionando...");
          setTimeout(() => {
            router.replace(RoutePaths.DASHBOARD);
            toast.dismiss();
          }, 2000);
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error("Erro ao fazer cadastro: " + ctx);
          setLoading(false);
        },
      }
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      <div className="flex w-full min-w-[30rem] flex-col items-center justify-center gap-4 rounded-md border bg-[#FFFFFF] p-6 text-center hover:shadow-xl lg:w-fit lg:max-w-[28rem] lg:items-start lg:justify-start ">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-start">
          <Image alt="uepaLogo" src="/Brasao.png" width={40} height={40} />
          <Separator orientation="vertical" className="bg-gray-300" />
          <h2 className="font-semibold text-[1.1rem] text-gray-700 tracking-wide lg:text-[1.3rem]">
            Cadastro
          </h2>
        </div>
        <Separator orientation="horizontal" className="bg-gray-300" />
        <h4 className="max-w-[95%] text-left font-medium text-[1rem] text-gray-500 tracking-tight lg:text-[1.1rem]">
          <CadastroUserForm
            loading={loading}
            form={form}
            handleSubmit={onSubmit}
          />
        </h4>
      </div>
    </div>
  );
}
