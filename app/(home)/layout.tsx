import type { Metadata } from "next";
import { NavbarHome } from "@/components/navbarHome";
import { NavbarMobile } from "@/components/navbarMobile";
import "../globals.css";


export const metadata: Metadata = {
  title: "Donjon de Houdan",
  description: "Donjon de Houdan, Yvelines, France",
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
