import React from "react";
import Symbol from "../../../components/shared/Symbol";
import {
  RecipeListItemLeftStyled,
  RecipeListItemRightStyled,
  RecipeListItemStyled,
  TabStyled,
} from "../Styles";
import { getSymbolType } from "../../../helper/getSymbolType";

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
        <TabStyled>{pricePerKilo.toFixed(2)}</TabStyled>
        <Symbol type={"coins"} />
        <TabStyled>{price.toFixed(2)}</TabStyled>
        <Symbol type={"coins"} />
      </RecipeListItemRightStyled>
    </RecipeListItemStyled>
  );
}

export default RecipeItemCost;
