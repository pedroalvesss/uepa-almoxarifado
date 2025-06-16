"use client";
import { CardWithRedirect, CardWithTitle } from "@/components/Card";
import { authClient } from "@/lib/auth-client";
import { RoutePaths } from "@/utils/RoutePaths";
import { NotebookText, Table, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CardDashboard() {
  const session = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.data?.data?.user?.name == null) {
      router.replace(RoutePaths.LOGIN);
    }
  }, [session, router]);

  return (
    <div className="flex max-w-[97%] flex-col gap-8">
      <CardWithTitle>
        <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-between lg:gap-0">
          <div className="flex flex-col gap-1 text-center lg:text-left">
            <h2 className="font-normal text-[1.4rem] text-gray-900 tracking-tight md:text-[1.6rem] lg:text-[1.8rem] dark:text-gray-300">
              Seja bem vindo,{" "}
              <strong className="font-semibold tracking-tighter dark:text-gray-200">
                {session?.data?.data?.user?.name ?? ""}
              </strong>
            </h2>

            <h3 className="max-w-[30rem] text-[1rem] text-gray-500 tracking-wide md:text-[1.1rem] lg:text-[1.2rem] dark:text-gray-400">
              Área dedicada aos usuários que possuem permissão de:{" "}
              <strong className="text-gray-700 dark:text-gray-200">
                {session?.data?.data?.user?.role === "usuario   "
                  ? "Servidor"
                  : "Administrador"}
              </strong>
            </h3>
          </div>

          <Image src="/Brasao.png" alt="LogoUepa" width={120} height={120} />
        </div>
      </CardWithTitle>

      <hr className="border-zinc-200 dark:border-[#2C6E49]" />

      <div className="flex justify-center gap-4 lg:justify-between">
        <CardWithRedirect
          icon={<NotebookText color="#2C6E49" />}
          title="Criar Relatório"
          subtitle="Baixar um relatório de estoque em .xlsx"
          buttonTitle="Gerar"
          link="https://api-estoque-7wp0.onrender.com/produtos/excel"
        />
        <CardWithRedirect
          icon={<Table color="#2C6E49" />}
          title="Tabela de Produtos"
          subtitle="Redirecionar para a página de tabela de estoque"
          buttonTitle="Ir para tabela"
          link={RoutePaths.TABELA_PRODUTOS}
        />
        {session?.data?.data?.user?.role !== "usuario   " ? (
          <CardWithRedirect
            icon={<Users color="#2C6E49" />}
            title="Gestão de Usuários (Admin)"
            subtitle="Redirecionar para a tabela de usuários."
            buttonTitle="Ir para tabela"
            link={RoutePaths.TABELA_USERS}
          />
        ) : null}
      </div>
    </div>
  );
}
