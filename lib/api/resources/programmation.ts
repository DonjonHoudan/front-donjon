import { GET } from "../clientStrapi";
import { PageProgrammation } from "../types";


export async function getProgrammation(slug: string): Promise<PageProgrammation> {
  const resultat = await GET<PageProgrammation[]>(`/programmations?filters[slug][$eq]=${slug}&populate[image][populate]=image`);

  if (resultat.data === undefined) {
    throw new Error("Erreur lors de la récupération de la page programmation");
  }

  return resultat.data[0];
}
