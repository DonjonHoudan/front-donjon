import { GET } from "../clientStrapi";
import { ReponseStrapi } from "../types";
import { BlocksContent } from "@strapi/blocks-react-renderer";

export type PageDonjon = {
  titre: string;
  contenu: BlocksContent;
};

export async function getPageDonjon(): Promise<PageDonjon> {
  const resultat = await GET<ReponseStrapi<PageDonjon>>("/page-donjon");

  if (resultat.data === undefined) {
    throw new Error("Erreur lors de la récupération de la page du Donjon");
  }

  return resultat.data.attributes;
}
