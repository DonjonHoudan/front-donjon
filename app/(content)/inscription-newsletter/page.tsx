import { Metadata } from "next";
import { RichTextStrapi } from "@/components/richTextStrapi";
import { H1 } from "@/components/titles";
import Loading from "@/app/loading";
import { getPageNewsletter } from "@/lib/api/resources/newsletter";
import { AbonnementForm } from "./_components/abonnement-form";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Inscription newsletter | Le Donjon de Houdan",
  description: "Inscription à la newsletter du Donjon de Houdan.",
};

export default async function InscriptionNewsletter() {
  const data = await getPageNewsletter();

  if (!data) {
    return <Loading />;
  }

  return (
    <section className="lg:mt-[-200px] lg:pt-[200px]">
      <H1 className="my-[50px] text-center">{data.titre}</H1>
      <div className="px-[20px] lg:px-[20vw]">
        <RichTextStrapi content={data.contenu} />
      </div>
      <div className="flex justify-center lg:mb-[50px]">
        <AbonnementForm />
      </div>
    </section>
  );
}
