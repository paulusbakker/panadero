import React from "react";
import Symbol from "../../../components/shared/Symbol";
import { ACTIONS, VIEWMODE } from "../Recipe";
import {
  RecipeListItemLeftStyled,
  RecipeListItemRightStyled, RecipeListItemStyled,
  TabStyled,
} from '../Styles' // Make sure the path is correct
import { getSymbolType } from '../../../helper/getSymbolType';

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
  const symbolType = getSymbolType({ isRecipe, isFlour, isLiquid });

  return (
      <RecipeListItemStyled
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
          <Symbol type={symbolType} />
          {viewMode === VIEWMODE.VIEW_AMOUNTS ? (
              <TabStyled>{weight.toFixed(2)}g</TabStyled>
          ) : (
              <TabStyled>
                <Symbol type={"calculator"} />
              </TabStyled>
          )}
        </RecipeListItemRightStyled>
      </RecipeListItemStyled>
  );
}

export default RecipeItemTotal;
