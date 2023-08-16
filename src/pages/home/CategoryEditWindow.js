import React from "react";
import { BackgroundOverlayStyled, CategoryEditWindowStyled } from "./Styles";

function CategoryEditWindow({
  categoryName,
  handleInputChange,
  currentEditValue,
  handleCategoryUpdate,
}) {
  return (
    <BackgroundOverlayStyled>
      <CategoryEditWindowStyled data-action='CategoryEditWindowStyled' >
        <p>Edit category:</p>
        {categoryName}
        <input
          type="text"
          id="input"
          aria-label="input"
          onChange={handleInputChange}
          value={currentEditValue}
        />
        <button onClick={() => handleCategoryUpdate(categoryName)} >
          Submit
        </button>
      </CategoryEditWindowStyled>
    </BackgroundOverlayStyled>
  );
}

export default CategoryEditWindow;
