import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Category } from "../../entities/tables/model/types";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: `/categories`,
        method: "GET",
      }),
    }),
    createCategory: builder.mutation({
      query: (args) => ({
        url: `/categories/`,
        method: "POST",
        body: { name: args.name },
      }),
    }),
    getCategory: builder.query<Category, number>({
      query: (categoryId) => ({
        url: `/categories/${categoryId}/`,
        method: "GET",
      }),
    }),
    updateCategory: builder.mutation<Category, Category>({
      query: ({ id, ...body }) => ({
        url: `/categories/${id}/`,
        method: "PUT",
        body,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id: number) => ({
        url: `/categories/${id}`,
        method: "DELETE",
        body: {},
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation, useGetCategoryQuery, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoriesApi;
