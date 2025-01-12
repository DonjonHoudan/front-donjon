import { GET } from "../clientStrapi";
import { ArticleV5 } from "../types";

export async function getActualite(slug: string): Promise<ArticleV5 | null> {
  const resultat = await GET<ArticleV5[]>(
    `/articles?filters[slug][$eq]=${slug}&populate=image`
  );

  if (resultat.data === undefined) {
    console.error("Erreur lors de la récupération de l'actualité", resultat);
    return null;
  }

  return resultat.data[0];
}
