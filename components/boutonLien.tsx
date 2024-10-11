import { cn } from "@/lib/utils/cn";

type BoutonLienProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function BoutonLien({ href, children, className }: BoutonLienProps) {
  return (
    <a
      href={href}
      target="_blank"
      className={cn("bg-black text-white font-bold px-[20px] py-[10px] rounded", className)}
    >
      {children}
    </a>
  );
}
