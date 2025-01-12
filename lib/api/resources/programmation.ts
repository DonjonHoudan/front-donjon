import { GET } from "../clientStrapi";
import { ProgrammationV5 } from "../types";

export async function getProgrammation(
  slug: string
): Promise<ProgrammationV5 | null> {
  const resultat = await GET<ProgrammationV5[]>(
    `/programmations?filters[slug][$eq]=${slug}&populate=*`
  );

  if (resultat.data === undefined) {
    console.error("Erreur lors de la récupération de l'évènement", resultat);
    return null;
  }

  return resultat.data[0];
}
