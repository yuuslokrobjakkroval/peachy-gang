import { emptySplitApi } from ".";
import { API_ENDPOINT } from "@/utils/auth/server";

const discord = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserInfo: builder.query({
      query: () => ({
        url: `${API_ENDPOINT}/users/@me`,
        method: "GET",
      }),
      providesTags: [{ type: "USER", id: "ME" }],
    }),
    getGuilds: builder.query({
      query: () => ({
        url: `${API_ENDPOINT}/users/@me/guilds`,
        method: "GET",
      }),
      providesTags: [{ type: "GUILDS", id: "LIST" }],
    }),
    fetchUserInfoById: builder.query({
      query: (userId) => ({
        url: `${API_ENDPOINT}/users/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "USER", id: arg.userId }],
    }),
  }),
});

export const { useFetchUserInfoQuery, useGetGuildsQuery } = discord;
