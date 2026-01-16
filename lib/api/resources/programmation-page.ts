import { PUBLIC_STRAPI_API_KEY } from "@/lib/constants";
import { GET } from "../clientStrapi";
import { Image } from "../types";

type PageProgrammation = {
  recrutement?: Image;
}

export async function getPageProgrammation(): Promise<PageProgrammation | null> {
  const resultat = await GET<PageProgrammation>(
    `/page-programmation?populate=*`,
    PUBLIC_STRAPI_API_KEY
  );

  if (resultat.data === undefined) {
    console.error("Erreur lors de la récupération de la page programmation", resultat);
    return null;
  }

  return resultat.data;
}
