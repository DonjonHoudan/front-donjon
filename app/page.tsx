import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Home() {
  return (
    <section className="flex flex-col justify-between items-center">
      <div className="flex flex-col items-center justify-center w-full lg:relative">
        <Image
          src="/logo-donjon.png"
          alt="Donjon de Houdan"
          width={150}
          height={150}
          className="lg:absolute top-4 left-4 mt-8 lg:mt-0"
        />
        <h1 className="text-3xl font-bold my-8">Le Donjon de Houdan</h1>
        <div>Notre site est actuellement en maintenance</div>
      </div>
      <hr className="w-1/2 border-gray-400 my-8" />
      <div className="flex flex-col lg:flex-row lg:gap-x-40">
        <div className="flex flex-col items-center">
          <h2 className="text-xl py-5">Nos ouvertures du mois</h2>
          <Image
            src="/ouverture-avril.png"
            alt="Ouvertures du Donjon de Houdan au mois d'avril"
            width={400}
            height={300}
          />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl py-5">
            Notre prochain concert le samedi 1er juin à 19h
          </h2>
          <Image
            src="/concert-police-vibrations.png"
            alt="Concert The Police Vibrations au Donjon de Houdan le samedi 1er juin à 19h"
            width={400}
            height={300}
          />
          <div className="my-4">
            <iframe
              id="haWidget"
              allowTransparency
              src="https://www.helloasso.com/associations/association-le-donjon-de-houdan/evenements/the-police-vibrations-en-concert-au-donjon-de-houdan/widget-bouton"
              style={{ width: "100%", height: "70px", border: "none" }}
            ></iframe>
          </div>
        </div>
      </div>
      <hr className="w-1/2 border-gray-400 my-8" />
      <div className="w-full flex flex-col items-center mb-4 text-center">
        <div>
          Suivez-nous sur nos réseaux pour rester informé de nos actualités
        </div>
        <div className="flex gap-x-4 mt-2">
          <Link
            href="https://www.facebook.com/ledonjondehoudan"
            target="_blank"
          >
            <FaFacebook className="text-[40px]" />
          </Link>
          <Link
            href="https://www.instagram.com/donjondehoudan/"
            target="_blank"
          >
            <FaInstagram className="text-[40px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
