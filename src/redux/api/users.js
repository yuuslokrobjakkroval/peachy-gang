import { emptySplitApi } from ".";

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    // getProfile: builder.query({
    //   query: () => ({
    //     url: `${process.env.NEXT_PUBLIC_API}/users/profile/:id`,
    //     method: "GET",
    //   }),
    //   providesTags: (result, error, args) => [
    //     { type: "USER", id: "INFOMATION" },
    //   ],
    // }),
    getUsers: builder.query({
      query: (params) => ({
        url: `${process.env.NEXT_PUBLIC_API}/peachy/users`,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "USER", id: "LIST" }],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `${process.env.NEXT_PUBLIC_API}/peachy/profile/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "USER", id: arg }],
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `${process.env.NEXT_PUBLIC_API}/peachy/users/${id}`,
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
  // useGetProfileQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = extendedApi;
