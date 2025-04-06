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
        url: `${process.env.NEXT_PUBLIC_API}/users/${userId}`,
        method: "GET",
        baseUrl: API_ENDPOINT,
      }),
      providesTags: (result, error, arg) => [{ type: "USER", id: arg.userId }],
    }),
    getGuildById: builder.query({
      query: (id) => ({
        url: `${process.env.NEXT_PUBLIC_API}/guilds/${id}/me`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "GUILD", id: arg.id }],
    }),
  }),
});

export const {
  useFetchUserInfoQuery,
  useFetchUserInfoByIdQuery,
  useGetGuildsQuery,
  useGetGuildByIdQuery,
} = discord;
