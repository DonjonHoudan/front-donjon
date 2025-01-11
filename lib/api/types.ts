import { BlocksContent } from "@strapi/blocks-react-renderer";

export enum AxiosRequestType {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export type ClientResponse<T> = {
  data?: T;
  status: number;
  errorMessage?: string;
};

export type Client = <TBodyResponse, TData = any>(
  method: AxiosRequestType,
  url: string,
  data?: TData,
  apiKey?: string,
  strapiVersion?: string
) => Promise<ClientResponse<TBodyResponse>>;

export type ReponseStrapi<T> = {
  id: number;
  attributes: T;
};

export type ReponseStrapiV5<T> = {
  data: T;
}

export type Article = {
  titre: string;
  contenu: BlocksContent;
  slug: string;
  image: {
    data: ReponseStrapi<Image>;
  };
  programmation: {
    data?: ReponseStrapi<Programmation>;
  };
};

export type ArticleV5 = {
  titre: string;
  contenu: BlocksContent;
  slug: string;
  image: Image;
  programmation: {
    data?: ReponseStrapi<Programmation>;
  };
};

export type Programmation = {
  titre: string;
  slug: string;
  lien_billeterie: string;
  descriptif: BlocksContent;
  image: {
    data: ReponseStrapi<Image>;
  };
  image_video_secondaire: {
    data: ReponseStrapi<Image>;
  };
};

export type Image = {
  url: string;
  formats: {
    small: {
      url: string;
    };
    medium: {
      url: string;
    };
    thumbnail: {
      url: string;
    };
  };
};
