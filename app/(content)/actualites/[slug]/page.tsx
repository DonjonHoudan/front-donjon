import { ImageStrapi } from "@/components/imageStrapi";
import { RichTextStrapi } from "@/components/richTextStrapi";
import { H1 } from "@/components/titles";
import { getActualite } from "@/lib/api/resources/actualite";
import { cn } from "@/lib/utils/cn";

type EvenementProps = {
  params: {
    slug: string;
  };
};

export default async function Evenement({ params }: EvenementProps) {
  const data = await getActualite(params.slug);
  console.log("🚀 ~ Evenement ~ data:", data)

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
        <div className="w-[350px] lg:w-[600px]">
          <ImageStrapi
            src={data.image.data.attributes.url}
            alt={data.titre}
            width={525}
            height={525}
            className="w-full rounded"
          />
        </div>
      </div>
    </section>
  );
}
