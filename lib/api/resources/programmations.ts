import { GET } from "../clientStrapi";
import { ProgrammationV5 } from "../types";

export async function getPageProgrammation(): Promise<ProgrammationV5[]> {
  const resultat = await GET<ProgrammationV5[]>("/programmations?populate=*");

  if (resultat.data === undefined) {
    console.error(
      "Erreur lors de la récupération de la page programmation",
      resultat
    );
    return [];
  }

  return resultat.data;
}
