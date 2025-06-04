import React from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

interface MenuProps {
  page: string;
  hrefText: string;
  href: string;
}

export const Menu: React.FC<MenuProps> = (props) => {
  // нужно для редиректа
  const navigate = useNavigate();

  return (
    <div className="menu">
      <div className="menu_pages">
        <a href="/categories" className={`menu_page ${props.page === "Категории" && "menu_active_page"}`}>
          Категории
        </a>
        <a href="/products" className={`menu_page ${props.page === "Товары" && "menu_active_page"}`}>
          Товары
        </a>
        <a href="/orders" className={`menu_page ${props.page === "Заказы" && "menu_active_page"}`}>
          Заказы
        </a>
        <a href="/shipments" className={`menu_page ${props.page === "Доставки" && "menu_active_page"}`}>
          Доставки
        </a>
        <a href="/carriers" className={`menu_page ${props.page === "Доставщики" && "menu_active_page"}`}>
          Доставщики
        </a>
        <a href="/stocks" className={`menu_page ${props.page === "Распределение товара" && "menu_active_page"}`}>
          Распределение товара
        </a>
        <a href="/warehouses" className={`menu_page ${props.page === "Склады" && "menu_active_page"}`}>
          Склады
        </a>
      </div>
      <a href={props.href} className="menu_a">
        {props.hrefText}
      </a>
    </div>
  );
};
