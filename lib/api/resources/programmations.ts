import { PUBLIC_STRAPI_API_KEY } from "@/lib/constants";
import { GET } from "../clientStrapi";
import { Programmation } from "../types";

export async function getPageProgrammation(): Promise<Programmation[]> {
  const resultat = await GET<Programmation[]>(
    "/programmations?populate=*&sort=createdAt:desc",
    PUBLIC_STRAPI_API_KEY
  );

  if (resultat.data === undefined) {
    console.error(
      "Erreur lors de la récupération de la page programmation",
      resultat
    );
    return [];
  }

  return resultat.data;
}
