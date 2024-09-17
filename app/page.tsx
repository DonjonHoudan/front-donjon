import Image from "next/image";
import Link from "next/link";
import { getHomePage } from "@/lib/api/resources/homepage";
import { ImageStrapi } from "@/components/imageStrapi";
import { cn } from "@/lib/utils/cn";

export default async function Home() {
  const homepage = await getHomePage();
  return (
    <section className="relative h-[calc(100vh-75px)]">
      <div className="absolute top-0 lg:top-[-75px] left-0 h-full w-full">
        <Image
          src="/donjon.jpg"
          alt="Donjon de Houdan"
          width={1960}
          height={1000}
          className="w-full h-[100vh] object-cover"
        />
      </div>
      <div className={cn(
        "absolute top-[15vh] right-[10vw] max-h-[70vh] max-w-[80vw] object-cover z-10",
        "lg:top-[5vh] lg:right-[10vw] lg:max-h-[60vh] lg:max-w-[25vw]",
        )}>
        <Link href={homepage.lien ?? ""}>
          <ImageStrapi
            src={homepage.image.data.attributes.url}
            alt="Contenu mis en avant"
            width={300}
            height={300}
            className="rounded-xl border border-black drop-shadow-xl"
          />
        </Link>
      </div>
    </section>
  );
}
