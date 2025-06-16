"use client";
import { Input } from "@/components/ui/input";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { DataTable } from "@/components/data-table/data-table";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { RoutePaths } from "@/utils/RoutePaths";
import { UsersTable } from "./components/usersTable";

export const tableSchema = z.object({
  page: z.coerce.number().default(1),
  size: z.coerce.number().optional(),
  sort: z.string().optional(),
});

export default function Page() {
  const session = authClient.useSession();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>();
  const debouncedSetSearch = useDebounce(setSearch, 500);

  if (session?.data?.data?.user?.name == null) {
    redirect(RoutePaths.LOGIN);
  }
  const queryParams = tableSchema.parse(Object.fromEntries(searchParams));
  const page = queryParams.page || 1;
  const size = queryParams.size ?? 10;

  const { produtosTable, totalItems, filterFields, isLoading } = UsersTable({
    limit: size,
    currentPage: page,
    search,
  });

  return (
    <div className="flex flex-col gap-5 p-15">
      <div className="flex justify-between items-center">
        <h2 className="text-[2rem] font-bold">Usuarios ({totalItems || 0})</h2>
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
