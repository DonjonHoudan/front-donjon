import { Metadata } from "next";
import { ImageStrapi } from "@/components/imageStrapi";
import { RichTextStrapi } from "@/components/richTextStrapi";
import { H1 } from "@/components/titles";
import { getActualite } from "@/lib/api/resources/actualite";
import { cn } from "@/lib/utils/cn";
import Loading from "@/app/loading";

type EvenementProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: EvenementProps): Promise<Metadata> {
  const params = await props.params;
  const data = await getActualite(params.slug);

  return {
    title: data?.titre,
    description: data?.titre,
  }
}

export default async function Evenement(props: EvenementProps) {
  const params = await props.params;
  const data = await getActualite(params.slug);

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
        <RichTextStrapi content={data.contenu} />
        <div className="relative block w-[350px] h-[494px] lg:w-[600px] lg:h-[848px]">
          <ImageStrapi
            src={data.image?.url}
            alt={data.titre}
            className="rounded"
            blurDataUrl={data.image?.formats.thumbnail.url}
          />
        </div>
      </div>
    </section>
  );
}
