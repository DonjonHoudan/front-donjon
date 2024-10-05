import { GET, POST } from "../clientStrapi";
import { PageContact, ReponseStrapi, SendMail } from "../types";
import { STRAPI_API_KEY } from "@/lib/constants";

export async function getPageContact(): Promise<PageContact> {
  const resultat = await GET<ReponseStrapi<PageContact>>(`/page-contact`);

  if (resultat.data === undefined) {
    throw new Error("Erreur lors de la récupération de la page contact");
  }

  return resultat.data.attributes;
}

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