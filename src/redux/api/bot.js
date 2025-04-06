import { emptySplitApi } from ".";

const bot = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getBotApplicationInfo: builder.query({
      query: () => ({
        url: `/me/application`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "BOT", id: "APPLICATION" },
      ],
    }),
    fetchGuildInfo: builder.query({
      query: (guild) => ({
        url: `/guilds/${guild}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "GUILD", id: arg }],
    }),
    sendMessageFeature: builder.mutation({
      query: ({ guild, feature, userId }) => ({
        url: `/guilds/${guild}/features/${feature}/send-message`,
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
    getGuild: builder.query({
      query: (guild) => ({
        url: `/guilds/${guild}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "GUILD", id: arg }],
    }),
    enableFeature: builder.mutation({
      query: ({ guild, feature }) => ({
        url: `/guilds/${guild}/features/${feature}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "FEATURE", id: `${arg.guild}-${arg.feature}` },
      ],
    }),
    disableFeature: builder.mutation({
      query: ({ guild, feature }) => ({
        url: `/guilds/${guild}/features/${feature}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "FEATURE", id: `${arg.guild}-${arg.feature}` },
      ],
    }),
    getChart: builder.query({
      query: () => ({
        url: `/chart/all`,
        method: "GET",
      }),
      providesTags: [{ type: "CHART", id: "ALL" }],
    }),
    getAllGuildChart: builder.query({
      query: () => ({
        url: `/chart/guild/all`,
        method: "GET",
      }),
      providesTags: [{ type: "CHART", id: "GUILD_ALL" }],
    }),
    getGuildChartById: builder.query({
      query: (guild) => ({
        url: `/chart/guild/${guild}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "CHART", id: arg }],
    }),
    fetchGuildRoles: builder.query({
      query: (guild) => ({
        url: `/guilds/${guild}/roles`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "ROLES", id: arg }],
    }),
    fetchGuildChannels: builder.query({
      query: (guild) => ({
        url: `/guilds/${guild}/channels`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "CHANNELS", id: arg }],
    }),
    fetchGuildEmoji: builder.query({
      query: (guild) => ({
        url: `/guilds/${guild}/emojis`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "EMOJIS", id: arg }],
    }),
  }),
});

export const {
  useGetBotApplicationInfoQuery,
  useFetchGuildInfoQuery,
  useSendMessageFeatureMutation,
  useGetGuildQuery,
  useEnableFeatureMutation,
  useDisableFeatureMutation,
  useGetChartQuery,
  useGetAllGuildChartQuery,
  useGetGuildChartByIdQuery,
  useFetchGuildRolesQuery,
  useFetchGuildChannelsQuery,
  useFetchGuildEmojiQuery,
} = bot;
