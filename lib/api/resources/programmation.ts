import { GET } from "../clientStrapi";
import { Programmation } from "../types";

export async function getProgrammation(
  slug: string
): Promise<Programmation | null> {
  const resultat = await GET<Programmation[]>(
    `/programmations?filters[slug][$eq]=${slug}&populate=*`
  );

  if (resultat.data === undefined) {
    console.error("Erreur lors de la récupération de l'évènement", resultat);
    return null;
  }

  return resultat.data[0];
}
