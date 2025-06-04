import { useNavigate } from "react-router-dom";

import { useGetCategoriesQuery } from "../../../features/api/categoriesApi";

import { ForbiddenErrorPage } from "../../ErrorPages/ForbiddenErrorPage";
import { EmptyDataErrorPage } from "../../ErrorPages/EmptyDataErrorPage";

import { Header } from "../../../components/Header/Header";
import { Menu } from "../../../components/Menu/Menu";
import { CategoryCard } from "../../../components/Cards/CategoryCard/CategoryCard";

import type { Category } from "../../../entities/tables/model/types";

import "./CategoriesPage.css";

export const AllCategoriesPage = () => {
  const navigate = useNavigate();

  // запрос списка категорий с бэка
  const { data: categories, isSuccess: isCategoriesSuccess, isError: isCategoriesError, error: categoriesError } = useGetCategoriesQuery();

  if (isCategoriesError) {
    // @ts-ignore
    if (categoriesError.status === 403) return <ForbiddenErrorPage />;
    // @ts-ignore
    else if (categoriesError.status === 401) {
      navigate("/auth/login");
      return null;
    } else {
      console.error("Ошибка при получении категорий:", categoriesError);
    }
  } else if (isCategoriesSuccess) {
    if (categories.length === 0) {
      return <EmptyDataErrorPage text="Пока нет доступных категорий" page="Категории" hrefText="Новая категория" href="/categories/create" />;
    } else {
      return (
        <main className="categoriespage_cards_background">
          <Header />
          <Menu page="Категории" hrefText="Новая категория" href="/categories/create" />
          <div className="categoriespage_cards_container">
            {categories.map((category: Category) => (
              <CategoryCard info={category} />
            ))}
          </div>
        </main>
      );
    }
  } else {
    return null;
  }
};
