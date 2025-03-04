import { cn } from "@/lib/utils/cn";

type BoutonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export function Bouton({ children, className, onClick, type, disabled=false }: BoutonProps) {
  return (
    <button
      className={cn("bg-black text-white font-bold px-[20px] py-[10px] rounded hover:cursor-pointer hover:bg-gray-800", className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
