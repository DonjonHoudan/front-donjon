import { GET } from "../clientStrapi";
import { Article, ReponseStrapi } from "../types";

export type PageActualites = {
  articles: {
    data: ReponseStrapi<Article>[];
  };
};

export async function getPageActualites(): Promise<PageActualites> {
  const resultat = await GET<ReponseStrapi<PageActualites>>("/page-actualite?populate[articles][populate]=image&populate[articles][populate]=programmation");

  if (resultat.data === undefined) {
    throw new Error("Erreur lors de la récupération de la page actualités");
  }

  return resultat.data.attributes;
}
