import { Metadata } from "next";
import { BoutonLien } from "@/components/boutonLien";
import { ImageStrapi } from "@/components/imageStrapi";
import { RichTextStrapi } from "@/components/richTextStrapi";
import { H1 } from "@/components/titles";
import { getProgrammation } from "@/lib/api/resources/programmation";
import { cn } from "@/lib/utils/cn";
import Loading from "@/app/loading";
import { IframeYoutube } from "./_components/iframe";

type EvenementProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: EvenementProps,
): Promise<Metadata> {
  const data = await getProgrammation(params.slug);
 
  return {
    title: data?.titre,
    description: data?.titre,
  }
}

export default async function Evenement({ params }: EvenementProps) {
  const data = await getProgrammation(params.slug);

  if (!data) {
    return <Loading />;
  }

  return (
    <section>
      <H1 className="my-[50px] text-center">{data.titre}</H1>
      <div
        className={cn(
          "flex flex-col items-center px-[10px] gap-[30px] mb-[130px]",
          "lg:px-[20vh] lg:mb-[50px]"
        )}
      >
        <RichTextStrapi content={data.descriptif} />
        {data.lien_billeterie && (
          <BoutonLien href={data.lien_billeterie}>
            Réserver
          </BoutonLien>
        )}
        <div className="relative block w-[350px] h-[494px] lg:w-[600px] lg:h-[848px]">
          <ImageStrapi
            src={data.image.url}
            alt={data.titre}
            className="rounded"
            blurDataUrl={data.image.formats.thumbnail.url}
          />
        </div>
        <IframeYoutube iframe={data.lien_youtube} />
      </div>
    </section>
  );
}
