import { PUBLIC_STRAPI_API_KEY } from "@/lib/constants";
import { GET } from "../clientStrapi";
import { BlocksContent } from "@strapi/blocks-react-renderer";

export type PageMentions = {
  titre: string;
  contenu: BlocksContent;
};

export async function getPageMentions(): Promise<PageMentions | null> {
  const resultat = await GET<PageMentions>("/mention", PUBLIC_STRAPI_API_KEY);

  if (resultat.data === undefined) {
    console.error(
      "Erreur lors de la récupération de la page des mentions légales",
      resultat
    );
    return null;
  }

  return resultat.data;
}
