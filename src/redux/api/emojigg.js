import { emptySplitApi } from ".";

const bot = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmojiGg: builder.query({
      query: () => ({
        url: `https://emoji.gg/api`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "EMOJIS", id: arg }],
    }),

    getEmojiGgPack: builder.query({
      query: () => ({
        url: `https://emoji.gg/api/packs`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "EMOJIS", id: arg.id }],
    }),
  }),
});

export const { useGetEmojiGgQuery, useGetEmojiGgPackQuery } = bot;
