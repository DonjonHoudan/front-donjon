import { GET } from "../clientStrapi";
import { PageDonjon, ReponseStrapi } from "../types";

export async function getPageDonjon(): Promise<PageDonjon> {
  const resultat = await GET<ReponseStrapi<PageDonjon>>("/page-donjon");

  if (resultat.data === undefined) {
    throw new Error("Erreur lors de la récupération de la page du Donjon");
  }

  return resultat.data.attributes;
}
