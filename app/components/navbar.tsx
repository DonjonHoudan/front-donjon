import Link from "next/link";
import Image from "next/image";
import { H2 } from "@/components/titles";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export function Navbar() {
  return (
    <div className="relative h-[100px] z-10">
      <Link href="/">
        <Image
          src="/logo-donjon.png"
          alt="Logo Donjon de Houdan"
          width={150}
          height={150}
          className="absolute top-[15px] left-[30px] h-[70px] w-[70px] bg-white rounded-full"
        />
      </Link>
      <div className="absolute top-[30px] right-[30px] flex items-center gap-x-[50px]">
        <Link href="/le-donjon">
          <H2>Le Donjon</H2>
        </Link>
        <Link href="/programmation">
          <H2>Programmation</H2>
        </Link>
        <Link href="/preparez-votre-visite">
          <H2>Préparez votre visite</H2>
        </Link>
        <Link href="/actualites">
          <H2>Actualités</H2>
        </Link>
        <Link href="/contact">
          <H2>Contact</H2>
        </Link>
        <Link href="https://www.facebook.com/ledonjondehoudan" target="_blank">
          <FaFacebook className="text-[40px]" />
        </Link>
        <Link href="https://www.instagram.com/donjondehoudan/" target="_blank">
          <FaInstagram className="text-[40px]" />
        </Link>
      </div>
    </div>
  );
}
