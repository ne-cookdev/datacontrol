import { useNavigate } from "react-router-dom";

import { useGetStocksQuery } from "../../../features/api/stocksApi";

import { ForbiddenErrorPage } from "../../ErrorPages/ForbiddenErrorPage";
import { EmptyDataErrorPage } from "../../ErrorPages/EmptyDataErrorPage";

import { Header } from "../../../components/Header/Header";
import { Menu } from "../../../components/Menu/Menu";
import { StockCard } from "../../../components/Cards/StockCard/StockCard";

import type { Stock } from "../../../entities/tables/model/types";

import "./StocksPage.css";

export const AllStocksPage = () => {
  const navigate = useNavigate();

  // запрос списка распеределений товаров с бэка
  const { data: stocks, isSuccess: isStocksSuccess, isError: isStocksError, error: stocksError } = useGetStocksQuery();

  if (isStocksError) {
    // @ts-ignore
    if (stocksError.status === 403) return <ForbiddenErrorPage />;
    // @ts-ignore
    else if (stocksError.status === 401) {
      navigate("/auth/login");
      return null;
    } else {
      console.error("Ошибка при получении распределений товаров:", stocksError);
    }
  } else if (isStocksSuccess) {
    if (stocks.length === 0) {
      return <EmptyDataErrorPage text="Пока нет доступных распределений товаров" page="Распределение товара" hrefText="Новое распределение товара" href="/stocks/create" />;
    } else {
      return (
        <main className="stockspage_cards_background">
          <Header />
          <Menu page="Распределение товара" hrefText="Новое распределение товара" href="/stocks/create" />
          <div className="stockspage_cards_container">
            {stocks.map((stock: Stock) => (
              <StockCard info={stock} />
            ))}
          </div>
        </main>
      );
    }
  } else {
    return null;
  }
};
