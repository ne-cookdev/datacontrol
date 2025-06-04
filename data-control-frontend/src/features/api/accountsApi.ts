import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const accountsApi = createApi({
  reducerPath: "api",
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    // @ts-ignore
    baseUrl: "http://localhost:8000/api/v1/",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "auth/signup/",
        method: "POST",
        body: { email, password },
      }),
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "auth/login/",
        method: "POST",
        body: { email, password },
      }),
    }),
    logoutUser: builder.mutation({
      query: ({ refresh_token }) => ({
        url: "auth/logout/",
        method: "POST",
        body: { refresh_token },
      }),
    }),
    updateAccessToken: builder.mutation({
      query: ({ refresh }) => ({
        url: "token/refresh/",
        method: "POST",
        body: { refresh },
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useUpdateAccessTokenMutation } = accountsApi;
