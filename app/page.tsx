import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default async function Home() {
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
      <div className="flex flex-col lg:flex-row lg:gap-x-30">
        <div className="flex flex-col items-center lg:w-1/2">
          <h2 className="text-xl py-5">Nos prochaines ouvertures</h2>
          <Image
            src="/ouvertures-juillet.png"
            alt="Ouvertures du Donjon de Houdan au mois de juillet"
            width={400}
            height={300}
          />
        </div>
        <div className="flex flex-col items-center lg:w-1/2 px-4">
          <div className="flex flex-col items-center gap-y-4">
            <h2 className="text-xl py-5">Nos prochains concerts</h2>
            <h3 className="text-lg">Cathy Gringelli</h3>
            <div>Samedi 7 septembre à 19h</div>
            <div>
              Venez découvrir, à la croisée d&apos;univers musicaux folk-rock,
              balades irlandaises, baroque, jazz et traditionnel, ce quartet
              voix et cordes.
            </div>
            <iframe
              id="haWidget"
              allowTransparency={true}
              src="https://www.helloasso.com/associations/association-le-donjon-de-houdan/evenements/cathy-gringelli-quartet-en-concert-au-donjon-de-houdan/widget-bouton"
              style={{ width: "100%", height: "70px", border: "none" } as React.CSSProperties}
            ></iframe>
          </div>
          <hr className="w-1/2 border-gray-400 my-8" />
          <div className="flex flex-col items-center gap-y-4">
            <h3 className="text-lg">RiND</h3>
            <div>Samedi 12 octobre à 19h</div>
            <div>
              RiND pour Rock is Not Dead, telle est la devise de ce trio composé
              de Thierry, Sébastien et Yannick, qui revisite les standards du
              rock version électrique ou acoustique.
            </div>
            <iframe
              id="haWidget"
              allowTransparency={true}
              src="https://www.helloasso.com/associations/association-le-donjon-de-houdan/evenements/rind-en-concert-au-donjon-de-houdan-1/widget-bouton"
              style={{ width: "100%", height: "70px", border: "none" } as React.CSSProperties}
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
