import Image from "next/image";
import { getHomePage } from "@/lib/api/resources/homepage";
import { getStrapiMedia } from "@/components/imageStrapi";
import { cn } from "@/lib/utils/cn";
import { getConfiguration } from "@/lib/api/resources/configuration";
import CarouselEvenement from "./_components/carousel";

export const revalidate = 3600;

export default async function Home() {
  const data = await getHomePage();
  const configuration = await getConfiguration();
  const background = configuration?.background
    ? getStrapiMedia(configuration.background.url)
    : "/donjon.jpg";

  return (
    <section className="relative h-[calc(100vh-75px)]">
      <div className="absolute top-0 lg:top-[-75px] left-0 h-full w-full">
        <Image
          src={background}
          alt="Donjon de Houdan"
          width={1960}
          height={1000}
          className="w-full h-[100vh] object-cover"
        />
      </div>
      <div
        className={cn(
          "absolute top-[15vh] w-[100vw] object-cover z-10",
          "lg:top-[5vh] lg:w-[450px] md:right-[10vw]"
        )}
      >
        <div className="w-[100vw] lg:max-w-[500px]">
          <CarouselEvenement evenements={data} />
        </div>
      </div>
    </section>
  );
}
