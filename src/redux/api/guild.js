import { emptySplitApi } from ".";

const bot = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getGuild: builder.query({
      query: (guild) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${guild}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "GUILD", id: arg }],
    }),
    getGuildInfo: builder.query({
      query: (guild) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${guild}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "GUILD", id: arg }],
    }),
    enableFeature: builder.mutation({
      query: ({ guild, feature }) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${guild}/features/${feature}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "FEATURE", id: `${arg.guild}-${arg.feature}` },
      ],
    }),
    disableFeature: builder.mutation({
      query: ({ guild, feature }) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${guild}/features/${feature}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "FEATURE", id: `${arg.guild}-${arg.feature}` },
      ],
    }),
    getFeature: builder.query({
      query: ({ guild, feature }) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${guild}/features/${feature}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "GUILD", id: arg }],
    }),
    updateFeature: builder.mutation({
      query: (body) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${body.guild}/features/${body.feature}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "FEATURE", id: `${arg.guild}-${arg.feature}` },
      ],
    }),
    deleteSchedule: builder.mutation({
      query: (body) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${body.guild}/features/${body.feature}/${body.scheduleId}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "FEATURE", id: `${arg.guild}-${arg.feature}` },
      ],
    }),
    sendMessageFeature: builder.mutation({
      query: (body) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${body.guild}/features/${body.feature}/send-message`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "FEATURE", id: `${arg.guild}-${arg.feature}` },
      ],
    }),
    getGuildRoles: builder.query({
      query: (guild) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${guild}/roles`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "ROLES", id: arg }],
    }),
    getGuildChannels: builder.query({
      query: (guild) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${guild}/channels`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "CHANNELS", id: arg }],
    }),
    getGuildEmoji: builder.query({
      query: (guild) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${guild}/emojis`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "EMOJIS", id: arg }],
    }),
    getGuildSticker: builder.query({
      query: (guild) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${guild}/stickers`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "EMOJIS", id: arg }],
    }),
    addAutoResponse: builder.mutation({
      query: ({ guild, feature, ...body }) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${guild}/features/${feature}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "AUTORESPONSE", id: `${arg.guild}-${arg.feature}` },
      ],
    }),
    updateAutoResponse: builder.mutation({
      query: ({ guild, feature, id, ...body }) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${guild}/features/${feature}/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "AUTORESPONSE", id: `${arg.guild}-${arg.feature}` },
      ],
    }),
    deleteAutoResponse: builder.mutation({
      query: ({ guild, feature, id }) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${guild}/features/${feature}/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "AUTORESPONSE", id: `${arg.guild}-${arg.feature}` },
      ],
    }),

    addGiveawaySchedule: builder.mutation({
      query: ({ guild, feature, body }) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${guild}/features/${feature}/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "GIVEAWAYS", id: `${arg.guild}-${arg.feature}` },
      ],
    }),
    updateGiveawaySchedule: builder.mutation({
      query: ({ guild, feature, id, body }) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${guild}/features/${feature}/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "GIVEAWAYS", id: `${arg.guild}-${arg.feature}` },
      ],
    }),
    deleteGiveawaySchedule: builder.mutation({
      query: ({ guild, feature, id }) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/guilds/${guild}/features/${feature}/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "GIVEAWAYS", id: `${arg.guild}-${arg.feature}` },
      ],
    }),
  }),
});

export const {
  useGetGuildQuery,
  useGetGuildInfoQuery,
  useSendMessageFeatureMutation,
  useEnableFeatureMutation,
  useDisableFeatureMutation,
  useUpdateFeatureMutation,
  useGetFeatureQuery,
  useGetGuildRolesQuery,
  useGetGuildChannelsQuery,
  useGetGuildEmojiQuery,
  useGetGuildStickerQuery,

  // AUTO RESPONSE
  useAddAutoResponseMutation,
  useUpdateAutoResponseMutation,
  useDeleteAutoResponseMutation,

  // GIVEAWAY SCHEDULE
  useAddGiveawayScheduleMutation,
  useUpdateGiveawayScheduleMutation,
  useDeleteGiveawayScheduleMutation,
} = bot;
