import { GET } from "../clientStrapi";
import { ReponseStrapi } from "../types";
import { PageDonjon } from "./donjon";

export async function getPageVisite(): Promise<PageDonjon|null> {
  const resultat = await GET<ReponseStrapi<PageDonjon>>("/page-visite");

  if (resultat.data === undefined) {
    console.error("Erreur lors de la récupération de la page préparez votre visite");
    return null;
  }

  return resultat.data.attributes;
}
