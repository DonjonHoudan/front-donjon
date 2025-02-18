import { cn } from "@/lib/utils/cn";

type BoutonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function Bouton({ children, className, onClick }: BoutonProps) {
  return (
    <button
      className={cn("bg-black text-white font-bold px-[20px] py-[10px] rounded", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
