import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <div className={cn(className)}>
      <Link href="/mentions-legales">
        <div>Mentions légales</div>
      </Link>
      -
      <Link href="/politique-confidentialite">
        <div>Politique de confidentialité</div>
      </Link>
      -
      <Link href="/inscription-newsletter">
        <div>Newsletter</div>
      </Link>
    </div>
  );
}
