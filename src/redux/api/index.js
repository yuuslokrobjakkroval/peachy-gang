import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const axiosBaseQuery =
  () =>
  async ({ url, method, body, params }) => {
    let accessToken = "";

    try {
      const storedAccount = localStorage.getItem("account");
      console.log("Stored account:", storedAccount);
      if (storedAccount) {
        const parsed = JSON.parse(storedAccount);
        accessToken = parsed?.accessToken || "";
      }
    } catch (error) {
      console.error("Failed to parse stored account:", error);
    }

    const headers = {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
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
  "TIMELINE",
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
