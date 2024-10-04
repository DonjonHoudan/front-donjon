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
  attributes: Programmation;
};

export type PageActualites = {
  articles: {
    data: ReponseStrapi<Article>[];
  };
};

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

type Programmation = {
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
  };
};
