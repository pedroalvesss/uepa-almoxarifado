"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UsuarioLogin } from "@/types/userAuth";
import { RoutePaths } from "@/utils/RoutePaths";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { LoginUserSchema } from "./components/formSchema";
import { authClient } from "@/lib/auth-client";
import LoginUserForm from "./components/LoginUserForm";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const session = authClient.useSession();
  const form = useForm<z.infer<typeof LoginUserSchema>>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(data: UsuarioLogin) {
    setLoading(true);
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          setLoading(true);
          toast.loading("Fazendo login...");
        },
        onSuccess: () => {
          toast.success("Login realizado com sucesso!");
          toast.loading("Redirecionando...");
          setTimeout(() => {
            router.replace(RoutePaths.DASHBOARD);
            toast.dismiss();
          }, 2000);
          setLoading(false);
        },
        onError: (ctx) => {
          toast.error("Erro ao fazer login" + ctx);
          setLoading(false);
        },
      }
    );
  }

  useEffect(() => {
    if (session?.data?.data?.user?.name) {
      router.replace(RoutePaths.DASHBOARD);
    }
  }, [session, router]);

  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      <div className="flex w-full min-w-[30rem] flex-col items-center justify-center gap-4 rounded-md border bg-[#FFFFFF] p-6 text-center hover:shadow-xl lg:w-fit lg:max-w-[28rem] lg:items-start lg:justify-start ">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-start">
          <Image alt="uepaLogo" src="/Brasao.png" width={40} height={40} />
          <Separator
            orientation="vertical"
            className="hidden md:block bg-gray-300"
          />
          <h2 className="font-semibold text-[1.1rem] text-gray-700 tracking-wide lg:text-[1.3rem]">
            Login
          </h2>
        </div>
        <Separator orientation="horizontal" className="bg-gray-300" />
        <h4 className="max-w-[95%] text-left font-medium text-[1rem] text-gray-500 tracking-tight lg:text-[1.1rem]">
          <LoginUserForm
            loading={loading}
            form={form}
            handleSubmit={onSubmit}
          />
        </h4>
      </div>
    </div>
  );
}
