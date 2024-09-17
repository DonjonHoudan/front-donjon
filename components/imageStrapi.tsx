import Image from "next/image";
import { STRAPI_IMAGE } from "@/lib/constants";

type ImageStrapiProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export const ImageStrapi = ({
  src,
  alt,
  width,
  height,
  className,
}: ImageStrapiProps) => {
  return (
    <Image
      src={getStrapiMedia(src)}
      alt={alt}
      width={width}
      height={height}
      className={className}
      layout="responsive"
    />
  );
};

const getStrapiMedia = (url: string) => {
  return `${STRAPI_IMAGE}${url}`;
};
