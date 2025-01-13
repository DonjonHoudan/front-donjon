import { Client, RequestType } from "@/lib/api/types";
import { STRAPI_URL } from "@/lib/constants";

const client: Client = async (
  method = RequestType.GET,
  url = "",
  data = undefined,
  token = undefined,
) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    let params: RequestInit = {
      next: {
        revalidate: 86400,
      },
      cache: "no-store",
      method,
      headers,
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
  return client<TBodyResponse>(RequestType.GET, url);
}

export function POST<TBodyResponse, TPayload>(
  url: string,
  data: TPayload,
  apiKey: string,
) {
  return client<TBodyResponse>(RequestType.POST, url, data, apiKey);
}
