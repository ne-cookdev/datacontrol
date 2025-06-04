import React from "react";

import { useDeleteShipmentMutation } from "../../../features/api/shipmentsApi";

import { Tag } from "../../Tag/Tag";
import { EditIcon } from "../../Icons/EditIcon";
import { TrashIcon } from "../../Icons/TrashIcon";

import "./ShipmentCard.css";

import type { Shipment } from "../../../entities/tables/model/types";

interface ShipmentCardProps {
  info: Shipment;
}

export const ShipmentCard: React.FC<ShipmentCardProps> = (props) => {
  // запрос на удаление доставки
  const [deleteShipment] = useDeleteShipmentMutation();
  const deleteHandler = () => {
    try {
      deleteShipment(props.info.tracking_number).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="shipmentcard_background">
      <h1 className="shipmentcard_name">Заказ №{props.info.order.number}</h1>
      <Tag classNamediv={`${props.info.status === 2 ? "shipmentcard_tag2div" : "shipmentcard_tag1div"}`} classNamespan={`${props.info.status === 2 ? "shipmentcard_tag2span" : "shipmentcard_tag1span"}`} text={props.info.status === 2 ? "Доставлен" : "В пути"} />
      <div className="shipmentcard_text_div">
        <p className="shipmentcard_text">Трек-номер: {props.info.tracking_number}</p>
        <p className="shipmentcard_text">Доставщик: {props.info.carrier.name}</p>
        <p className="shipmentcard_text">Заказчик: {props.info.order.user.email}</p>
        <p className="shipmentcard_text">Адрес: {props.info.order.address}</p>
      </div>
      <div className="shipmentcard_icons_div">
        <a href={`/shipments/update/${props.info.tracking_number}`}>
          <EditIcon className="shipmentcard_editicon" />
        </a>
        <TrashIcon onClick={deleteHandler} className="shipmentcard_trashicon" />
      </div>
    </div>
  );
};
