import Image from "next/image";
import { STRAPI_IMAGE } from "@/lib/constants";

type ImageStrapiProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  overrideSrc?: string;
  className?: string;
};

export const ImageStrapi = ({
  src,
  alt,
  width,
  height,
  sizes,
  overrideSrc,
  className,
}: ImageStrapiProps) => {
  return (
    <Image
      src={getStrapiMedia(src)}
      alt={alt}
      fill={true}
      width={width}
      height={height}
      sizes={sizes}
      overrideSrc={overrideSrc}
      className={className}
    />
  );
};

const getStrapiMedia = (url: string) => {
  return decodeURIComponent(`${STRAPI_IMAGE}${url}`);
};
