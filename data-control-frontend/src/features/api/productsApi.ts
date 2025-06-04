import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Product, CreateProductArgs } from "../../entities/tables/model/types";

export const productsApi = createApi({
  reducerPath: "productsApi",
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
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: `/products/`,
        method: "GET",
      }),
    }),
    createProduct: builder.mutation<Product, CreateProductArgs>({
      query: (args) => ({
        url: `/products/`,
        method: "POST",
        body: {
          name: args.name,
          price: args.price,
          weight: args.weight,
          width: args.width,
          height: args.height,
          length: args.length,
          category_id: args.category_id,
          ...(args.description !== undefined && { description: args.description }),
          ...(args.image_ref !== undefined && { image_ref: args.image_ref }),
        },
      }),
    }),
    getProduct: builder.query<Product, number>({
      query: (productId) => ({
        url: `/products/${productId}/`,
        method: "GET",
      }),
    }),
    updateProduct: builder.mutation<
      Product,
      {
        id: number;
        name: string;
        price: number;
        weight: number;
        width: number;
        height: number;
        length: number;
        category_id: number;
        description: string;
        image_ref: string;
      }
    >({
      query: ({ id, ...body }) => ({
        url: `/products/${id}/`,
        method: "PUT",
        body,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id: number) => ({
        url: `/products/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation, useGetProductQuery, useUpdateProductMutation, useDeleteProductMutation } = productsApi;
