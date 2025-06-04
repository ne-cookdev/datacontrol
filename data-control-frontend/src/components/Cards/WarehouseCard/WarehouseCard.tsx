import React from "react";

import { useDeleteWarehouseMutation } from "../../../features/api/warehousesApi";

import type { Warehouse } from "../../../entities/tables/model/types";

import { EditIcon } from "../../Icons/EditIcon";
import { TrashIcon } from "../../Icons/TrashIcon";

import "./WarehouseCard.css";

interface WarehouseCardProps {
  info: Warehouse;
}

export const WarehouseCard: React.FC<WarehouseCardProps> = (props) => {
  // запрос на удаление склада
  const [deleteWarehouse] = useDeleteWarehouseMutation();
  const deleteHandler = () => {
    try {
      deleteWarehouse(props.info.id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="warehousecard_background">
      <h1 className="warehousecard_h1">{props.info.name}</h1>
      <p className="warehousecard_text">Адрес: {props.info.location}</p>
      <div className="warehousecard_icons_div">
        <a href={`/warehouses/update/${props.info.id}`}>
          <EditIcon className="warehousecard_editicon" />
        </a>
        <TrashIcon onClick={deleteHandler} className="warehousecard_trashicon" />
      </div>
    </div>
  );
};
