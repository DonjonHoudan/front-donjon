import type { Metadata } from "next";
import { PrimeReactProvider } from "primereact/api";
import { Navbar } from "@/components/navbar";
import { NavbarMobile } from "@/components/navbarMobile";
import "../globals.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

export const metadata: Metadata = {
  title: "Le Donjon de Houdan",
  description: "Le Donjon de Houdan est une ancienne tour maitresse, du début du 12ème siècle bâtie par Amaury 3 de Montfort.",
};

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section lang="fr">
      <Navbar />
      <NavbarMobile />
      <PrimeReactProvider>{children}</PrimeReactProvider>
    </section>
  );
}
