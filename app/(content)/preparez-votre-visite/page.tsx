import { redirect } from "next/navigation";
import { RichTextStrapi } from "@/components/richTextStrapi";
import { H1 } from "@/components/titles";
import { getPageVisite } from "@/lib/api/resources/visite";

export default async function PreparezVotreVisite() {
  const data = await getPageVisite();

  if (!data) {
    redirect("/");
  }

  return (
    <section className="min-h-screen mb-[120px] lg:mt-[-200px] lg:mb-0 lg:pt-[200px]">
      <H1 className="py-[50px] text-center">{data.titre}</H1>
      <div className="px-[20px] mb-[130px] lg:px-[20vw] lg:mb-[50px]">
        <RichTextStrapi content={data.contenu} />
      </div>
    </section>
  );
}
