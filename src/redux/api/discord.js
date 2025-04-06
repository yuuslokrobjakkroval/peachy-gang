import { emptySplitApi } from ".";
const discord_api_endpoint = "https://discord.com/api/v10";

const discord = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserInfo: builder.query({
      query: () => ({
        url: `${discord_api_endpoint}/users/@me`,
        method: "GET",
      }),
      providesTags: [{ type: "USER", id: "ME" }],
    }),
    fetchUserInfoById: builder.query({
      query: ({ userId, botToken }) => ({
        url: `/users/${userId}`,
        method: "GET",
        headers: {
          Authorization: `Bot ${botToken}`,
        },
      }),
      providesTags: (result, error, arg) => [{ type: "USER", id: arg.userId }],
    }),
    getGuild: builder.query({
      query: ({ accessToken, id }) => ({
        url: `/guilds/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: (result, error, arg) => [{ type: "GUILD", id: arg.id }],
    }),
    getGuilds: builder.query({
      query: (accessToken) => ({
        url: `/users/@me/guilds`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      providesTags: [{ type: "GUILDS", id: "LIST" }],
    }),
    iconUrl: builder.query({
      queryFn: (guild) => {
        const url = guild?.icon?.startsWith("a")
          ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.gif`
          : `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
        return { data: url };
      },
    }),
    avatarUrl: builder.query({
      queryFn: (user) => {
        const url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=512`;
        return { data: url };
      },
    }),
    bannerUrl: builder.query({
      queryFn: ({ id, banner }) => {
        const url = banner?.startsWith("a")
          ? `https://cdn.discordapp.com/banners/${id}/${banner}.gif?size=1024`
          : `https://cdn.discordapp.com/banners/${id}/${banner}.png?size=1024`;
        return { data: url };
      },
    }),
    emojiUrl: builder.query({
      queryFn: (emoji) => {
        const url = emoji?.identifier?.startsWith("a")
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
