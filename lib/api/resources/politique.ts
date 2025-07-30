import { PUBLIC_STRAPI_API_KEY } from "@/lib/constants";
import { GET } from "../clientStrapi";
import { BlocksContent } from "@strapi/blocks-react-renderer";

export type PagePolitique = {
  titre: string;
  contenu: BlocksContent;
};

export async function getPagePolitique(): Promise<PagePolitique | null> {
  const resultat = await GET<PagePolitique>("/politique", PUBLIC_STRAPI_API_KEY);

  if (resultat.data === undefined) {
    console.error(
      "Erreur lors de la récupération de la page de la politique de confidentialité",
      resultat
    );
    return null;
  }

  return resultat.data;
}
