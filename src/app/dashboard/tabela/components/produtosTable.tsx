"use client";
import { useDataTable } from "@/hooks/useDataTable";
import { useProdutosListQuery } from "@/lib/hooks/service-hooks";
import type { DataTableFilterField, Produto } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { produtosTableColumns } from "./tableColumns";

export function ProdutosTable({
  search,
  limit,
  currentPage = 1,
}: {
  search?: string;
  limit: number;
  currentPage?: number;
}) {
  const { data, error, isSuccess, isFetching, isRefetching } =
    useProdutosListQuery({
      search,
      limit,
      page: currentPage,
    });
  const totalItems = data?.page?.total_items || 0;
  const totalPages = data?.page?.total_pages || 0;

  const columns = useMemo(() => produtosTableColumns(), []);
  const filterFields: DataTableFilterField<Produto>[] = [];
  const produtos = data?.results || [];

  const { table } = useDataTable({
    data: produtos,
    columns: (columns as ColumnDef<Produto>[]) || [],
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
