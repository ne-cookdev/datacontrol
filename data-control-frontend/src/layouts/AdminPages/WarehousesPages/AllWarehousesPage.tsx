import { useNavigate } from "react-router-dom";

import { useGetWarehousesQuery } from "../../../features/api/warehousesApi";

import { ForbiddenErrorPage } from "../../ErrorPages/ForbiddenErrorPage";
import { EmptyDataErrorPage } from "../../ErrorPages/EmptyDataErrorPage";

import { Header } from "../../../components/Header/Header";
import { Menu } from "../../../components/Menu/Menu";
import { WarehouseCard } from "../../../components/Cards/WarehouseCard/WarehouseCard";

import type { Warehouse } from "../../../entities/tables/model/types";

import "./WarehousesPage.css";

export const AllWarehousesPage = () => {
  const navigate = useNavigate();

  // запрос списка складов с бэка
  const { data: warehouses, isSuccess: isWarehousesSuccess, isError: isWarehousesError, error: warehousesError } = useGetWarehousesQuery();

  if (isWarehousesError) {
    // @ts-ignore
    if (warehousesError.status === 403) return <ForbiddenErrorPage />;
    // @ts-ignore
    else if (warehousesError.status === 401) {
      navigate("/auth/login");
      return null;
    } else {
      console.error("Ошибка при получении складов:", warehousesError);
    }
  } else if (isWarehousesSuccess) {
    if (warehouses.length === 0) {
      return <EmptyDataErrorPage text="Пока нет доступных складов" page="Склады" hrefText="Новый склад" href="/warehouses/create" />;
    } else {
      return (
        <main className="warehousespage_cards_background">
          <Header />
          <Menu page="Склады" hrefText="Новый склад" href="/warehouses/create" />
          <div className="warehousespage_cards_container">
            {warehouses.map((warehouse: Warehouse) => (
              <WarehouseCard info={warehouse} />
            ))}
          </div>
        </main>
      );
    }
  } else {
    return null;
  }
};
