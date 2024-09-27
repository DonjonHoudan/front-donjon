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

export type Client = <TBodyResponse>(
  method: AxiosRequestType,
  url: string
) => Promise<ClientResponse<TBodyResponse>>;

export type ReponseStrapi<T> = {
  id: number;
  attributes: T;
};

export type PageAccueil = {
  article: {
    data: ReponseStrapi<Article>;
  };
};

export type PageDonjon = {
  titre: string;
  contenu: BlocksContent;
};

export type PageProgrammation = {
  id: number;
  attributes: {
    titre: string;
    slug: string;
    lien_billeterie: string;
    descriptif: BlocksContent;
    image: {
      data: ReponseStrapi<Image>;
    };
    image_video_secondaire: {
      data: ReponseStrapi<Image>;
    }
  };
};

export type Article = {
  titre: string;
  contenu: string;
  image: {
    data: ReponseStrapi<Image>;
  };
  lien?: string;
};

export type Image = {
  url: string;
};
