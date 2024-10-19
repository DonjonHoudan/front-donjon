import { redirect } from "next/navigation";
import { BoutonLien } from "@/components/boutonLien";
import { ImageStrapi } from "@/components/imageStrapi";
import { RichTextStrapi } from "@/components/richTextStrapi";
import { H1 } from "@/components/titles";
import { getProgrammation } from "@/lib/api/resources/programmation";
import { cn } from "@/lib/utils/cn";

type EvenementProps = {
  params: {
    slug: string;
  };
};

export default async function Evenement({ params }: EvenementProps) {
  const data = await getProgrammation(params.slug);

  if (!data) {
    redirect("/");
  }

  return (
    <section>
      <H1 className="my-[50px] text-center">{data.attributes.titre}</H1>
      <div
        className={cn(
          "flex flex-col items-center px-[10px] gap-[30px] mb-[130px]",
          "lg:px-[20vh] lg:mb-[50px]"
        )}
      >
        <RichTextStrapi content={data.attributes.descriptif} />
        {data.attributes.lien_billeterie && (
          <BoutonLien href={data.attributes.lien_billeterie}>
            Réserver
          </BoutonLien>
        )}
        <div className="relative block w-[350px] h-[494px] lg:w-[600px] lg:h-[848px]">
          <ImageStrapi
            src={data.attributes.image.data.attributes.url}
            alt={data.attributes.titre}
            className="rounded"
            blurDataUrl={data.attributes.image.data.attributes.formats.thumbnail.url}
          />
        </div>
      </div>
    </section>
  );
}
