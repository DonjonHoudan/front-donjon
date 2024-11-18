import type { Metadata } from "next";
import { PrimeReactProvider } from "primereact/api";
import { Navbar } from "@/components/navbar";
import { NavbarMobile } from "@/components/navbarMobile";
import "../globals.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

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
    <section lang="fr">
      <Navbar />
      <NavbarMobile />
      <PrimeReactProvider>{children}</PrimeReactProvider>
    </section>
  );
}
