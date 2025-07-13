import { emptySplitApi } from ".";

const bot = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getTimeline: builder.query({
      query: (params) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/posts`,
        method: "GET",
        params,
      }),
      providesTags: (result, error, arg) => [{ type: "TIMELINE", id: arg }],
    }),

    createTimeline: builder.mutation({
      query: (body) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/posts`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "TIMELINE", id: arg.id },
      ],
    }),
  }),
});

export const { useGetTimelineQuery, useCreateTimelineMutation } = bot;
