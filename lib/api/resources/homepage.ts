import { GET } from "../clientStrapiFetch";
import { Article, ReponseStrapi } from "../types";

export type PageAccueil = {
  article: {
    data: ReponseStrapi<Article>;
  };
};

export async function getHomePage(): Promise<PageAccueil|null> {
  const resultat = await GET<ReponseStrapi<PageAccueil>>("/home-page?populate[article][populate]=image&populate[article][populate]=programmation");

  if (resultat.data === undefined) {
    console.error("Erreur lors de la récupération de la page d'accueil", resultat); 
    return null;
  }

  return resultat.data?.attributes;
}
