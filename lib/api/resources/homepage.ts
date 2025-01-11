import { GET } from "../clientStrapiFetch";
import { ArticleV5 } from "../types";

export type PageAccueil = {
  article: ArticleV5;
};

export async function getHomePage(): Promise<PageAccueil|null> {
  const resultat = await GET<PageAccueil>("/home-page?populate[article][populate]=image&populate[article][populate]=programmation", "v5");

  if (resultat.data === undefined) {
    console.error("Erreur lors de la récupération de la page d'accueil", resultat); 
    return null;
  }

  return resultat.data;
}
