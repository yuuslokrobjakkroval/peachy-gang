import { emptySplitApi } from ".";
import { API_ENDPOINT } from "@/utils/auth/server";

const discord = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserInfo: builder.query({
      query: ({ accessToken }) => ({
        url: "/users/@me",
        method: "GET",
        baseUrl: API_ENDPOINT,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: [{ type: "USER", id: "ME" }],
    }),
    fetchUserInfoById: builder.query({
      query: ({ accessToken, userId }) => ({
        url: `/users/${userId}`,
        method: "GET",
        baseUrl: API_ENDPOINT,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: (result, error, arg) => [{ type: "USER", id: arg.userId }],
    }),
    getGuild: builder.query({
      query: ({ accessToken, id }) => ({
        url: `/guilds/${id}`,
        method: "GET",
        baseUrl: API_ENDPOINT,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: (result, error, arg) => [{ type: "GUILD", id: arg.id }],
    }),
    getGuilds: builder.query({
      query: (accessToken) => ({
        url: "/users/@me/guilds",
        method: "GET",
        baseUrl: API_ENDPOINT,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: [{ type: "GUILDS", id: "LIST" }],
    }),
    iconUrl: builder.query({
      queryFn: (guild, { dispatch, getState }) => {
        if (!guild?.id || !guild?.icon) {
          return {
            error: { status: "CUSTOM_ERROR", message: "Invalid guild data" },
          };
        }
        const url = guild.icon.startsWith("a")
          ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.gif`
          : `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
        return { data: url };
      },
    }),
    avatarUrl: builder.query({
      queryFn: (user, { dispatch, getState }) => {
        if (!user?.id || !user?.avatar) {
          return {
            error: { status: "CUSTOM_ERROR", message: "Invalid user data" },
          };
        }
        const url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=512`;
        return { data: url };
      },
    }),
    bannerUrl: builder.query({
      queryFn: ({ id, banner }, { dispatch, getState }) => {
        if (!id || !banner) {
          return {
            error: { status: "CUSTOM_ERROR", message: "Invalid banner data" },
          };
        }
        const url = banner.startsWith("a")
          ? `https://cdn.discordapp.com/banners/${id}/${banner}.gif?size=1024`
          : `https://cdn.discordapp.com/banners/${id}/${banner}.png?size=1024`;
        return { data: url };
      },
    }),
    emojiUrl: builder.query({
      queryFn: (emoji, { dispatch, getState }) => {
        if (!emoji?.id || !emoji?.identifier) {
          return {
            error: { status: "CUSTOM_ERROR", message: "Invalid emoji data" },
          };
        }
        const url = emoji.identifier.startsWith("a")
          ? `https://cdn.discordapp.com/emojis/${emoji.id}.gif?size=128`
          : `https://cdn.discordapp.com/emojis/${emoji.id}.png?size=128`;
        return { data: url };
      },
    }),
  }),
});

export const {
  useFetchUserInfoQuery,
  useFetchUserInfoByIdQuery,
  useGetGuildQuery,
  useGetGuildsQuery,
  useIconUrlQuery,
  useAvatarUrlQuery,
  useBannerUrlQuery,
  useEmojiUrlQuery,
} = discord;
