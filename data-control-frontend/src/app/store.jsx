import { configureStore } from "@reduxjs/toolkit";
import { accountsApi } from "../features/api/accountsApi";
import { categoriesApi } from "../features/api/categoriesApi";
import { productsApi } from "../features/api/productsApi";
import { ordersApi } from "../features/api/ordersApi";
import { shipmentsApi } from "../features/api/shipmentsApi";
import { carriersApi } from "../features/api/carriersApi";
import { stocksApi } from "../features/api/stocksApi";
import { warehousesApi } from "../features/api/warehousesApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [accountsApi.reducerPath]: accountsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [shipmentsApi.reducerPath]: shipmentsApi.reducer,
    [carriersApi.reducerPath]: carriersApi.reducer,
    [stocksApi.reducerPath]: stocksApi.reducer,
    [warehousesApi.reducerPath]: warehousesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(accountsApi.middleware, categoriesApi.middleware, productsApi.middleware, ordersApi.middleware, shipmentsApi.middleware, carriersApi.middleware, stocksApi.middleware, warehousesApi.middleware),
});

setupListeners(store.dispatch);

export default store;
