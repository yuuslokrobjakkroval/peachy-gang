import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const axiosBaseQuery =
  ({ defaultBaseUrl } = { defaultBaseUrl: "" }) =>
  async ({ url, method, body, params, baseUrl, customHeaders }) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;

    const headers = {
      "Content-Type": "application/json",
      ...(token && !customHeaders?.Authorization
        ? { Authorization: `Bearer ${token}` }
        : {}),
      ...(customHeaders || {}),
    };
    const resolvedBaseUrl = baseUrl || defaultBaseUrl;

    try {
      const result = await axios({
        headers,
        url: resolvedBaseUrl + url,
        method,
        data: body,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          message: err.response?.data?.message || err.message,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const emptySplitApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ defaultBaseUrl: "/api/" }),
  tagTypes: ["AUTH", "USER", "GUILD", "GUILDS"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 5,
  refetchOnMountOrArgChange: 5,
  endpoints: () => ({}),
});
