import React from "react";
import Symbol from "../../../components/Symbol";
import RecipeListItemLeft from "./RecipeListItemLeft";
import RecipeListItemRight from "./RecipeListItemRight";

function RecipeItemCost({ recipeItem, totalRecipe }) {
  const { name, isFlour, isLiquid, pricePerKilo, price } = recipeItem;
  return (
    <li className="recipe-list__item">
      <RecipeListItemLeft>{!totalRecipe ? name : "total"}</RecipeListItemLeft>
      <RecipeListItemRight>
        <Symbol type={isFlour && "flour"} />
        <Symbol type={isLiquid && "isLiquid"} />
        <span className="tab">{pricePerKilo.toFixed(2)}</span>
        <Symbol type={"coins"} />
        <span className="tab">{price.toFixed(2)}</span>
        <Symbol type={"coins"} />
      </RecipeListItemRight>
    </li>
  );
}

export default RecipeItemCost;