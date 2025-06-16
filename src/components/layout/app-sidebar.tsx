"use client";

import { PrimaryNav } from "@/components/layout/primary-nav";
import { NavUser } from "@/components/layout/user-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { RoutePaths } from "@/utils/RoutePaths";
import { Building2, Sheet } from "lucide-react";
import type * as React from "react";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const session = authClient.useSession();
  const isAuthenticated =
    session?.data?.data?.user && session?.data?.data?.session;

  if (!isAuthenticated) return null;

  const listData = {
    user: {
      name: session?.data?.data?.user?.name ?? "Deslogado",
      cargo:
        session?.data?.data?.user?.role === "usuario   "
          ? "Servidor"
          : "Administrador",
      avatar: "/static/images/avatar.png",
    },
    navMain: [
      {
        title: "Home",
        url: "#",
        icon: Building2,
        items: [
          {
            title: "Pagina Inicial",
            url: RoutePaths.DASHBOARD,
          },
        ],
      },
      {
        title: "Estoque",
        url: "#",
        icon: Sheet,
        items: [
          {
            title: "Tabela",
            url: RoutePaths.TABELA_PRODUTOS,
          },
          {
            title: "Movimentação",
            url: RoutePaths.TABELA_PRODUTOS,
          },
          {
            title: "Cadastrar",
            url: RoutePaths.CADASTRAR_PRODUTO,
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader />
      <SidebarContent>
        <PrimaryNav items={listData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={listData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
