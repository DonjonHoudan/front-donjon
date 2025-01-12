import { BlocksContent } from "@strapi/blocks-react-renderer";

export enum RequestType {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export type PageAccueil = {
  article: ArticleV5;
  programmation: ProgrammationV5;
};

export type ClientResponse<T> = {
  data?: T;
  status: number;
  errorMessage?: string;
};

export type Client = <TBodyResponse, TData = any>(
  method: RequestType,
  url: string,
  data?: TData,
  apiKey?: string,
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
  id: number;
  titre: string;
  contenu: BlocksContent;
  slug: string;
  image: Image;
};

export type Programmation = {
  titre: string;
  slug: string;
  lien_billeterie: string;
  lien_youtube: string;
  descriptif: BlocksContent;
  image: {
    data: ReponseStrapi<Image>;
  };
};

export type ProgrammationV5 = {
  id: number;
  titre: string;
  slug: string;
  lien_billeterie: string;
  lien_youtube: string;
  descriptif: BlocksContent;
  image: Image;
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
