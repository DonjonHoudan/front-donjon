import { PUBLIC_STRAPI_API_KEY } from "@/lib/constants";
import { GET } from "../clientStrapi";
import { Article } from "../types";

export async function getPageActualites(): Promise<Article[]> {
  const resultat = await GET<Article[]>(
    "/articles?populate=*&sort=createdAt:desc",
    PUBLIC_STRAPI_API_KEY
  );

  if (resultat.data === undefined) {
    console.error(
      "Erreur lors de la récupération de la page actualités",
      resultat
    );
    return [];
  }

  return resultat.data;
}
