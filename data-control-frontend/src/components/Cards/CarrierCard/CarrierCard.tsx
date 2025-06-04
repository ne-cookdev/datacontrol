import React from "react";

import { useDeleteCarrierMutation } from "../../../features/api/carriersApi";

import type { Carrier } from "../../../entities/tables/model/types";

import { EditIcon } from "../../Icons/EditIcon";
import { TrashIcon } from "../../Icons/TrashIcon";

import "./CarrierCard.css";

interface CarrierCardProps {
  info: Carrier;
}

export const CarrierCard: React.FC<CarrierCardProps> = (props) => {
  // запрос на удаление доставщика
  const [deleteCarrier] = useDeleteCarrierMutation();
  const deleteHandler = () => {
    try {
      deleteCarrier(props.info.id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="carriercard_background">
      <div className="carriercard_info_div">
        <h1 className="carriercard_name">{props.info.name}</h1>
      </div>
      <div className="carriercard_icons_div">
        <a href={`/carriers/update/${props.info.id}`}>
          <EditIcon className="carriercard_editicon" />
        </a>
        <TrashIcon onClick={deleteHandler} className="carriercard_trashicon" />
      </div>
    </div>
  );
};
