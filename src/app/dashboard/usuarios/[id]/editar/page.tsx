"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RoutePaths } from "@/utils/RoutePaths";
import { authClient } from "@/lib/auth-client";
import { editUserSchema } from "./components/formSchema";
import { EditUserParams } from "@/types/userAuth";
import EditarUsuarioForm from "./components/EditarUsuarioForm";
import { updateUser } from "@/services/user-service";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
    },
  });
  const session = authClient.useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  async function onSubmit(data: EditUserParams) {
    setLoading(true);
    try {
      const response = await updateUser(id, data);
      if (response) {
        toast.success("Usuario editado com sucesso!");
        router.replace("/dashboard/usuarios");
      }
    } catch (error) {
      toast.error("Erro ao editar usuario: " + error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!session?.data?.data?.user?.name == null) {
      router.replace(RoutePaths.LOGIN);
    }
  }, [session, router]);

  return (
    <div className="flex flex-col p-10 gap-4">
      <h2 className="text-[2rem] font-bold">{`Editando Usuario - ID ${id}`}</h2>
      <EditarUsuarioForm
        router={router}
        loading={loading}
        form={form}
        handleSubmit={onSubmit}
      />
    </div>
  );
}
