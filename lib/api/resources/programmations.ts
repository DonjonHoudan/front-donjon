import { GET } from "../clientStrapiFetch";
import { Programmation, ProgrammationV5 } from "../types";

export type PageProgrammation = {
  id: number;
  attributes: Programmation;
};

export async function getPageProgrammation(): Promise<ProgrammationV5[]> {
  const resultat = await GET<ProgrammationV5[]>(
    "/programmations?populate=*",
    "v5"
  );

  if (resultat.data === undefined) {
    console.error("Erreur lors de la récupération de la page programmation", resultat);
    return [];
  }

  return resultat.data;
}
