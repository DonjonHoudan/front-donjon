import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { NavbarMobile } from "@/components/navbarMobile";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Le Donjon de Houdan",
  description:
    "Le Donjon de Houdan est une ancienne tour maitresse, du début du 12ème siècle bâtie par Amaury III de Montfort.",
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
      {children}
      <Footer
        className={cn(
          "h-[150px] bg-gray-300/50 pt-[20px] pb-[225px] flex flex-col items-center mt-[50px]",
          "lg:flex-row lg:gap-x-[20px] lg:justify-center lg:h-[75px] lg:pb-[0px] lg:pt-[0px]",
        )}
      />
    </section>
  );
}
