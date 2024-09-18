import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  return (
    <div className={cn("hidden", "lg:block relative")}>
      <Image
        src="/donjon.jpg"
        alt="Donjon de Houdan"
        width={1960}
        height={100}
        className="absolute top-0 left-0 w-full h-[200px] object-cover"
      />
      <div className="relative top-[30px] flex items-center justify-between px-[30px] h-[75px] bg-black bg-opacity-60 text-white">
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
