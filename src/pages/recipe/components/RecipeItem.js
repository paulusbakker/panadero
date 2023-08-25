import React from "react";
import Symbol from "../../../components/shared/Symbol";
import { ACTIONS, VIEWMODE } from "../Recipe";
import {
  RecipeListItemLeftStyled,
  RecipeListItemRightStyled,
  RecipeListItemStyled,
  TabStyled,
  ContainerStyled
} from '../Styles';
import { getSymbolType } from '../../../helper/getSymbolType';
import Indent from './Indent'
import {numberFormat} from '../../../helper/numberFormat'

function RecipeItem({ recipeItem, index, stepsMode, viewMode, dispatch }) {
  const {
    isRecipe,
    name,
    depth,
    isFlour,
    isLiquid,
    weight,
    percentage,
    stepWeight,
  } = recipeItem;
  const symbolType = getSymbolType({ isRecipe, isFlour, isLiquid });

  return (
      <RecipeListItemStyled
          onClick={() => {
            dispatch({
              type: ACTIONS.HANDLE_RECIPE_INDEX,
              payload: { index: index, stepsMode: stepsMode },
            });
          }}
      >
        <RecipeListItemLeftStyled>
          {isRecipe ? <Indent depth={depth - 1} /> : <Indent depth={depth} />}
          {!isRecipe && depth !== 0 && "- "}
          {name}
        </RecipeListItemLeftStyled>
        <RecipeListItemRightStyled>
          <Symbol type={symbolType} />
          <ContainerStyled>
            {viewMode === VIEWMODE.VIEW_AMOUNTS ? (
                <TabStyled>{`${numberFormat(!stepsMode
                        ? weight
                        : stepWeight
                )}g`}</TabStyled>
            ) : (
                <>
                  {!stepsMode ? (
                      <TabStyled>{numberFormat(percentage * 100)}%</TabStyled>
                  ) : (
                      <TabStyled />
                  )}
                  <Symbol type={"calculator"} />
                </>
            )}
          </ContainerStyled>
        </RecipeListItemRightStyled>
      </RecipeListItemStyled>
  );
}

export default RecipeItem;
