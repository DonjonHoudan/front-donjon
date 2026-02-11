import { NavbarHome } from "@/components/navbarHome";
import { NavbarMobile } from "@/components/navbarMobile";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils/cn";

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
          "lg:flex lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:z-10 lg:bg-gray-300/30 lg:h-[40px] lg:justify-center lg:items-center lg:pt-[20px] lg:pb-[20px] lg:gap-x-[20px]"
        )}
      />
    </section>
  );
}
