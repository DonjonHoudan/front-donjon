import { GET } from "../clientStrapi";
import { Article, ReponseStrapi } from "../types";

type HomePage = {
  article: ReponseStrapi<Article>;
};

export async function getHomePage(): Promise<Article> {
  const resultat = await GET<ReponseStrapi<HomePage>>("/home-page?populate=*");

  if (resultat.data === undefined) {
    throw new Error("Erreur lors de la récupération de la page d'accueil");
  }

  return resultat.data?.data.attributes.article.data.attributes;
}
