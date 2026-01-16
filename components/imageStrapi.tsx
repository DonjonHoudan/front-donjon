import Image from "next/image";
import { STRAPI_IMAGE } from "@/lib/constants";

type ImageStrapiProps = {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  overrideSrc?: string;
  className?: string;
  blurDataUrl?: string;
  fill?: boolean;
};

export const ImageStrapi = ({
  src,
  alt,
  width,
  height,
  sizes,
  overrideSrc,
  className,
  blurDataUrl,
  fill = true,
}: ImageStrapiProps) => {
  return (
    <Image
      src={src ? getStrapiMedia(src) : "/logo-donjon.png"}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      overrideSrc={overrideSrc}
      className={className}
      placeholder="blur"
      blurDataURL={getStrapiMedia(blurDataUrl || "")}
    />
  );
};

export const getStrapiMedia = (url: string) => {
  return decodeURIComponent(`${STRAPI_IMAGE}${url}`);
};
