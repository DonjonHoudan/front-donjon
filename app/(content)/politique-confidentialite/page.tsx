import { Metadata } from "next";
import { RichTextStrapi } from "@/components/richTextStrapi";
import { H1 } from "@/components/titles";
import Loading from "@/app/loading";
import { getPagePolitique } from "@/lib/api/resources/politique";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Politique de confidentialité | Le Donjon de Houdan",
  description: "Politique de confidentialité du Donjon de Houdan.",
};

export default async function PolitiqueConfidentialite() {
  const data = await getPagePolitique();

  if (!data) {
    return <Loading />;
  }

  return (
    <section className="lg:mt-[-200px] lg:pt-[200px]">
      <H1 className="my-[50px] text-center">{data.titre}</H1>
      <div className="px-[20px] lg:px-[20vw] lg:mb-[50px]">
        <RichTextStrapi content={data.contenu} />
      </div>
    </section>
  );
}
