import React from "react";
import { EditCategoryButtonStyled } from "./EditCategoryButtonStyles";

function EditCategoryButton({ categoryId }) {
  return (
    <EditCategoryButtonStyled
      data-action="EditCategoryButton"
      data-category-id={categoryId}
    >
      Edit Category
    </EditCategoryButtonStyled>
  );
}

export default EditCategoryButton;
