import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Shipment, CreateShipmentArgs } from "../../entities/tables/model/types";

export const shipmentsApi = createApi({
  reducerPath: "shipmentsApi",
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
    getShipments: builder.query<Shipment[], void>({
      query: () => ({
        url: `/shipments/`,
        method: "GET",
      }),
    }),
    createShipment: builder.mutation<Shipment, CreateShipmentArgs>({
      query: (args) => ({
        url: `/shipments/`,
        method: "POST",
        body: {
          order_id: args.order_id,
          carrier_id: args.carrier_id,
        },
      }),
    }),
    getShipment: builder.query<Shipment, number>({
      query: (shipmentTrackingNumber) => ({
        url: `/shipments/${shipmentTrackingNumber}/`,
        method: "GET",
      }),
    }),
    updateShipment: builder.mutation<
      Shipment,
      {
        tracking_number: number;
        order_id: number;
        carrier_id: number;
      }
    >({
      query: ({ tracking_number, ...body }) => ({
        url: `/shipments/${tracking_number}/`,
        method: "PUT",
        body,
      }),
    }),
    deleteShipment: builder.mutation({
      query: (tracking_number: number) => ({
        url: `/shipments/${tracking_number}/`,
        method: "DELETE",
        body: {},
      }),
    }),
  }),
});

export const { useGetShipmentsQuery, useCreateShipmentMutation, useGetShipmentQuery, useUpdateShipmentMutation, useDeleteShipmentMutation } = shipmentsApi;
