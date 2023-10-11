import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import Header from "./components/common/Header";
import UIProvider from "./components/providers/UIProvider";

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
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-neutral-400 dark:to-neutral-500 montserrat.className">
          <UIProvider>
            <Header />
            <main className="flex-grow">{children}</main>
          </UIProvider>
        </div>
      </body>
    </html>
  );
}
