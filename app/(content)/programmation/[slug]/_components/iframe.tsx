"use client";

type IframeYoutubeProps = {
  iframe?: string;
};

export function IframeYoutube({ iframe }: IframeYoutubeProps) {
  if (!iframe) {
    return null;
  }

  return <div dangerouslySetInnerHTML={{ __html: iframe }} />;
}
