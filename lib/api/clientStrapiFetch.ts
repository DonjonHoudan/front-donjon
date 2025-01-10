import { Client, AxiosRequestType } from "@/lib/api/types";
import { STRAPI_URL } from "@/lib/constants";

const client: Client = async (
  method = AxiosRequestType.GET,
  url = "",
  data = undefined,
  token = undefined,
  maxAge = 60,
  revalidate = 3600
) => {
  const headers: HeadersInit = {
    "Cache-Control": `public, max-age=${maxAge}, stale-while-revalidate=${revalidate}`,
    "Content-Type": "application/json",
    "Strapi-Response-Format": "v4",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    let params: RequestInit = {
      next: {
        revalidate: 3600,
      },
      method,
      headers,
    };

    if (method === AxiosRequestType.POST) {
      params = {
        ...params,
        body: JSON.stringify(data),
      };
    }

    const response = await fetch(`${STRAPI_URL}${url}`, params);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        status: response.status,
        errorMessage: errorData.errorMessage,
      };
    }

    return await response.json();
  } catch (err: any) {
    return {
      status: err.status || 500,
      errorMessage: err.message || "An unexpected error occurred",
    };
  }
};

export function GET<TBodyResponse>(url: string) {
  return client<TBodyResponse>(AxiosRequestType.GET, url);
}

export function POST<TBodyResponse, TPayload>(
  url: string,
  data: TPayload,
  apiKey: string
) {
  return client<TBodyResponse>(AxiosRequestType.POST, url, data, apiKey);
}
