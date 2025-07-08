import { emptySplitApi } from ".";

const bot = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    generateKHQR: builder.mutation({
      query: (body) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/payment/generate-khqr`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "PAYMENT", id: arg.id },
      ],
    }),

    generateTransactionId: builder.mutation({
      query: ({ year, month }) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/payment/generate-transaction-id`,
        method: "POST",
        body: { year, month },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "PAYMENT", id: arg.id },
      ],
    }),
  }),
});

export const { useGenerateKHQRMutation, useGenerateTransactionIdMutation } =
  bot;
