import { NavbarHome } from "@/components/navbarHome";
import { NavbarMobile } from "@/components/navbarMobile";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils/cn";
import "../globals.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

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
      <Footer
        className={cn(
          "hidden",
          "lg:flex lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:z-10 lg:bg-gray-300 lg:bg-opacity-30 lg:h-[40px] lg:justify-center lg:items-center lg:pt-[20px] lg:pb-[20px] lg:gap-x-[20px]"
        )}
      />
    </section>
  );
}
