import { useNavigate } from "react-router-dom";

import { useGetShipmentsQuery } from "../../../features/api/shipmentsApi";

import { ForbiddenErrorPage } from "../../ErrorPages/ForbiddenErrorPage";
import { EmptyDataErrorPage } from "../../ErrorPages/EmptyDataErrorPage";

import { Header } from "../../../components/Header/Header";
import { Menu } from "../../../components/Menu/Menu";
import { ShipmentCard } from "../../../components/Cards/ShipmentCard/ShipmentCard";

import type { Shipment } from "../../../entities/tables/model/types";

import "./ShipmentsPage.css";

export const AllShipmentsPage = () => {
  const navigate = useNavigate();

  // запрос списка доставок с бэка
  const { data: shipments, isSuccess: isShipmentsSuccess, isError: isShipmentsError, error: shipmentsError } = useGetShipmentsQuery();

  if (isShipmentsError) {
    // @ts-ignore
    if (shipmentsError.status === 403) return <ForbiddenErrorPage />;
    // @ts-ignore
    else if (shipmentsError.status === 401) {
      navigate("/auth/login");
      return null;
    } else {
      console.error("Ошибка при получении доставок:", shipmentsError);
    }
  } else if (isShipmentsSuccess) {
    if (shipments.length === 0) {
      return <EmptyDataErrorPage text="Пока нет доступных доставок" page="Доставки" hrefText="Новая доставка" href="/shipments/create" />;
    } else {
      return (
        <main className="shipmentspage_cards_background">
          <Header />
          <Menu page="Доставки" hrefText="Новая доставка" href="/shipments/create" />
          <div className="shipmentspage_cards_container">
            {shipments.map((shipment: Shipment) => (
              <ShipmentCard info={shipment} />
            ))}
          </div>
        </main>
      );
    }
  } else {
    return null;
  }
};
