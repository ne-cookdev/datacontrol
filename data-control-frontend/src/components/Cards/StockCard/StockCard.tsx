import React from "react";

import { useDeleteStockMutation } from "../../../features/api/stocksApi";

import type { Stock } from "../../../entities/tables/model/types";

import { Tag } from "../../Tag/Tag";
import { EditIcon } from "../../Icons/EditIcon";
import { TrashIcon } from "../../Icons/TrashIcon";

import "./StockCard.css";

interface StockCardProps {
  info: Stock;
}

export const StockCard: React.FC<StockCardProps> = (props) => {
  // запрос на удаление распределения товара
  const [deleteStock] = useDeleteStockMutation();
  const deleteHandler = () => {
    try {
      deleteStock(props.info.id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="stockcard_background">
      <h1 className="stockcard_h1">{props.info.product.name}</h1>
      <Tag text={props.info.warehouse.name} />
      <div className="stockcard_text_div">
        <p className="stockcard_text">{props.info.product.description}</p>
        <p className="stockcard_text">Адрес склада: {props.info.warehouse.location}</p>
      </div>
      <div className="stockcard_icons_price">
        <div className="stockcard_icons_div">
          <a href={`/stocks/update/${props.info.id}`}>
            <EditIcon className="stockcard_editicon" />
          </a>
          <TrashIcon onClick={deleteHandler} className="stockcard_trashicon" />
        </div>

        <p className="stockcard_price">
          {props.info.quantity}/{props.info.product.all_quantity}
        </p>
      </div>
    </div>
  );
};
