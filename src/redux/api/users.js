import { emptySplitApi } from ".";

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: (params) => ({
        url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/peachy/customers`,
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
  }),
});

export const {
  useGetCustomersQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = extendedApi;
