import type { Metadata } from "next";
import { NavbarHome } from "@/components/navbarHome";
import { NavbarMobile } from "@/components/navbarMobile";
import "../globals.css";


export const metadata: Metadata = {
  title: "Le Donjon de Houdan",
  description: "Le Donjon de Houdan est une ancienne tour maitresse, du début du 12ème siècle bâtie par Amaury III de Montfort.",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <NavbarHome />
      <NavbarMobile />
      {children}
    </section>
  );
}
