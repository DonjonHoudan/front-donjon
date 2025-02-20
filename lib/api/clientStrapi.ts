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

    return {
      ...(await response.json()),
      next: {
        revalidate: 1,
      },
    };
  } catch (err: any) {
    return {
      status: err.status || 500,
      errorMessage: err.message || "An unexpected error occurred",
    };
  }
};

export async function GET<TBodyResponse>(url: string, apiKey?: string) {
  const headers: HeadersInit = {
    ...headersInit,
    "Authorization": `Bearer ${apiKey}`,
  };

  try {
    return await client<TBodyResponse>(RequestType.GET, url, undefined, headers);
  } catch (err) {
    console.error("GET request failed:", err);
    throw err;
  }
}

export async function POST<TBodyResponse, TPayload>(
  url: string,
  data: TPayload,
  apiKey: string
) {
  const headers: HeadersInit = {
    ...headersInit,
    "Authorization": `Bearer ${apiKey}`,
  };

  try {
    return await client<TBodyResponse>(RequestType.POST, url, data, headers);
  } catch (err) {
    console.error("POST request failed:", err);
    throw err;
  }
}
