import React from "react";

import type { OrderDetail } from "../../../entities/tables/model/types";

import { EditIcon } from "../../Icons/EditIcon";
import { TrashIcon } from "../../Icons/TrashIcon";

import "./OrderDetailCard.css";

interface OrderDetailCardProps {
  info: OrderDetail;
}

export const OrderDetailCard: React.FC<OrderDetailCardProps> = (props) => {
  return (
    <div className="orderdetailcard_background">
      <h1 className="orderdetailcard_name">{props.info.product.name}</h1>
      <p className="orderdetailcard_quantity">Количество: {props.info.quantity}шт.</p>
      <p className="orderdetailcard_price">{props.info.price_at_order * props.info.quantity}₽</p>
    </div>
  );
};
