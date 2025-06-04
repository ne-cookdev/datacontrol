import { useNavigate } from "react-router-dom";

import { useGetOrdersQuery } from "../../../features/api/ordersApi";

import { ForbiddenErrorPage } from "../../ErrorPages/ForbiddenErrorPage";
import { EmptyDataErrorPage } from "../../ErrorPages/EmptyDataErrorPage";

import { Header } from "../../../components/Header/Header";
import { Menu } from "../../../components/Menu/Menu";
import { OrderCard } from "../../../components/Cards/OrderCard/OrderCard";

import type { Order } from "../../../entities/tables/model/types";

import "./OrdersPage.css";

export const AllOrdersPage = () => {
  const navigate = useNavigate();

  // запрос списка заказов с бэка
  const { data: orders, isSuccess: isOrdersSuccess, isError: isOrdersError, error: ordersError } = useGetOrdersQuery();

  if (isOrdersError) {
    // @ts-ignore
    if (ordersError.status === 403) return <ForbiddenErrorPage />;
    // @ts-ignore
    else if (ordersError.status === 401) {
      navigate("/auth/login");
      return null;
    } else {
      console.error("Ошибка при получении заказов:", ordersError);
    }
  } else if (isOrdersSuccess) {
    if (orders.length === 0) {
      return <EmptyDataErrorPage text="Пока нет доступных заказов" page="Заказы" hrefText="Новый заказ" href="/orders/create" />;
    } else {
      return (
        <main className="orderspage_cards_background">
          <Header />
          <Menu page="Заказы" hrefText="Новый заказ" href="/orders/create" />
          <div className="orderspage_cards_container">
            {orders.map((order: Order) => (
              <OrderCard info={order} />
            ))}
          </div>
        </main>
      );
    }
  } else {
    return null;
  }
};
