import React from "react";
import Symbol from "../../../components/shared/Symbol";
import { ACTIONS, VIEWMODE } from "../Recipe";
import { getSymbolType } from '../../../helper/getSymbolType';
import {numberFormat} from '../../../helper/numberFormat'
import {RecipeListItemLeftStyled, RecipeListItemRightStyled, RecipeListItemStyled, TabStyled} from './Styles'

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
          {isLiquid && `  (${numberFormat(totalLiquidPercentage * 100)}%)`}
        </RecipeListItemLeftStyled>
        <RecipeListItemRightStyled>
          <Symbol type={symbolType} />
          {viewMode === VIEWMODE.VIEW_AMOUNTS ? (
              <TabStyled>{numberFormat(weight)}g</TabStyled>
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
