import Image from "next/image";
import Link from "next/link";
import { getHomePage } from "@/lib/api/resources/homepage";
import { ImageStrapi } from "@/components/imageStrapi";
import { cn } from "@/lib/utils/cn";

export default async function Home() {
  const data = await getHomePage();

  return (
    <section className="relative h-[calc(100vh-75px)]">
      <div className="absolute top-0 lg:top-[-75px] left-0 h-full w-full">
        <Image
          src="/donjon.jpg"
          alt="Donjon de Houdan"
          width={1960}
          height={1000}
          className="w-full h-[100vh] object-cover"
        />
      </div>
      <div
        className={cn(
          "absolute top-[15vh] w-[100vw] object-cover z-10",
          "lg:top-[5vh] md:right-[10vw]"
        )}
      >
        {data?.article.data.attributes.slug && (
          <Link href={`actualites/${data.article.data.attributes.slug}`} className="relative flex justify-center w-[350px] h-[500px] lg:w-[450px] lg:h-[636px]">
            <ImageStrapi
              src={data.article.data.attributes.image.data.attributes.url}
              alt="Contenu mis en avant"
              overrideSrc={`
                ${data.article.data.attributes.image.data.attributes.url} 450px,
                ${data.article.data.attributes.image.data.attributes.formats.small.url} 350px
              `}
              className="rounded-xl border border-black drop-shadow-xl"
            />
          </Link>
        )}
      </div>
    </section>
  );
}
