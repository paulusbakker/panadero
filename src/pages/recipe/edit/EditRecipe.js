import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Symbol from "../../../components/shared/Symbol";
import Navbar from "./navbar/Navbar";

function EditRecipe() {
  const { state } = useLocation();
  const [deleteRecipePopup, toggleDeleteRecipePopup] = useState(false);
  const [addRecipeMode, toggleAddRecipeMode] = useState(false);

  const togglePopup = (PopupSetter) => () => PopupSetter((prev) => !prev);

  return (
    <>
      <Navbar
        toggleDeleteRecipePopup={togglePopup(toggleDeleteRecipePopup)}
        toggleAddRecipeMode={togglePopup(toggleAddRecipeMode)}
      />

      {state.recipeName}
    </>
  );
}

export default EditRecipe;
