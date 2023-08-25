import React from "react";
import Symbol from "../../../components/shared/Symbol";
import {
  RecipeListItemLeftStyled,
  RecipeListItemRightStyled,
  RecipeListItemStyled,
  TabStyled,
} from "../Styles";
import { getSymbolType } from "../../../helper/getSymbolType";
import {numberFormat} from '../../../helper/numberFormat'

function RecipeItemCost({ recipeItem, totalRecipe }) {
  const { name, isFlour, isLiquid, pricePerKilo, price } = recipeItem;

  const symbolType = getSymbolType({ isRecipe: false, isFlour, isLiquid });

  return (
    <RecipeListItemStyled>
      <RecipeListItemLeftStyled>
        {!totalRecipe ? name : "total"}
      </RecipeListItemLeftStyled>
      <RecipeListItemRightStyled>
        <Symbol type={symbolType} />
        <TabStyled>{numberFormat(pricePerKilo)}</TabStyled>
        <Symbol type={"coins"} />
        <TabStyled>{numberFormat(price)}</TabStyled>
        <Symbol type={"coins"} />
      </RecipeListItemRightStyled>
    </RecipeListItemStyled>
  );
}

export default RecipeItemCost;
