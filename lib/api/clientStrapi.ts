import { Client, RequestType } from "@/lib/api/types";
import { STRAPI_URL } from "@/lib/constants";

const headersInit: HeadersInit = {
  "Content-Type": "application/json",
};

const client: Client = async (
  method = RequestType.GET,
  url = "",
  data = undefined,
  headers = headersInit,
) => {
  try {
    let params: RequestInit = {
      method,
      headers,
      next: {
        revalidate: 1,
      },
    };

    if (method === RequestType.POST) {
      params = {
        ...params,
        body: JSON.stringify(data),
      };
    }

    const response = await fetch(`${STRAPI_URL}${url}`, params);

    if (!response.ok) {
      return {
        status: response.status,
        errorMessage: response.statusText,
        headers: headers,
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

export function GET<TBodyResponse>(url: string, apiKey?: string) {
  const headers: HeadersInit = {
    ...headersInit,
    "Authorization": `Bearer ${apiKey}`,
    
  };

  return client<TBodyResponse>(RequestType.GET, url, undefined, headers);
}

export function POST<TBodyResponse, TPayload>(
  url: string,
  data: TPayload,
  apiKey: string
) {
  const headers: HeadersInit = {
    ...headersInit,
    "Authorization": `Bearer ${apiKey}`,
  };

  return client<TBodyResponse>(RequestType.POST, url, data, headers);
}
