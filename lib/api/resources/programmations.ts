import { GET } from "../clientStrapiFetch";
import { Programmation } from "../types";

export type PageProgrammation = {
  id: number;
  attributes: Programmation;
};

export async function getPageProgrammation(): Promise<PageProgrammation[]> {
  const resultat = await GET<PageProgrammation[]>(
    "/programmations?populate=*"
  );

  if (resultat.data === undefined) {
    console.error("Erreur lors de la récupération de la page programmation", resultat);
    return [];
  }

  return resultat.data;
}
