import { emptySplitApi } from ".";

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: (params) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/dashboard/stats`,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "USER", id: "LIST" }],
    }),

    getCustomers: builder.query({
      query: (params) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/peachy/my/customers`,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "USER", id: "LIST" }],
    }),

    getUsers: builder.query({
      query: (params) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/peachy/users`,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "USER", id: "LIST" }],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/peachy/profile/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "USER", id: arg }],
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/peachy/users/${id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }),
      invalidatesTags: (result, error, arg) => [{ type: "USER", id: arg.id }],
    }),

    getTopCredit: builder.query({
      query: (params) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/peachy/top-credit`,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "USER", id: "LIST" }],
    }),

    getTopCoin: builder.query({
      query: (params) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/peachy/top-coin`,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "USER", id: "LIST" }],
    }),

    getTopLevel: builder.query({
      query: (params) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/peachy/top-level`,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "USER", id: "LIST" }],
    }),

    getUserInfo: builder.query({
      query: ({ id }) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/peachy/user/${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "USER", id: "LIST" }],
    }),

    getFetchUserById: builder.query({
      query: (userIds) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/peachy/fetch-user`,
        method: "GET",
        params: { ids: userIds.join(",") },
      }),
      providesTags: [{ type: "USER", id: "LIST" }],
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetCustomersQuery,
  useGetTopCreditQuery,
  useGetTopCoinQuery,
  useGetTopLevelQuery,

  useGetUsersQuery,
  useGetUserByIdQuery,

  useUpdateUserMutation,

  useGetUserInfoQuery,
  useGetFetchUserByIdQuery,
} = extendedApi;
