import { Metadata } from "next";
import Link from "next/link";
import { BoutonLien } from "@/components/boutonLien";
import { Card } from "@/components/card";
import { ImageStrapi } from "@/components/imageStrapi";
import { H1, H2 } from "@/components/titles";
import { getProgrammation } from "@/lib/api/resources/programmations";
import { cn } from "@/lib/utils/cn";
import { getPageProgrammation } from "@/lib/api/resources/programmation-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Programmation | Le Donjon de Houdan",
  description:
    "Découvrez toutes la programmation proposée par le Donjon de Houdan.",
};

export default async function Programmation() {
  const data = await getProgrammation();
  const recrutement = await getPageProgrammation();

  return (
    <section className="lg:mt-[-200px] lg:pt-[200px]">
      <H1 className="my-[50px] text-center">Programmation</H1>
      <div
        className={cn(
          "flex flex-wrap justify-around gap-[30px]",
          "lg:px-[20vh] lg:mb-[50px]"
        )}
      >
        {data.map((evenement) => (
          <Card
            key={evenement.id}
            className="flex flex-col items-center gap-y-[20px] w-[90vw] lg:w-[400px]"
          >
            <H2 className="text-center">{evenement.titre}</H2>
            <Link
              href={`programmation/${evenement.slug}`}
              className="relative block w-[300px] h-[424px]"
            >
              <ImageStrapi
                src={evenement.image?.url}
                alt={evenement.titre}
                blurDataUrl={evenement.image?.formats.thumbnail.url}
              />
            </Link>
            {evenement.lien_billeterie && (
              <BoutonLien href={evenement.lien_billeterie}>Réserver</BoutonLien>
            )}
          </Card>
        ))}
      </div>
      {recrutement?.recrutement && (
        <div className="flex justify-center">
          <Link href="mailto:contact@ledonjondehoudan.fr">
            <ImageStrapi
              src={recrutement.recrutement?.url}
              alt="Recrutement"
              blurDataUrl={recrutement.recrutement?.formats.thumbnail.url}
              width={500}
              height={90}
              fill={false}
              className="rounded-lg"
            />
          </Link>
        </div>
      )}
    </section>
  );
}
