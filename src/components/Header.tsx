"use client";
import Image from "next/image";
import { SidebarTrigger } from "./ui/sidebar";
import { UserIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function Header() {
  const session = authClient.useSession();
  console.log(session);

  const isAuthenticated =
    session?.data?.data?.user && session?.data?.data?.session;

  const userName = isAuthenticated
    ? session?.data?.data?.user.name
    : "Deslogado";

  return (
    <header className="sticky top-0 z-20 border-b bg-gradient-to-r from-[#013eff] via-[#5c9bbe] to-[#0e9c35]">
      <nav className="flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <SidebarTrigger className="rounded-lg border size-8 cursor-pointer" />
          ) : null}
          <Image
            src="/brasaouepa1.png"
            alt="Logo Uepa"
            height={65}
            width={65}
          />
        </div>

        <div>
          <div className="flex gap-3 items-center justify-center">
            <UserIcon
              className="rounded-full bg-gray-300 border-2 border-slate-400"
              width={40}
              height={40}
            />
            <div className="flex flex-col">
              <span className="text-gray-800 text-[1.1rem]">
                {isAuthenticated ? userName : "Deslogado"}
              </span>
              <span className="text-gray-800 font-light text-[0.75rem]">
                {isAuthenticated
                  ? session?.data?.data?.user.role === "usuario   "
                    ? "Servidor"
                    : "Administrador"
                  : "Visitante"}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
