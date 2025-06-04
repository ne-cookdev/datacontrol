import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Stock, CreateStockArgs } from "../../entities/tables/model/types";

export const stocksApi = createApi({
  reducerPath: "stocksApi",
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
    getStocks: builder.query<Stock[], void>({
      query: () => ({
        url: `/stocks/`,
        method: "GET",
      }),
    }),
    createStock: builder.mutation<Stock, CreateStockArgs>({
      query: (args) => ({
        url: `/stocks/`,
        method: "POST",
        body: {
          warehouse_id: args.warehouse_id,
          product_id: args.product_id,
          quantity: args.quantity,
        },
      }),
    }),
    getStock: builder.query<Stock, number>({
      query: (stockId) => ({
        url: `/stocks/${stockId}/`,
        method: "GET",
      }),
    }),
    updateStock: builder.mutation<
      Stock,
      {
        id: number;
        warehouse_id: number;
        product_id: number;
        quantity: number;
      }
    >({
      query: ({ id, ...body }) => ({
        url: `/stocks/${id}/`,
        method: "PUT",
        body,
      }),
    }),
    deleteStock: builder.mutation({
      query: (id: number) => ({
        url: `/stocks/${id}/`,
        method: "DELETE",
        body: {},
      }),
    }),
  }),
});

export const { useGetStocksQuery, useCreateStockMutation, useGetStockQuery, useUpdateStockMutation, useDeleteStockMutation } = stocksApi;
