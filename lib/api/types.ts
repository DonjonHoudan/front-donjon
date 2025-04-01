import { BlocksContent } from "@strapi/blocks-react-renderer";

export enum RequestType {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

export type PageAccueil = {
  article: Article;
  programmation: Programmation;
};

export type ClientResponse<T> = {
  data?: T;
  status: number;
  errorMessage?: string;
  headers?: Headers;
};

export type Client = <TBodyResponse, TData = any>(
  method: RequestType,
  url: string,
  data?: TData,
  headers?: HeadersInit,
) => Promise<ClientResponse<TBodyResponse>>;

export type ReponseStrapi<T> = {
  data: T;
};

export type Article = {
  id: number;
  titre: string;
  contenu: BlocksContent;
  slug: string;
  image: Image;
};

export type Programmation = {
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

export type Configuration = {
  nom_site: string;
  description_site: string;
  background: Image;
  background_navbar: Image;
}
