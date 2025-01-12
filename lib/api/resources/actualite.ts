import { GET } from "../clientStrapi";
import { Article } from "../types";

export async function getActualite(slug: string): Promise<Article | null> {
  const resultat = await GET<Article[]>(
    `/articles?filters[slug][$eq]=${slug}&populate=image`
  );

  if (resultat.data === undefined) {
    console.error("Erreur lors de la récupération de l'actualité", resultat);
    return null;
  }

  return resultat.data[0];
}
