import { GET } from "../clientStrapi";
import { PageDonjon, ReponseStrapi } from "../types";

export async function getPageVisite(): Promise<PageDonjon> {
  const resultat = await GET<ReponseStrapi<PageDonjon>>("/page-visite");

  if (resultat.data === undefined) {
    throw new Error("Erreur lors de la récupération de la page préparez votre visite");
  }

  return resultat.data.attributes;
}
