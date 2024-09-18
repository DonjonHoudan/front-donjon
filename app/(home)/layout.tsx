import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import { NavbarHome } from "@/components/navbarHome";
import { NavbarMobile } from "@/components/navbarMobile";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Donjon de Houdan",
  description: "Donjon de Houdan, Yvelines, France",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/logo-donjon.png"
        />
      </head>
      <body className={nunito.className}>
        <NavbarHome />
        <NavbarMobile />
        {children}
      </body>
    </html>
  );
}
