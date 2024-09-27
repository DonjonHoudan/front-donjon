import { BoutonLien } from "@/components/boutonLien";
import { Card } from "@/components/card";
import { ImageStrapi } from "@/components/imageStrapi";
import { H1, H2 } from "@/components/titles";
import { getPageProgrammation } from "@/lib/api/resources/programmation";
import Link from "next/link";

export default async function Programmation() {
  const data = await getPageProgrammation();

  return (
    <section>
      <H1 className="my-[50px] text-center">Programmation</H1>
      <div className="flex flex-wrap justify-around px-[20vh] mb-[50px] gap-[30px]">
        {data.map((evenement) => (
          <Card
            key={evenement.id}
            className="flex flex-col items-center justify-between gap-y-[20px] w-[400px]"
          >
            <H2 className="text-center">{evenement.attributes.titre}</H2>
            <Link href={`programmation/${evenement.attributes.slug}`}>
              <ImageStrapi
                src={evenement.attributes.image.data.attributes.url}
                alt={evenement.attributes.titre}
                width={300}
                height={300}
                className="h-[300px] w-[300px]"
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
