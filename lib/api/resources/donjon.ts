import { GET } from "../clientStrapiFetch";
import { ReponseStrapi } from "../types";
import { BlocksContent } from "@strapi/blocks-react-renderer";

export type PageDonjon = {
  titre: string;
  contenu: BlocksContent;
};

export async function getPageDonjon(): Promise<PageDonjon|null> {
  const resultat = await GET<ReponseStrapi<PageDonjon>>("/page-donjon");

  if (resultat.data === undefined) {
    console.error("Erreur lors de la récupération de la page du Donjon", resultat);
    return null;
  }

  return resultat.data.attributes;
}
