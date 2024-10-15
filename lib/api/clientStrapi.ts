import axios from "axios";
import { Client, AxiosRequestType } from "@/lib/api/types";
import { STRAPI_URL } from "@/lib/constants";

const client: Client = async (
  method = AxiosRequestType.GET,
  url = "",
  data = undefined,
  token = undefined,
) => {
  const axiosInstance = axios.create({
    baseURL: STRAPI_URL,
    headers: {
      "Cache-Control": "public, max-age=604800",
      "Strapi-Response-Format": "v4"
    }
  });

  axiosInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  try {
    const res = await axiosInstance({
      method,
      url,
      data,
    });

    return res.data;
  } catch (err: any) {
    return {
      status: err.response?.status,
      errorMessage: err.response?.data.errorMessage,
    };
  }
};

export function GET<TBodyResponse>(url: string) {
  return client<TBodyResponse>(AxiosRequestType.GET, url);
}

export function POST<TBodyResponse, TPayload>(url: string, data: TPayload, apiKey: string) {
  return client<TBodyResponse>(AxiosRequestType.POST, url, data, apiKey);
}
