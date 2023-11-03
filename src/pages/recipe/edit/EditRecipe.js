import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar/Navbar";

function EditRecipe() {
  const { state } = useLocation();
  const [deleteRecipePopup, toggleDeleteRecipePopup] = useState(false);
  const [addRecipeMode, toggleAddRecipeMode] = useState(false);

  const togglePopupOrMode = (PopupSetter) => () => PopupSetter((prev) => !prev);

  return (
    <>
      <Navbar
        toggleDeleteRecipePopup={togglePopupOrMode(toggleDeleteRecipePopup)}
        toggleAddRecipeMode={togglePopupOrMode(toggleAddRecipeMode)}
      />

      {state.id}
    </>
  );
}

export default EditRecipe;
