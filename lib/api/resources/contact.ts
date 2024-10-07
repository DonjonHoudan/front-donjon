import { GET, POST } from "../clientStrapi";
import { ReponseStrapi } from "../types";
import { STRAPI_API_KEY } from "@/lib/constants";
import { BlocksContent } from "@strapi/blocks-react-renderer";

export type PageContact = {
  contenu: BlocksContent;
};

export async function getPageContact(): Promise<PageContact|null> {
  const resultat = await GET<ReponseStrapi<PageContact>>(`/page-contact`);

  if (resultat.data === undefined) {
    console.error("Erreur lors de la récupération de la page contact");
    return null;
  }

  return resultat.data.attributes;
}

export type SendMail = {
  data: {
    email: string;
    objet: string;
    message: string;
  };
};

export async function postMail(data: SendMail) {
  if (!STRAPI_API_KEY) {
    throw new Error("Clé API STRAPI manquante");
  }
  
  const resultat = await POST("/contacts", data, STRAPI_API_KEY);

  if (resultat.data === undefined) {
    throw new Error("Erreur lors de l'envoi du mail");
  }

  return resultat.data;
}