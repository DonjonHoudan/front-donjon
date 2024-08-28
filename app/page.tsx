import Image from "next/image";
import Link from "next/link";
import { getHomePage } from "@/lib/api/resources/homepage";
import { ImageStrapi } from "@/components/imageStrapi";

export default async function Home() {
  const homepage = await getHomePage();
  return (
    <section className="relative">
      <div className="absolute top-[-100px] left-0 w-screen h-screen">
        <Image
          src="/donjon.jpg"
          alt="Donjon de Houdan"
          width={1960}
          height={1080}
          className="h-full object-cover"
        />
      </div>
      <div className="absolute top-[50px] right-[150px] h-[700px] w-[475px] object-cover z-10">
        <Link href={homepage.lien ?? ""}>
          <ImageStrapi
            src={homepage.image.data.attributes.url}
            alt="Contenu mis en avant"
            width={475}
            height={700}
            className="rounded-xl border border-black drop-shadow-xl"
          />
        </Link>
      </div>
    </section>
  );
}
