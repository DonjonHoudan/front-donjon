import { Metadata } from "next";
import { RichTextStrapi } from "@/components/richTextStrapi";
import { H1 } from "@/components/titles";
import { getPageDonjon } from "@/lib/api/resources/donjon";
import Loading from "@/app/loading";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Histoire | Le Donjon de Houdan",
  description: "Découvrez l'histoire du Donjon de Houdan du 12ème siècle à nos jours.",
};

export default async function LeDonjon() {
  const data = await getPageDonjon();

  if (!data) {
    return <Loading />;
  }

  return (
    <section className="min-h-screen lg:mt-[-200px] lg:pt-[200px]">
      <H1 className="my-[50px] text-center">{data.titre}</H1>
      <div className="px-[20px] mb-[130px] lg:px-[20vw] lg:mb-[50px]">
        <RichTextStrapi content={data.contenu} />
      </div>
    </section>
  );
}
