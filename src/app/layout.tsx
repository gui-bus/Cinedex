import UIProvider from "@/components/providers/UIProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import NavBar from "@/components/common/NavBar";
import { Toaster } from "react-hot-toast";
import SideBar from "@/components/common/SideBar";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinedex | Seu catálogo definitivo de filmes e séries",
  description:
    "Explore uma vasta coleção de filmes, séries e muito mais com a Cinedex, a sua fonte confiável para informações.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={montserrat.className}>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-neutral-400 dark:to-neutral-500">
          <UIProvider>
            <Toaster position="bottom-center" reverseOrder={false} gutter={5} />
            <NavBar />
            <div className="grid grid-cols-1 sm:grid-cols-[220px,1fr] overflow-auto">
              <SideBar />

              <main className="flex-grow p-4">{children}</main>
            </div>
          </UIProvider>
        </div>
      </body>
    </html>
  );
}
