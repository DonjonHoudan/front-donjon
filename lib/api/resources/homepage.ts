import { GET } from "../clientStrapiFetch";
import { ArticleV5, PageAccueil } from "../types";

export async function getHomePage(): Promise<PageAccueil|null> {
  const resultat = await GET<PageAccueil>("/home-page?populate[article][populate]=image&populate[programmation][populate]=image", "v5");

  if (resultat.data === undefined) {
    console.error("Erreur lors de la récupération de la page d'accueil", resultat); 
    return null;
  }

  return resultat.data;
}
