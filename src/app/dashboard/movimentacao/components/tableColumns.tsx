import { Movimentacao } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

export function movimentacoesTableColumns(): ColumnDef<
  Movimentacao | undefined
>[] {
  return [
    {
      accessorKey: "id",
      header: () => {
        return (
          <div className="flex justify-center text-center">
            ID da Movimentação
          </div>
        );
      },
      cell: (cell) => (
        <div className="flex justify-center text-center">
          {cell.row.original?.id}
        </div>
      ),
    },
    {
      accessorKey: "produtoid",
      header: () => {
        return (
          <div className="flex justify-center text-center">ID do Produto</div>
        );
      },
      cell: (cell) => (
        <div className="flex justify-center text-center">
          {cell.row.original?.produtoid}
        </div>
      ),
    },
    {
      accessorKey: "produtonome",
      header: () => {
        return (
          <div className="flex justify-center text-center">Nome do Produto</div>
        );
      },
      cell: (cell) => (
        <div className="flex justify-center text-center">
          {cell.row.original?.produtonome}
        </div>
      ),
    },
    {
      accessorKey: "quantidade",
      header: () => {
        return (
          <div className="flex justify-center text-center">Quantidade</div>
        );
      },
      cell: (cell) => {
        return (
          <div className="flex justify-center text-center">
            {cell.row.original?.quantidade}
          </div>
        );
      },
    },
    {
      accessorKey: "tipo",
      header: () => {
        return (
          <div className="flex justify-center text-center">
            Tipo de Movimentação
          </div>
        );
      },
      cell: (cell) => {
        return (
          <div className="flex justify-center text-center">
            {cell.row.original?.tipo === "s" ? "Saída" : "Entrada"}
          </div>
        );
      },
    },
  ];
}
