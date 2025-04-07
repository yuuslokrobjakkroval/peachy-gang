import { emptySplitApi } from ".";

const bot = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getGuild: builder.query({
      query: (guild) => ({
        url: `${process.env.NEXT_PUBLIC_API}/guilds/${guild}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "GUILD", id: arg }],
    }),
    getGuildInfo: builder.query({
      query: (guild) => ({
        url: `${process.env.NEXT_PUBLIC_API}/guilds/${guild}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "GUILD", id: arg }],
    }),
    enableFeature: builder.mutation({
      query: ({ guild, feature }) => ({
        url: `${process.env.NEXT_PUBLIC_API}/guilds/${guild}/features/${feature}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "FEATURE", id: `${arg.guild}-${arg.feature}` },
      ],
    }),
    disableFeature: builder.mutation({
      query: ({ guild, feature }) => ({
        url: `${process.env.NEXT_PUBLIC_API}/guilds/${guild}/features/${feature}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "FEATURE", id: `${arg.guild}-${arg.feature}` },
      ],
    }),
    sendMessageFeature: builder.mutation({
      query: ({ guild, feature, userId }) => ({
        url: `${process.env.NEXT_PUBLIC_API}/guilds/${guild}/features/${feature}/send-message`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { guild, feature, userId },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "FEATURE", id: `${arg.guild}-${arg.feature}` },
      ],
    }),
    fetchGuildRoles: builder.query({
      query: (guild) => ({
        url: `${process.env.NEXT_PUBLIC_API}/guilds/${guild}/roles`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "ROLES", id: arg }],
    }),
    fetchGuildChannels: builder.query({
      query: (guild) => ({
        url: `${process.env.NEXT_PUBLIC_API}/guilds/${guild}/channels`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "CHANNELS", id: arg }],
    }),
    fetchGuildEmoji: builder.query({
      query: (guild) => ({
        url: `${process.env.NEXT_PUBLIC_API}/guilds/${guild}/emojis`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "EMOJIS", id: arg }],
    }),
  }),
});

export const {
  useGetGuildQuery,
  useGetGuildInfoQuery,
  useSendMessageFeatureMutation,
  useEnableFeatureMutation,
  useDisableFeatureMutation,
  useFetchGuildRolesQuery,
  useFetchGuildChannelsQuery,
  useFetchGuildEmojiQuery,
} = bot;
