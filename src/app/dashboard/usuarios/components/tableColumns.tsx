import { Dialog } from "@/components/Dialog";
import { Button } from "@/components/ui/button";
import { ExporUsuario } from "@/types/userAuth";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { redirect } from "next/navigation";

interface usersTableColumnsProps {
  deleteUsuario: (id: string) => Promise<void>;
}

export function usersTableColumns({
  deleteUsuario,
}: usersTableColumnsProps): ColumnDef<ExporUsuario | undefined>[] {
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
      accessorKey: "name",
      header: () => {
        return <div className="flex justify-center text-center">Nome</div>;
      },
      cell: (cell) => (
        <div className="flex justify-center text-center">
          {cell.row.original?.name}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: () => {
        return <div className="flex justify-center text-center">Email</div>;
      },
      cell: (cell) => (
        <div className="flex justify-center text-center">
          {cell.row.original?.email}
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: () => {
        return (
          <div className="flex justify-center text-center">Tipo de Usuario</div>
        );
      },
      cell: (cell) => {
        return (
          <div className="flex justify-center text-center">
            {cell.row.original?.type}
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
              redirect(`/dashboard/usuarios/${cell.row.original?.id}/editar`)
            }
          >
            <Pencil color="white" />
          </Button>

          <Dialog
            buttonTitle={<Trash2 color="white" />}
            title="Excluir Usuario"
            description={`Tem certeza que deseja excluir o usuario ${cell.row.original?.name}? Esta ação não pode ser desfeita.`}
            buttonActionTitle="Deletar"
            buttonSubmitClassname="bg-red-600 hover:bg-red-700 cursor-pointer"
            className="w-10 h-10 bg-red-600  hover:bg-red-700 cursor-pointer"
            dialogClassName="w-[30rem]"
            onClose={() => {
              if (cell.row.original?.id != undefined) {
                deleteUsuario(cell.row.original.id);
              }
            }}
          >
            {"  "}
          </Dialog>
        </div>
      ),
    },
  ];
}
