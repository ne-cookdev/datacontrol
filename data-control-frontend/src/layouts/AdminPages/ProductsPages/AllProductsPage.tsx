import { useNavigate } from "react-router-dom";

import { useGetProductsQuery } from "../../../features/api/productsApi";

import { ForbiddenErrorPage } from "../../ErrorPages/ForbiddenErrorPage";
import { EmptyDataErrorPage } from "../../ErrorPages/EmptyDataErrorPage";

import { Header } from "../../../components/Header/Header";
import { Menu } from "../../../components/Menu/Menu";
import { ProductCard } from "../../../components/Cards/ProductCard/ProductCard";

import type { Product } from "../../../entities/tables/model/types";

import "./ProductsPage.css";

export const AllProductsPage = () => {
  const navigate = useNavigate();

  // запрос списка товаров с бэка
  const { data: products, isSuccess: isProductsSuccess, isError: isProductsError, error: productsError } = useGetProductsQuery();

  if (isProductsError) {
    // @ts-ignore
    if (productsError.status === 403) return <ForbiddenErrorPage />;
    // @ts-ignore
    else if (productsError.status === 401) {
      navigate("/auth/login");
      return null;
    } else {
      console.error("Ошибка при получении товаров:", productsError);
    }
  } else if (isProductsSuccess) {
    if (products.length === 0) {
      return <EmptyDataErrorPage text="Пока нет доступных товаров" page="Товары" hrefText="Новый товар" href="/products/create" />;
    } else {
      return (
        <main className="productspage_cards_background">
          <Header />
          <Menu page="Товары" hrefText="Новый товар" href="/products/create" />
          <div className="productspage_cards_container">
            {products.map((product: Product) => (
              <ProductCard info={product} />
            ))}
          </div>
        </main>
      );
    }
  } else {
    return null;
  }
};
