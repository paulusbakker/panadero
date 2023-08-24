import React from "react";
import {BackgroundOverlayStyled, PopupStyled} from '../../styles/SharedStyles'

function CategoryEditWindow({
  categoryName,
  handleInputChange,
  currentEditValue,
  handleCategoryUpdate,
}) {
  return (
    <BackgroundOverlayStyled>
      <PopupStyled data-action='popup' >
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
      </PopupStyled>
    </BackgroundOverlayStyled>
  );
}

export default CategoryEditWindow;
