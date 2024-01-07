import React from "react";
import Symbol from "../../../../components/shared/Symbol";
import { getSymbolType } from "../../../../helper/getSymbolType";
import {numberFormat} from '../../../../helper/numberFormat'
import {LeftAlignedFlexContainer, ListItemStyled, RightSpacedFlexContainer, SpanStyled} from './Styles'

function RecipeItemCost({ flattenedRecipeItem, totalRecipe }) {
  const { name, isFlour, isLiquid, pricePerKilo, price } = flattenedRecipeItem;
  const symbolType = getSymbolType({ isRecipe: false, isFlour, isLiquid });

  return (
    <ListItemStyled>
      <LeftAlignedFlexContainer>
        {!totalRecipe ? name : "total"}
      </LeftAlignedFlexContainer>
      <RightSpacedFlexContainer>
        <Symbol type={symbolType} />
        <SpanStyled>{numberFormat(pricePerKilo)}</SpanStyled>
        <Symbol type={"coins"} />
        <SpanStyled>{numberFormat(price)}</SpanStyled>
        <Symbol type={"coins"} />
      </RightSpacedFlexContainer>
    </ListItemStyled>
  );
}

export default RecipeItemCost;
