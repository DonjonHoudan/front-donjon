import { PUBLIC_STRAPI_API_KEY } from "@/lib/constants";
import { GET, POST } from "../clientStrapi";
import { BlocksContent } from "@strapi/blocks-react-renderer";

export type PageNewsletter = {
  titre: string;
  contenu: BlocksContent;
};

export async function getPageNewsletter(): Promise<PageNewsletter | null> {
  const resultat = await GET<PageNewsletter>("/pagenewsletter", PUBLIC_STRAPI_API_KEY);

  if (resultat.data === undefined) {
    console.error(
      "Erreur lors de la récupération de la page de la newsletter",
      resultat
    );
    return null;
  }

  return resultat.data;
}

export type Abonnement = {
  data: {
    email: string;
    abonne: boolean;
  };
};

type ReponseAbonnement = {
  status: Number;
  errorMessage?: string;
};

export async function postAbonnement(
  data: Abonnement,
  token: string
): Promise<ReponseAbonnement> {
  if (!token) {
    throw new Error("Clé API STRAPI manquante");
  }

  const resultat = await POST("/newsletters", data, token);

  return {
    status: resultat.status,
    errorMessage: resultat.errorMessage,
  };
}
