import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { getCookie } from "cookies-next";

const axiosBaseQuery =
  () =>
  async ({ url, method, body, params }) => {
    const tokenCookie = getCookie("ts-token");
    const accessToken = tokenCookie
      ? JSON.parse(tokenCookie).access_token
      : null;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const result = await axios({
        headers,
        url,
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
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  tagTypes: ["AUTH", "USER", "GUILD", "GUILDS"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 5,
  refetchOnMountOrArgChange: 5,
  endpoints: () => ({}),
});
