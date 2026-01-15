"use client";

import Link from "next/link";
import { Carousel } from "primereact/carousel";
import { ImageStrapi } from "@/components/imageStrapi";
import { Image as ImageType, PageAccueil } from "@/lib/api/types";
import { cn } from "@/lib/utils/cn";

type Evenement = {
  evenements: PageAccueil | null;
};

type EvenementCompile = {
  id: number;
  type: "article" | "programmation";
  titre: string;
  slug: string;
  image?: ImageType;
};

export default function CarouselEvenement({ evenements }: Evenement) {
  if (!evenements) {
    return null;
  }

  const evenementsCompile: EvenementCompile[] = [
    ...evenements.articles.map((article) => ({
      id: article.id,
      type: "article" as const,
      titre: article.titre,
      slug: article.slug,
      image: article.image,
    })),
    ...evenements.programmations.map((programmation) => ({
      id: programmation.id,
      type: "programmation" as const,
      titre: programmation.titre,
      slug: programmation.slug,
      image: programmation.image,
    })),
  ];

  const nombreItems = evenementsCompile.length;

  const template = (data: EvenementCompile) => {
    return (
      <div className={cn(nombreItems > 1 ? "w-full" : "w-[90%] mx-auto")}>
        <Link
          href={`${data.type === "article" ? `actualites` : `programmation`}/${
            data.slug
          }`}
          className="relative block object-cover h-[80vh] max-h-[500px] lg:max-h-[636px]"
        >
          <ImageStrapi
            src={data.image?.url}
            alt="Contenu mis en avant"
            overrideSrc={`
            ${data.image?.formats.medium.url} 450px,
            ${data.image?.formats.small.url} 350px
          `}
            className="rounded-xl border border-black drop-shadow-xl"
            blurDataUrl={data.image?.formats.thumbnail.url}
          />
        </Link>
      </div>
    );
  };

  return (
    <Carousel
      value={evenementsCompile}
      numVisible={1}
      numScroll={1}
      circular={nombreItems > 1}
      showNavigators={nombreItems > 1}
      autoplayInterval={nombreItems > 1 ? 3000 : 0}
      itemTemplate={template}
    />
  );
}
