import React from "react";
import Symbol from "../../../components/Symbol";
import RecipeListItemLeft from "./RecipeListItemLeft";
import RecipeListItemRight from "./RecipeListItemRight";

function RecipeItemTotal({
  name,
  isRecipe,
  isFlour,
  isLiquid,
  totalLiquidPercentage,
  showAmounts,
  handleRecipeItemIndex,
  weight,
}) {
  const index = name;
  return (
    <li
      className="recipe-list__item"
      onClick={() => {
        handleRecipeItemIndex(index);
      }}
    >
      <RecipeListItemLeft>
        {name}
        {isLiquid && `  (${totalLiquidPercentage * 100}%)`}
      </RecipeListItemLeft>
      <RecipeListItemRight>
        <Symbol type={isRecipe && "recipe"} />
        <Symbol type={isFlour && "flour"} />
        <Symbol type={isLiquid && "isLiquid"} />
        {showAmounts ? (
          <>
            <span className="tab">{weight.toFixed(2)}g</span>
          </>
        ) : (
          <>
            <span className="tab"></span>
            <Symbol type={"calculator"} />
          </>
        )}
      </RecipeListItemRight>
    </li>
  );
}

export default RecipeItemTotal