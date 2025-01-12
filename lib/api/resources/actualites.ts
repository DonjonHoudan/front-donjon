import { GET } from "../clientStrapi";
import { Article } from "../types";

export async function getPageActualites(): Promise<Article[]> {
  const resultat = await GET<Article[]>("/articles?populate=*&sort=createdAt:desc");

  if (resultat.data === undefined) {
    console.error(
      "Erreur lors de la récupération de la page actualités",
      resultat
    );
    return [];
  }

  return resultat.data;
}
