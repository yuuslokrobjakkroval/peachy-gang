import { authClient } from "@/lib/auth-client";
import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const axiosBaseQuery =
  () =>
  async ({ url, method, body, params }) => {
    const storedAccount = localStorage.getItem("account");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(storedAccount).accessToken}`,
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

const dynamicTagTypes = [
  "AUTH",
  "USER",
  "GUILD",
  "GUILDS",
  "FEATURE",
  "LEVELING",
  "MESSAGE",
  "MEMBER",
  "INVITE",
  "CHANNELS",
  "ROLES",
  "EMOJIS",
  "AUTORESPONSE",
  "GIVEAWAYS",
  "YOUTUBE_VIDEOS",
  "YOUTUBE_CHANNEL",
  "PAYMENT",
];

export const emptySplitApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: "" }),
  tagTypes: dynamicTagTypes,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 5,
  refetchOnMountOrArgChange: 5,
  endpoints: () => ({}),
});
