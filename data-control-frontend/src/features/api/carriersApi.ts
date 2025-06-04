import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Carrier } from "../../entities/tables/model/types";

export const carriersApi = createApi({
  reducerPath: "carriersApi",
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
    getCarriers: builder.query<Carrier[], void>({
      query: () => ({
        url: `/carriers/`,
        method: "GET",
      }),
    }),
    createCarrier: builder.mutation({
      query: (args) => ({
        url: `/carriers/`,
        method: "POST",
        body: { name: args.name },
      }),
    }),
    getCarrier: builder.query<Carrier, number>({
      query: (carrierId) => ({
        url: `/carriers/${carrierId}/`,
        method: "GET",
      }),
    }),
    updateCarrier: builder.mutation<Carrier, Carrier>({
      query: ({ id, ...body }) => ({
        url: `/carriers/${id}/`,
        method: "PUT",
        body,
      }),
    }),
    deleteCarrier: builder.mutation({
      query: (id: number) => ({
        url: `/carriers/${id}/`,
        method: "DELETE",
        body: {},
      }),
    }),
  }),
});

export const { useGetCarriersQuery, useCreateCarrierMutation, useGetCarrierQuery, useUpdateCarrierMutation, useDeleteCarrierMutation } = carriersApi;
