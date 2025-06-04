import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Homepage } from "./layouts/Homepage";
import { Loginpage } from "./layouts/Loginpage";
import { Registerpage } from "./layouts/Registerpage";

import { AllCategoriesPage } from "./layouts/AdminPages/CategoriesPages/AllCategoriesPage";
import { CreateCategoryPage } from "./layouts/AdminPages/CategoriesPages/CreateCategoryPage";
import { UpdateCategoryPage } from "./layouts/AdminPages/CategoriesPages/UpdateCategoryPage";

import { AllProductsPage } from "./layouts/AdminPages/ProductsPages/AllProductsPage";
import { CreateProductPage } from "./layouts/AdminPages/ProductsPages/CreateProductPage";
import { UpdateProductPage } from "./layouts/AdminPages/ProductsPages/UpdateProductPage";

import { AllOrdersPage } from "./layouts/AdminPages/OrdersPages/AllOrdersPage";
import { CreateOrderPage } from "./layouts/AdminPages/OrdersPages/CreateOrderPage";
import { UpdateOrderPage } from "./layouts/AdminPages/OrdersPages/UpdateOrderPage";

import { AllShipmentsPage } from "./layouts/AdminPages/ShipmentsPages/AllShipmentsPage";
import { CreateShipmentPage } from "./layouts/AdminPages/ShipmentsPages/CreateShipmentPage";
import { UpdateShipmentPage } from "./layouts/AdminPages/ShipmentsPages/UpdateShipmentPage";

import { AllCarriersPage } from "./layouts/AdminPages/CarriersPages/AllCarriersPage";
import { CreateCarrierPage } from "./layouts/AdminPages/CarriersPages/CreateCarrierPage";
import { UpdateCarrierPage } from "./layouts/AdminPages/CarriersPages/UpdateCarrierPage";

import { AllStocksPage } from "./layouts/AdminPages/StocksPages/AllStocksPage";
import { CreateStockPage } from "./layouts/AdminPages/StocksPages/CreateStockPage";
import { UpdateStockPage } from "./layouts/AdminPages/StocksPages/UpdateStockPage";

import { AllWarehousesPage } from "./layouts/AdminPages/WarehousesPages/AllWarehousesPage";
import { CreateWarehousePage } from "./layouts/AdminPages/WarehousesPages/CreateWarehousePage";
import { UpdateWarehousePage } from "./layouts/AdminPages/WarehousesPages/UpdateWarehousePage";

import { NoFoundErrorPage } from "./layouts/ErrorPages/NoFoundErrorPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <Homepage />,
  },
  {
    path: "/auth",
    children: [
      { path: "", element: <NoFoundErrorPage /> },
      { path: "login", element: <Loginpage /> },
      { path: "register", element: <Registerpage /> },
    ],
  },
  {
    path: "/categories",
    children: [
      { path: "", element: <AllCategoriesPage /> },
      { path: "create", element: <CreateCategoryPage /> },
      { path: "update/:categoryId", element: <UpdateCategoryPage /> },
    ],
  },
  {
    path: "/products",
    children: [
      { path: "", element: <AllProductsPage /> },
      { path: "create", element: <CreateProductPage /> },
      { path: "update/:productId", element: <UpdateProductPage /> },
    ],
  },
  {
    path: "/orders",
    children: [
      { path: "", element: <AllOrdersPage /> },
      { path: "create", element: <CreateOrderPage /> },
      { path: "update/:orderNumber", element: <UpdateOrderPage /> },
    ],
  },
  {
    path: "/shipments",
    children: [
      { path: "", element: <AllShipmentsPage /> },
      { path: "create", element: <CreateShipmentPage /> },
      { path: "update/:shipmentTrackingNumber", element: <UpdateShipmentPage /> },
    ],
  },
  {
    path: "/carriers",
    children: [
      { path: "", element: <AllCarriersPage /> },
      { path: "create", element: <CreateCarrierPage /> },
      { path: "update/:carrierId", element: <UpdateCarrierPage /> },
    ],
  },
  {
    path: "/stocks",
    children: [
      { path: "", element: <AllStocksPage /> },
      { path: "create", element: <CreateStockPage /> },
      { path: "update/:stockId", element: <UpdateStockPage /> },
    ],
  },
  {
    path: "/warehouses",
    children: [
      { path: "", element: <AllWarehousesPage /> },
      { path: "create", element: <CreateWarehousePage /> },
      { path: "update/:warehouseId", element: <UpdateWarehousePage /> },
    ],
  },
  {
    path: "*",
    element: <NoFoundErrorPage />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
