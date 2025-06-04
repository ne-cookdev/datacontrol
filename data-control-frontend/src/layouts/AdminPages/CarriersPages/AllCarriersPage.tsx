import { useNavigate } from "react-router-dom";

import { useGetCarriersQuery } from "../../../features/api/carriersApi";

import { ForbiddenErrorPage } from "../../ErrorPages/ForbiddenErrorPage";
import { EmptyDataErrorPage } from "../../ErrorPages/EmptyDataErrorPage";

import { Header } from "../../../components/Header/Header";
import { Menu } from "../../../components/Menu/Menu";
import { CarrierCard } from "../../../components/Cards/CarrierCard/CarrierCard";

import type { Carrier } from "../../../entities/tables/model/types";

import "./CarriersPage.css";

export const AllCarriersPage = () => {
  const navigate = useNavigate();

  // запрос списка доставщиков с бэка
  const { data: carriers, isSuccess: isCarriersSuccess, isError: isCarriersError, error: carriersError } = useGetCarriersQuery();

  if (isCarriersError) {
    // @ts-ignore
    if (carriersError.status === 403) return <ForbiddenErrorPage />;
    // @ts-ignore
    else if (carriersError.status === 401) {
      navigate("/auth/login");
      return null;
    } else {
      console.error("Ошибка при получении доставщиков:", carriersError);
    }
  } else if (isCarriersSuccess) {
    if (carriers.length === 0) {
      return <EmptyDataErrorPage text="Пока нет доступных доставщиков" page="Доставщики" hrefText="Новый доставщик" href="/carriers/create" />;
    } else {
      return (
        <main className="carrierspage_cards_background">
          <Header />
          <Menu page="Доставщики" hrefText="Новый доставщик" href="/carriers/create" />
          <div className="carrierspage_cards_container">
            {carriers.map((carrier: Carrier) => (
              <CarrierCard info={carrier} />
            ))}
          </div>
        </main>
      );
    }
  } else {
    return null;
  }
};
