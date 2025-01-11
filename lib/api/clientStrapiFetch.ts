import { Client, AxiosRequestType } from "@/lib/api/types";
import { STRAPI_URL } from "@/lib/constants";

const client: Client = async (
  method = AxiosRequestType.GET,
  url = "",
  data = undefined,
  token = undefined,
  strapiVersion = "v4",
) => {
  const headers: HeadersInit = {
    "Cache-Control": "public, max-age=60, stale-while-revalidate=3600",
    "Content-Type": "application/json",
  };

  if (strapiVersion === "v4") {
    headers["Strapi-Response-Format"] = "v4";
  }

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

export function GET<TBodyResponse>(url: string, strapiVersion?: string) {
  return client<TBodyResponse>(AxiosRequestType.GET, url, undefined, undefined, strapiVersion);
}

export function POST<TBodyResponse, TPayload>(
  url: string,
  data: TPayload,
  apiKey: string,
  strapiVersion?: string
) {
  return client<TBodyResponse>(AxiosRequestType.POST, url, data, apiKey, strapiVersion);
}
