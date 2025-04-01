import { Metadata } from "next";
import Link from "next/link";
import { BoutonLien } from "@/components/boutonLien";
import { Card } from "@/components/card";
import { ImageStrapi } from "@/components/imageStrapi";
import { H1, H2 } from "@/components/titles";
import { getPageProgrammation } from "@/lib/api/resources/programmations";
import { cn } from "@/lib/utils/cn";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Programmation | Le Donjon de Houdan",
  description: "Découvrez toutes la programmation proposée par le Donjon de Houdan.",
};

export default async function Programmation() {
  const data = await getPageProgrammation();

  return (
    <section className="min-h-screen lg:mt-[-200px] lg:pt-[200px]">
      <H1 className="my-[50px] text-center">Programmation</H1>
      <div className={cn("flex flex-wrap justify-around mb-[130px] gap-[30px]", "lg:px-[20vh] lg:mb-[50px]")}>
        {data.map((evenement) => (
          <Card
            key={evenement.id}
            className="flex flex-col items-center gap-y-[20px] w-[90vw] lg:w-[400px]"
          >
            <H2 className="text-center">{evenement.titre}</H2>
            <Link href={`programmation/${evenement.slug}`} className="relative block w-[300px] h-[424px]">
              <ImageStrapi
                src={evenement.image?.url}
                alt={evenement.titre}
                blurDataUrl={evenement.image?.formats.thumbnail.url}
              />
            </Link>
            {evenement.lien_billeterie && (
              <BoutonLien href={evenement.lien_billeterie}>
                Réserver
              </BoutonLien>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
