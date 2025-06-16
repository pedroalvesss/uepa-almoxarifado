"use client";
import { useDataTable } from "@/hooks/useDataTable";
import { useMovimentacaoListQuery } from "@/lib/hooks/service-hooks";
import type { DataTableFilterField, Movimentacao } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { movimentacoesTableColumns } from "./tableColumns";

export function MovimentacoesTable({
  search,
  limit,
  currentPage = 1,
}: {
  search?: string;
  limit: number;
  currentPage?: number;
}) {
  const { data, error, isSuccess, isFetching, isRefetching } =
    useMovimentacaoListQuery({
      search,
      limit,
      page: currentPage,
    });
  const totalItems = data?.page?.total_items || 0;
  const totalPages = data?.page?.total_pages || 0;

  const columns = useMemo(() => movimentacoesTableColumns(), []);
  const filterFields: DataTableFilterField<Movimentacao>[] = [];
  const movimentacoes = data?.results || [];

  const { table } = useDataTable({
    data: movimentacoes,
    columns: (columns as ColumnDef<Movimentacao>[]) || [],
    pageCount: totalPages,
    rowCount: totalItems || 0,
    filterFields,
    defaultSize: limit,
  });

  const nextPageTable = () => {
    if (data?.page?.next) {
      table.setPagination((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex + 1,
      }));
    }
  };
  const previousPageTable = () => {
    if (data?.page?.previous) {
      table.setPagination((prev) => ({
        ...prev,
        pageIndex: prev.pageIndex - 1,
      }));
    }
  };
  table.nextPage = nextPageTable;
  table.previousPage = previousPageTable;

  return {
    isLoading: isFetching || isRefetching,
    isSuccess,
    error,
    totalItems: totalItems || 0,
    produtosTable: table,
    filterFields,
  };
}
