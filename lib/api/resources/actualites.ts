import { GET } from "../clientStrapi";
import { ArticleV5 } from "../types";

export async function getPageActualites(): Promise<ArticleV5[]> {
  const resultat = await GET<ArticleV5[]>("/articles?populate=*");

  if (resultat.data === undefined) {
    console.error(
      "Erreur lors de la récupération de la page actualités",
      resultat
    );
    return [];
  }

  return resultat.data;
}
