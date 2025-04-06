import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

let token = null;

// Check if the code is running on the client side
if (typeof window !== "undefined") {
  token = localStorage.getItem("jwtToken");
}

const headers = {
  Authorization: token ? `Bearer ${token}` : "",
  "Content-Type": "application/json",
};

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, body, params }) => {
    try {
      const result = await axios({
        headers,
        url: baseUrl + url,
        method,
        data: body,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
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
  tagTypes: ["AUTH", "USER"],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 5,
  refetchOnMountOrArgChange: 5,
  endpoints: () => ({}),
});
