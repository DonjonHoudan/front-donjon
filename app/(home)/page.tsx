import Image from "next/image";
import Link from "next/link";
import { getHomePage } from "@/lib/api/resources/homepage";
import { ImageStrapi } from "@/components/imageStrapi";
import { cn } from "@/lib/utils/cn";
import { Image as ImageType, PageAccueil } from "@/lib/api/types";

export const revalidate = 3600;

export default async function Home() {
  const data = await getHomePage();

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
      <div
        className={cn(
          "absolute top-[15vh] w-[100vw] object-cover z-10",
          "lg:top-[5vh] md:right-[10vw]"
        )}
      >
        <div className="flex justify-center md:justify-end">
        <AffichageEvenement evenement={data} />
        </div>
      </div>
    </section>
  );
}

type Evenement = {
  evenement: PageAccueil|null;
}

type EvenementAffiche = {
  slug: string;
  image: ImageType;
}

function AffichageEvenement({ evenement }: Evenement) {
  if (!evenement) {
    return null;
  }

  let data: EvenementAffiche | null = null;

  if (evenement.article) {
    data = {
      slug: evenement.article.slug,
      image: evenement.article.image,
    };
  } else if (evenement.programmation) {
    data = {
      slug: evenement.programmation.slug,
      image: evenement.programmation.image,
    };
  }

  if (!data) {
    return null;
  }

  return (
    <Link
      href={`${evenement.article ? `actualites` : `programmation`}/${data.slug}`}
      className="relative w-[350px] h-[500px] lg:w-[450px] lg:h-[636px]"
    >
      <ImageStrapi
        src={data.image.url}
        alt="Contenu mis en avant"
        overrideSrc={`
        ${data.image.formats.medium.url} 450px,
        ${data.image.formats.small.url} 350px
      `}
        className="rounded-xl border border-black drop-shadow-xl"
        blurDataUrl={data.image.formats.thumbnail.url}
      />
    </Link>
  );
}
