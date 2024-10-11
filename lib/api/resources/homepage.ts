import { GET } from "../clientStrapi";
import { Article, ReponseStrapi } from "../types";

export type PageAccueil = {
  article: {
    data: ReponseStrapi<Article>;
  };
};

export async function getHomePage(): Promise<PageAccueil> {
  const resultat = await GET<ReponseStrapi<PageAccueil>>("/home-page?populate[article][populate]=image");

  if (resultat.data === undefined) {
    throw new Error("Erreur lors de la récupération de la page d'accueil");
  }

  return resultat.data?.attributes;
}
