import { Metadata } from "next";
import Link from "next/link";
import { BoutonLien } from "@/components/boutonLien";
import { Card } from "@/components/card";
import { ImageStrapi } from "@/components/imageStrapi";
import { H1, H2 } from "@/components/titles";
import { getProgrammation } from "@/lib/api/resources/programmations";
import { cn } from "@/lib/utils/cn";
import { getPageProgrammation } from "@/lib/api/resources/programmation-page";
import { Programmation } from "@/lib/api/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Programmation | Le Donjon de Houdan",
  description:
    "Découvrez toutes la programmation proposée par le Donjon de Houdan.",
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatEventDate(event: Programmation): string | null {
  if (!event.date_debut && !event.date_fin) return null;
  const debut = event.date_debut
    ? dateFormatter.format(new Date(event.date_debut))
    : null;
  const fin = event.date_fin
    ? dateFormatter.format(new Date(event.date_fin))
    : null;
  if (debut && fin) {
    if (event.date_debut === event.date_fin) return `Le ${debut}`;
    return `Du ${debut} au ${fin}`;
  }
  if (debut) return `À partir du ${debut}`;
  return `Jusqu'au ${fin}`;
}

function getEventStatus(
  event: Programmation
): "en_cours" | "a_venir" | "autre" {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const debut = event.date_debut ? new Date(event.date_debut) : null;
  const fin = event.date_fin ? new Date(event.date_fin) : null;

  if (!debut && !fin) return "autre";
  if (debut && debut > now) return "a_venir";
  if (fin && fin < now) return "autre";
  return "en_cours";
}

export default async function ProgrammationPage() {
  const data = await getProgrammation();
  const recrutement = await getPageProgrammation();

  const enCours = data
    .filter((e) => getEventStatus(e) === "en_cours")
    .sort(
      (a, b) =>
        new Date(a.date_fin ?? "9999").getTime() -
        new Date(b.date_fin ?? "9999").getTime()
    );

  const aVenir = data
    .filter((e) => getEventStatus(e) === "a_venir")
    .sort(
      (a, b) =>
        new Date(a.date_debut ?? "").getTime() -
        new Date(b.date_debut ?? "").getTime()
    );

  const autres = data.filter((e) => getEventStatus(e) === "autre");

  const sorted = [...enCours, ...aVenir, ...autres];

  return (
    <section className="lg:mt-[-200px] lg:pt-[200px]">
      <H1 className="my-[50px] text-center">Programmation</H1>
      <div
        className={cn(
          "flex flex-wrap justify-around gap-[30px]",
          "lg:px-[20vh] lg:mb-[50px]"
        )}
      >
        {sorted.map((evenement) => {
          const datePeriode = formatEventDate(evenement);
          const estPasse = getEventStatus(evenement) === "autre";
          return (
            <Card
              key={evenement.id}
              className="flex flex-col items-center gap-y-[20px] w-[90vw] lg:w-[400px]"
            >
              <H2 className="text-center">{evenement.titre}</H2>
              {datePeriode && (
                <p className="text-sm text-gray-500 text-center -mt-3">
                  {datePeriode}
                </p>
              )}
              <Link
                href={`programmation/${evenement.slug}`}
                className="relative block w-[300px] h-[424px]"
              >
                <ImageStrapi
                  src={evenement.image?.url}
                  alt={evenement.titre}
                  blurDataUrl={evenement.image?.formats.thumbnail.url}
                  className={estPasse ? "grayscale" : undefined}
                />
              </Link>
              {evenement.lien_billeterie && (
                <BoutonLien href={evenement.lien_billeterie}>Réserver</BoutonLien>
              )}
            </Card>
          );
        })}
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
