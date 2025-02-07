import { Metadata } from "next";
import Link from "next/link";
import { BoutonLien } from "@/components/boutonLien";
import { Card } from "@/components/card";
import { ImageStrapi } from "@/components/imageStrapi";
import { H1, H2 } from "@/components/titles";
import { getPageActualites } from "@/lib/api/resources/actualites";
import { cn } from "@/lib/utils/cn";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Actualité | Le Donjon de Houdan",
  description: "Retrouvez toutes les actualités du Donjon de Houdan sur cette page.",
};

export default async function Actualites() {
  const data = await getPageActualites();

  return (
    <section className="min-h-screen lg:mt-[-200px] lg:pt-[200px]">
      <H1 className="my-[50px] text-center">Actualités</H1>
      <div
        className={cn(
          "flex flex-wrap justify-around px-[10px] mb-[130px] gap-[30px]",
          "lg:px-[20vh] lg:mb-[50px]"
        )}
      >
        {data.map((evenement) => (
          <Card
            key={evenement.id}
            className="flex flex-col items-center gap-y-[20px] w-[400px]"
          >
            <H2 className="text-center">{evenement.titre}</H2>
            
              <Link
                href={`actualites/${evenement.slug}`}
                className="relative block w-[300px] h-[424px]"
              >
                <ImageStrapi
                  src={evenement.image.url}
                  alt={evenement.titre}
                  blurDataUrl={evenement.image.formats.thumbnail.url}
                />
              </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
