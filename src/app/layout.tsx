import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { cookies } from "next/headers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "./Providers";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "UEPA Estoque",
    default: "UEPA Estoque",
  },
  icons: {
    icon: "/Brasao.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <html lang="pt-br">
      <body className={cn("min-h-screen flex flex-col", inter.className)}>
        <Providers>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <SidebarInset>
              <Header />
              <Toaster richColors position="bottom-right" />
              <main className="flex-1">{children}</main>
              <Footer />
            </SidebarInset>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
