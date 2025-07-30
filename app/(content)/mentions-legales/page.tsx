import { Metadata } from "next";
import { RichTextStrapi } from "@/components/richTextStrapi";
import { H1 } from "@/components/titles";
import Loading from "@/app/loading";
import { getPageMentions } from "@/lib/api/resources/mentions";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Mentions légales | Le Donjon de Houdan",
  description: "Mentions légales du Donjon de Houdan.",
};

export default async function MentionsLegales() {
  const data = await getPageMentions();

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
