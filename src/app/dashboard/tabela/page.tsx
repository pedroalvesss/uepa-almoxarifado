"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ProdutosTable } from "./components/produtosTable";
import { useDebounce } from "@/hooks/useDebounce";
import { DataTable } from "@/components/data-table/data-table";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { RoutePaths } from "@/utils/RoutePaths";

export const tableSchema = z.object({
  page: z.coerce.number().default(1),
  size: z.coerce.number().optional(),
  sort: z.string().optional(),
});

export default function Page() {
  const router = useRouter();
  const session = authClient.useSession();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>();
  const debouncedSetSearch = useDebounce(setSearch, 500);

  if (!session?.data?.data?.user?.name == null) {
    redirect(RoutePaths.LOGIN);
  }
  const queryParams = tableSchema.parse(Object.fromEntries(searchParams));
  const page = queryParams.page || 1;
  const size = queryParams.size ?? 10;

  const { produtosTable, totalItems, filterFields, isLoading } = ProdutosTable({
    limit: size,
    currentPage: page,
    search,
  });

  return (
    <div className="flex flex-col gap-5 p-15">
      <div className="flex justify-between items-center">
        <h2 className="text-[2rem] font-bold">Produtos ({totalItems || 0})</h2>
        <Button
          className="w-60 cursor-pointer h-10 font-bold bg-[#487348] hover:bg-[#2c462c] dark:hover:bg-[#2c462c] text-white -tracking-tight"
          onClick={() => router.push("/dashboard/tabela/cadastrar")}
        >
          Cadastrar Novo Produto <Save />
        </Button>
      </div>
      <Input
        placeholder="Busca por nome"
        className="bg-[#EFEFEF] dark:bg-[#1A1A1A] w-full"
        onChange={(e) => debouncedSetSearch(e.target.value)}
      />

      <DataTable
        table={produtosTable}
        filterFields={filterFields}
        footer={true}
        isLoading={isLoading}
      />
    </div>
  );
}
