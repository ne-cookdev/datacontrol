import React from "react";

import { useDeleteOrderMutation } from "../../../features/api/ordersApi";

import type { Order, OrderDetail } from "../../../entities/tables/model/types";

import { Tag } from "../../Tag/Tag";
import { EditIcon } from "../../Icons/EditIcon";
import { TrashIcon } from "../../Icons/TrashIcon";
import { OrderDetailCard } from "../OrderDetailCard/OrderDetailCard";

import "./OrderCard.css";

interface OrderCardProps {
  info: Order;
}

export const OrderCard: React.FC<OrderCardProps> = (props) => {
  const calculateTotalPrice = (order: Order): number => {
    return order.order_details.reduce((total, detail) => total + detail.quantity * detail.price_at_order, 0);
  };

  function formatDateToRussian(datetimeString: string): string {
    const date = new Date(datetimeString);

    // Проверка на валидность даты
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }

    // Получаем компоненты даты
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Формируем строку в русском формате
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  }

  // запрос на удаление заказа
  const [deleteOrder] = useDeleteOrderMutation();
  const deleteHandler = () => {
    try {
      deleteOrder(props.info.number).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ordercard_background">
      <div className="ordercard_info_part">
        <h1 className="ordercard_h1">Заказ №{props.info.number}</h1>
        <Tag
          classNamediv={`${props.info.status === 3 ? "ordercard_tag3div" : props.info.status === 2 ? "ordercard_tag2div" : "ordercard_tag1div"}`}
          classNamespan={`${props.info.status === 3 ? "ordercard_tag3span" : props.info.status === 2 ? "ordercard_tag2span" : "ordercard_tag1span"}`}
          text={props.info.status === 3 ? "Доставлен" : props.info.status === 2 ? "В пути" : "Создан"}
        />
        <div className="ordercard_text_div">
          <p className="ordercard_text">Дата: {formatDateToRussian(props.info.order_date)}</p>
          <p className="ordercard_text">Заказчик: {props.info.user.email}</p>
          <p className="ordercard_text">Адрес: {props.info.address}</p>
        </div>
        <div className="ordercard_icons_price">
          <div className="ordercard_icons_div">
            <a href={`/orders/update/${props.info.number}`}>
              <EditIcon className="ordercard_editicon" />
            </a>
            <TrashIcon onClick={deleteHandler} className="ordercard_trashicon" />
          </div>

          <p className="ordercard_price">{calculateTotalPrice(props.info)}₽</p>
        </div>
      </div>
      <div className="ordercard_details_part">
        {props.info.order_details.map((order_detail: OrderDetail) => (
          <OrderDetailCard info={order_detail} />
        ))}
      </div>
    </div>
  );
};
