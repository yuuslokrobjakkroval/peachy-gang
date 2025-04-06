// api/authApi.ts (or wherever this code lives)
import { emptySplitApi } from ".";

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (body) => ({
        url: `${process.env.NEXT_PUBLIC_API}/auth/signup`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "AUTH", id: "SIGNUP" }],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `${process.env.NEXT_PUBLIC_API}/auth/login`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "AUTH", id: "LOGIN" }],
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = extendedApi;
