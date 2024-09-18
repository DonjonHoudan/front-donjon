import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { cn } from "@/lib/utils/cn";

export function NavbarHome() {
  return (
    <div className={cn("hidden", "lg:block relative z-10")}>
      <div className="flex items-center justify-between px-[30px] h-[75px]">
        <Link href="/">
          <Image
            src="/logo-donjon.png"
            alt="Logo Donjon de Houdan"
            width={50}
            height={50}
            className="h-[50px] w-[50px] bg-white rounded-full"
          />
        </Link>
        <div className="flex gap-x-[50px]">
          <Link href="/le-donjon">
            <div>Le Donjon</div>
          </Link>
          <Link href="/programmation">
            <div>Programmation</div>
          </Link>
          <Link href="/preparez-votre-visite">
            <div>Préparez votre visite</div>
          </Link>
          <Link href="/actualites">
            <div>Actualités</div>
          </Link>
          <Link href="/contact">
            <div>Contact</div>
          </Link>
          <Link
            href="https://www.facebook.com/ledonjondehoudan"
            target="_blank"
          >
            <FaFacebook className="text-[30px]" />
          </Link>
          <Link
            href="https://www.instagram.com/donjondehoudan/"
            target="_blank"
          >
            <FaInstagram className="text-[30px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
