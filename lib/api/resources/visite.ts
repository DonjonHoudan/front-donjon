import { PUBLIC_STRAPI_API_KEY } from "@/lib/constants";
import { GET } from "../clientStrapi";
import { PageDonjon } from "./donjon";

export async function getPageVisite(): Promise<PageDonjon | null> {
  const resultat = await GET<PageDonjon>("/page-visite", PUBLIC_STRAPI_API_KEY);

  if (resultat.data === undefined) {
    console.error(
      "Erreur lors de la récupération de la page préparez votre visite",
      resultat
    );
    return null;
  }

  return resultat.data;
}
