"use client";

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import Image from "next/image";
import { H2 } from "./titles";

type RichTextStrapiProps = {
  content: BlocksContent;
};

export function RichTextStrapi({ content }: RichTextStrapiProps) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        image: ({ image }) => (
          <div className="w-full flex justify-center my-[20px]">
            <Image
              src={image.url}
              alt={image.alternativeText || ""}
              width={350}
              height={350}
              className="rounded-lg"
            />
          </div>
        ),
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return <H2>{children as string}</H2>;
            case 2:
              return <H2>{children as string}</H2>;
            default:
              return <p>{children}</p>;
          }
        },
        paragraph: ({ children }) => (
          <p className="text-justify">{children}</p>
        ),
        list: ({ children }) => (
          <ul className="list-disc list-inside pl-[20px]">{children}</ul>
        ),
      }}
    />
  );
}
