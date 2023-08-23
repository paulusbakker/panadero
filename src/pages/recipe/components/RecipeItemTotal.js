import React from "react";
import Symbol from "../../../components/shared/Symbol";
import RecipeListItemLeft from "./RecipeListItemLeft";
import RecipeListItemRight from "./RecipeListItemRight";
import { ACTIONS, VIEWMODE } from "../Recipe";
import {RecipeListItemLeftStyled, RecipeListItemRightStyled, TabStyled} from '../Styles'

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
        dispatch({
          type: ACTIONS.HANDLE_RECIPE_INDEX,
          payload: { index: name },
        });
      }}
    >
      <RecipeListItemLeftStyled>
        {name}
        {isLiquid && `  (${(totalLiquidPercentage * 100).toFixed(2)}%)`}
      </RecipeListItemLeftStyled>
      <RecipeListItemRightStyled>
        <Symbol type={isRecipe && "recipe"} />
        <Symbol type={isFlour && "flour"} />
        <Symbol type={isLiquid && "isLiquid"} />
        {viewMode === VIEWMODE.VIEW_AMOUNTS ? (
          <>
            <TabStyled>{weight.toFixed(2)}g</TabStyled>
          </>
        ) : (
            <TabStyled>
            <Symbol type={"calculator"} />
          </TabStyled>)
        }
      </RecipeListItemRightStyled>
    </li>
  );
}

export default RecipeItemTotal;
