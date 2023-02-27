import React from "react";
import Symbol from "../../../components/Symbol";
import RecipeListItemLeft from "./RecipeListItemLeft";
import RecipeListItemRight from "./RecipeListItemRight";
import {ACTIONS, VIEWMODE} from '../Recipe'

function RecipeItemTotal({
  name,
  isRecipe,
  isFlour,
  isLiquid,
  totalLiquidPercentage,
  viewMode,
  dispatch,
  weight,
}) {
  return (
    <li
      className="recipe-list__item"
      onClick={() => {
        dispatch({type: ACTIONS.HANDLE_RECIPE_INDEX, payload: { index: name}});
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
        {viewMode===VIEWMODE.VIEW_AMOUNTS ? (
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