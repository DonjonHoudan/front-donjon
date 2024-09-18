import axios from "axios";
import { Client, AxiosRequestType } from "@/lib/api/types";
import { STRAPI_URL } from "@/lib/constants";

const client: Client = async (
  method = AxiosRequestType.GET,
  url = "",
) => {
  const axiosInstance = axios.create({
    baseURL: STRAPI_URL,
  });

  try {
    const res = await axiosInstance({
      method,
      url,
    });

    return res.data;
  } catch (err: any) {
    return {
      statusWIP: err,
      status: err.response?.status,
      errorMessage: err.response?.data.errorMessage,
    };
  }
};

export function GET<TBodyResponse>(url: string) {
  return client<TBodyResponse>(AxiosRequestType.GET, url);
}
