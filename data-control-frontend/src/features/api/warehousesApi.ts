import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Warehouse, CreateWarehouseArgs } from "../../entities/tables/model/types";

export const warehousesApi = createApi({
  reducerPath: "warehousesApi",
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
    getWarehouses: builder.query<Warehouse[], void>({
      query: () => ({
        url: `/warehouses/`,
        method: "GET",
      }),
    }),
    createWarehouse: builder.mutation<Warehouse, CreateWarehouseArgs>({
      query: (args) => ({
        url: `/warehouses/`,
        method: "POST",
        body: {
          name: args.name,
          location: args.location,
        },
      }),
    }),
    getWarehouse: builder.query<Warehouse, number>({
      query: (warehouseId) => ({
        url: `/warehouses/${warehouseId}/`,
        method: "GET",
      }),
    }),
    updateWarehouse: builder.mutation<
      Warehouse,
      {
        id: number;
        name: string;
        location: string;
      }
    >({
      query: ({ id, ...body }) => ({
        url: `/warehouses/${id}/`,
        method: "PUT",
        body,
      }),
    }),
    deleteWarehouse: builder.mutation({
      query: (id: number) => ({
        url: `/warehouses/${id}/`,
        method: "DELETE",
        body: {},
      }),
    }),
  }),
});

export const { useGetWarehousesQuery, useCreateWarehouseMutation, useGetWarehouseQuery, useUpdateWarehouseMutation, useDeleteWarehouseMutation } = warehousesApi;
