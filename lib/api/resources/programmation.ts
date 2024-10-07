import { GET } from "../clientStrapi";
import { PageProgrammation } from "./programmations";

export async function getProgrammation(slug: string): Promise<PageProgrammation|null> {
  const resultat = await GET<PageProgrammation[]>(`/programmations?filters[slug][$eq]=${slug}&populate[image][populate]=image`);

  if (resultat.data === undefined) {
    console.error("Erreur lors de la récupération de l'évènement");
    return null;
  }

  return resultat.data[0];
}
