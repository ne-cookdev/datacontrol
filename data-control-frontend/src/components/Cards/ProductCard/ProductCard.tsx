import React, { useState } from "react";

import { useDeleteProductMutation } from "../../../features/api/productsApi";

import type { Product } from "../../../entities/tables/model/types";

import { Tag } from "../../Tag/Tag";
import { EditIcon } from "../../Icons/EditIcon";
import { TrashIcon } from "../../Icons/TrashIcon";

import "./ProductCard.css";

interface ProductCardProps {
  info: Product;
}

// Проверяем, что URL не пустой и соответствует формату изображения
function isValidImageUrl(url: string | null): boolean {
  return !!url && /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  // ссылка на картинку
  const [imgSrc, setImgSrc] = useState<string>(isValidImageUrl(props.info.image_ref) ? props.info.image_ref! : "/images/product_stub.png");

  // Если изображение не загрузилось, подставляем заглушку
  const handleError = () => {
    setImgSrc("/images/product_stub.png");
  };

  // запрос на удаление товара
  const [deleteProduct] = useDeleteProductMutation();
  const deleteHandler = () => {
    try {
      deleteProduct(props.info.id).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="productcard_background">
      <div className="productcard_img_div">
        <img className="productcard_img" src={imgSrc} alt={props.info.name} onError={handleError} />
      </div>

      <div className="productcard_info_part">
        <Tag text={props.info.category.name} />

        <div className="productcard_text_div">
          <h1 className="productcard_name">{props.info.name}</h1>

          <p className="productcard_description">{props.info.description}</p>

          <div className="productcard_quantity_price_div">
            <p className="productcard_quantity">Осталось: {props.info.all_quantity} шт.</p>
            <p className="productcard_price">{props.info.price} ₽</p>
          </div>
        </div>
        <div className="productcard_icons_div">
          <a href={`/products/update/${props.info.id}`}>
            <EditIcon className="productcard_editicon" />
          </a>
          <TrashIcon onClick={deleteHandler} className="productcard_trashicon" />
        </div>
      </div>
    </div>
  );
};
