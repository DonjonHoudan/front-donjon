import { RichTextStrapi } from "@/components/richTextStrapi";
import { H1 } from "@/components/titles";
import { getPageDonjon } from "@/lib/api/resources/donjon";

export default async function LeDonjon() {
  const data = await getPageDonjon();

  return (
    <section>
      <H1 className="my-[50px] text-center">{data.titre}</H1>
      <div className="px-[20px] mb-[130px] lg:px-[20vw] lg:mb-[50px]">
        <RichTextStrapi content={data.contenu} />
      </div>
    </section>
  );
}
