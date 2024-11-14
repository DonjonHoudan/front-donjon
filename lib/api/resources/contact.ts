import { GET, POST } from "../clientStrapiFetch";
import { ReponseStrapi } from "../types";
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

type ReponseMail = {
  status: Number;
  errorMessage?: string;
};

export async function postMail(data: SendMail, token: string): Promise<ReponseMail> {
  if (!token) {
    throw new Error("Clé API STRAPI manquante");
  }
  
  const resultat = await POST("/contacts", data, token);

  return {
    status: resultat.status,
    errorMessage: resultat.errorMessage,
  };
}