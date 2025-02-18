import { GET } from "../clientStrapi";
import { PageAccueil } from "../types";
import { PUBLIC_STRAPI_API_KEY } from "@/lib/constants";

export async function getHomePage(): Promise<PageAccueil | null> {
  const resultat = await GET<PageAccueil>(
    "/home-page?populate[article][populate]=image&populate[programmation][populate]=image",
    PUBLIC_STRAPI_API_KEY
  );

  if (resultat.data === undefined) {
    console.error(
      "Erreur lors de la récupération de la page d'accueil",
      resultat
    );
    return null;
  }

  return resultat.data;
}
