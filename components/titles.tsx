import { cn } from "@/lib/utils/cn";

type TitleProps = {
  children: string;
  className?: string;
};

export function H1({ children, className }: TitleProps) {
  return <h1 className={cn(className, "text-3xl")}>{children}</h1>;
}

export function H2({ children, className }: TitleProps) {
  return <h2 className={cn(className, "text-2xl")}>{children}</h2>;
}
