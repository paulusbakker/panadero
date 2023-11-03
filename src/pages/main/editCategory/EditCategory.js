import React from "react";
import { BackgroundOverlayStyled, PopupStyled } from "./Styles";

function EditCategory({
  categoryId,
  categoryName,
  handleInputChange,
  currentEditValue,
  handleCategoryUpdate,
}) {
  return (
    <BackgroundOverlayStyled>
      <PopupStyled data-action="popup">
        <p>Edit category:</p>
        {categoryName}
        <input
          type="text"
          id="input"
          aria-label="input"
          onChange={handleInputChange}
          value={currentEditValue}
        />
        <button onClick={() => handleCategoryUpdate(categoryId)}>Submit</button>
      </PopupStyled>
    </BackgroundOverlayStyled>
  );
}

export default EditCategory;
