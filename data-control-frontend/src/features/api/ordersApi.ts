import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Order, CreateOrderArgs } from "../../entities/tables/model/types";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
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
    getOrders: builder.query<Order[], void>({
      query: () => ({
        url: `/orders/`,
        method: "GET",
      }),
    }),
    createOrder: builder.mutation<Order, CreateOrderArgs>({
      query: (args) => ({
        url: `/orders/`,
        method: "POST",
        body: {
          address: args.address,
          order_details: args.order_details,
        },
      }),
    }),
    getOrder: builder.query<Order, number>({
      query: (orderNumber) => ({
        url: `/orders/${orderNumber}/`,
        method: "GET",
      }),
    }),
    updateOrder: builder.mutation<
      Order,
      {
        number: number;
        address: string;
        order_details: {
          product_id: number;
          quantity: number;
        }[];
      }
    >({
      query: ({ number, ...body }) => ({
        url: `/orders/${number}/`,
        method: "PUT",
        body,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (number: number) => ({
        url: `/orders/${number}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useCreateOrderMutation, useGetOrderQuery, useUpdateOrderMutation, useDeleteOrderMutation } = ordersApi;
