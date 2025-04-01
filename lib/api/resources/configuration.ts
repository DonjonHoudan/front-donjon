import { PUBLIC_STRAPI_API_KEY } from "@/lib/constants";
import { GET } from "../clientStrapi";
import { Configuration as ConfigurationType } from "@/lib/api/types";

export async function getConfiguration(): Promise<ConfigurationType | null> {
  const resultat = await GET<ConfigurationType>("/configuration-globale?populate=*", PUBLIC_STRAPI_API_KEY);

  if (resultat.data === undefined) {
    console.error(
      "Erreur lors de la récupération de la configuration",
      resultat
    );
    return null;
  }

  return resultat.data;
}
