import { GET } from "../clientStrapi";
import { Article, ReponseStrapi } from "../types";


export async function getActualite(slug: string): Promise<Article|null> {
  const resultat = await GET<ReponseStrapi<Article>[]>(`/articles?filters[slug][$eq]=${slug}&populate=image`);

  if (resultat.data === undefined) {
    console.error("Erreur lors de la récupération de l'actualité");
    return null;
  }

  return resultat.data[0].attributes;
}
