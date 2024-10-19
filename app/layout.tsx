import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import { Navbar } from "@/components/navbar";
import { NavbarMobile } from "@/components/navbarMobile";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Donjon de Houdan",
  description: "Donjon de Houdan, Yvelines, France",
};

export default function ContentLayout({
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
        <Navbar />
        <NavbarMobile />
        <PrimeReactProvider>{children}</PrimeReactProvider>
        <Analytics />
      </body>
    </html>
  );
}
