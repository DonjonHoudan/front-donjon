import { GET } from "../clientStrapiFetch";
import { PageDonjon } from "./donjon";

export async function getPageVisite(): Promise<PageDonjon|null> {
  const resultat = await GET<PageDonjon>("/page-visite", "v5");

  if (resultat.data === undefined) {
    console.error("Erreur lors de la récupération de la page préparez votre visite");
    return null;
  }

  return resultat.data;
}
