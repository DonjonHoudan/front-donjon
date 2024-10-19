import Link from "next/link";
import { redirect } from "next/navigation";
import { BoutonLien } from "@/components/boutonLien";
import { Card } from "@/components/card";
import { ImageStrapi } from "@/components/imageStrapi";
import { H1, H2 } from "@/components/titles";
import { getPageActualites } from "@/lib/api/resources/actualites";
import { cn } from "@/lib/utils/cn";

export default async function Actualites() {
  const data = await getPageActualites();

  if (!data) {
    redirect("/");
  }

  return (
    <section className="min-h-screen lg:mt-[-200px] lg:pt-[200px]">
      <H1 className="my-[50px] text-center">Actualités</H1>
      <div
        className={cn(
          "flex flex-wrap justify-around px-[10px] mb-[130px] gap-[30px]",
          "lg:px-[20vh] lg:mb-[50px]"
        )}
      >
        {data.articles.data.map((evenement) => (
          <Card
            key={evenement.id}
            className="flex flex-col items-center gap-y-[20px] w-[400px]"
          >
            <H2 className="text-center">{evenement.attributes.titre}</H2>
            {evenement.attributes.programmation.data ? (
              <>
                <Link
                  href={`programmation/${evenement.attributes.slug}`}
                  className="relative block w-[300px] h-[424px]"
                >
                  <ImageStrapi
                    src={evenement.attributes.image.data.attributes.url}
                    alt={evenement.attributes.titre}
                  />
                </Link>
                {evenement.attributes.programmation.data.attributes
                  .lien_billeterie && (
                  <BoutonLien
                    href={
                      evenement.attributes.programmation.data.attributes
                        .lien_billeterie
                    }
                  >
                    Réserver
                  </BoutonLien>
                )}
              </>
            ) : (
              <Link
                href={`actualites/${evenement.attributes.slug}`}
                className="relative block w-[300px] h-[424px]"
              >
                <ImageStrapi
                  src={evenement.attributes.image.data.attributes.url}
                  alt={evenement.attributes.titre}
                  blurDataUrl={evenement.attributes.image.data.attributes.formats.thumbnail.url}
                />
              </Link>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
