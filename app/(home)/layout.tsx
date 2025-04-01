import { NavbarHome } from "@/components/navbarHome";
import { NavbarMobile } from "@/components/navbarMobile";
import "../globals.css";

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
