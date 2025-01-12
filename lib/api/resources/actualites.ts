import { GET } from "../clientStrapiFetch";
import { Article, ArticleV5, ReponseStrapi } from "../types";

type PageActualites = {
  articles: ReponseStrapi<Article>[];
};

export async function getPageActualites(): Promise<ArticleV5[]> {
  const resultat = await GET<ArticleV5[]>("/articles?populate=*", "v5");
  console.log("🚀 ~ getPageActualites ~ resultat:", resultat)

  if (resultat.data === undefined) {
    console.error("Erreur lors de la récupération de la page actualités", resultat);
    return [];
  }

  return resultat.data;
}
