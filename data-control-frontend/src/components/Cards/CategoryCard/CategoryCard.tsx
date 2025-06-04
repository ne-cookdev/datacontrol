import React from "react";

import { useDeleteCategoryMutation } from "../../../features/api/categoriesApi";

import type { Category } from "../../../entities/tables/model/types";

import { EditIcon } from "../../Icons/EditIcon";
import { TrashIcon } from "../../Icons/TrashIcon";

import "./CategoryCard.css";

interface CategoryCardProps {
  info: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  // запрос на удаление категории
  const [deleteCategory] = useDeleteCategoryMutation();
  const deleteHandler = () => {
    try {
      deleteCategory(props.info.id).unwrap();
    } catch (error) {
      console.error("Ошибка при удалении категории:", error);
    }
  };

  return (
    <div className="categorycard_background">
      <div className="categorycard_info_div">
        <h1 className="categorycard_name">{props.info.name}</h1>
      </div>
      <div className="categorycard_icons_div">
        <a href={`/categories/update/${props.info.id}`}>
          <EditIcon className="categorycard_editicon" />
        </a>
        <TrashIcon onClick={deleteHandler} className="categorycard_trashicon" />
      </div>
    </div>
  );
};
