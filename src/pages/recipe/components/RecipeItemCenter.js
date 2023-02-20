import React from "react";

function RecipeItemCenter({ children }) {
  return (
    <li className="recipe-list__item">
      <span className="recipe-list__item__center">{children}</span>
    </li>
  );
}

export default RecipeItemCenter;