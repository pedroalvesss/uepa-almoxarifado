import { Dialog } from "@/components/Dialog";
import { Button } from "@/components/ui/button";
import { deleteProduto } from "@/services/produtos-service";
import { Produto } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export function produtosTableColumns(): ColumnDef<Produto | undefined>[] {
  return [
    {
      accessorKey: "id",
      header: () => {
        return <div className="flex justify-center text-center">ID</div>;
      },
      cell: (cell) => (
        <div className="flex justify-center text-center">
          {cell.row.original?.id}
        </div>
      ),
    },
    {
      accessorKey: "nome",
      header: () => {
        return <div className="flex justify-center text-center">Nome</div>;
      },
      cell: (cell) => (
        <div className="flex justify-center text-center">
          {cell.row.original?.nome}
        </div>
      ),
    },
    {
      accessorKey: "descricao",
      header: () => {
        return <div className="flex justify-center text-center">Descricao</div>;
      },
      cell: (cell) => (
        <div className="flex justify-center text-center">
          {cell.row.original?.descricao}
        </div>
      ),
    },
    {
      accessorKey: "qntd_estoq",
      header: () => {
        return (
          <div className="flex justify-center text-center">
            Quantidade em Estoque
          </div>
        );
      },
      cell: (cell) => {
        return (
          <div className="flex justify-center text-center">
            {cell.row.original?.qntd_estoq}
          </div>
        );
      },
    },
    {
      accessorKey: "acoes",
      header: () => {
        return <div className="flex justify-center text-center">Ações</div>;
      },
      cell: (cell) => (
        <div className="flex justify-center text-center gap-3 p-1">
          <Button
            className="w-10 h-10 bg-blue-600  hover:bg-blue-700 cursor-pointer"
            onClick={() =>
              redirect(`/dashboard/tabela/${cell.row.original?.id}/editar`)
            }
          >
            <Pencil color="white" />
          </Button>

          <Dialog
            buttonTitle={<Trash2 color="white" />}
            title="Excluir Produto"
            description={`Tem certeza que deseja excluir o produto ${cell.row.original?.nome}? Esta ação não pode ser desfeita.`}
            buttonActionTitle="Deletar"
            buttonSubmitClassname="bg-red-600 hover:bg-red-700 cursor-pointer"
            className="w-10 h-10 bg-red-600  hover:bg-red-700 cursor-pointer"
            dialogClassName="w-[30rem]"
            onClose={() => {
              if (cell.row.original?.id != undefined) {
                deleteProduto(cell.row.original.id);
                toast.loading("Excluindo produto...");
              }
              setTimeout(() => {
                window.location.reload();
              }, 2500);
            }}
          >
            {"  "}
          </Dialog>
        </div>
      ),
    },
  ];
}
