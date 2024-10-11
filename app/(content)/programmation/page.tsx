import { BoutonLien } from "@/components/boutonLien";
import { Card } from "@/components/card";
import { ImageStrapi } from "@/components/imageStrapi";
import { H1, H2 } from "@/components/titles";
import { getPageProgrammation } from "@/lib/api/resources/programmations";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";

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
            <H2 className="text-center">{evenement.attributes.titre}</H2>
            <Link href={`programmation/${evenement.attributes.slug}`} className="relative block w-[300px] h-[424px]">
              <ImageStrapi
                src={evenement.attributes.image.data.attributes.url}
                alt={evenement.attributes.titre}
              />
            </Link>
            {evenement.attributes.lien_billeterie && (
              <BoutonLien href={evenement.attributes.lien_billeterie}>
                Réserver
              </BoutonLien>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
