import { emptySplitApi } from ".";

const bot = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getBotApplicationInfo: builder.query({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_API}/me/application`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "BOT", id: "APPLICATION" },
      ],
    }),
  }),
});

export const { useGetBotApplicationInfoQuery } = bot;
