import { getSymbolType } from "../../../helper/getSymbolType";
import { numberFormat } from "../../../helper/numberFormat";
import SymbolStyles from "../../../shared/components/SymbolStyles";
import {
  LeftAlignedFlexContainer,
  ListItemStyled,
  RightSpacedFlexContainer,
  SpanStyled,
} from "./RecipeCostListItemStyles";

function RecipeCostListItem({ flattenedRecipeItem, totalRecipe }) {
  const { name, isFlour, isLiquid, pricePerKilo, price } = flattenedRecipeItem;
  const symbolType = getSymbolType({ isRecipe: false, isFlour, isLiquid });

  return (
    <ListItemStyled>
      <LeftAlignedFlexContainer>
        {!totalRecipe ? name : "total"}
      </LeftAlignedFlexContainer>
      <RightSpacedFlexContainer>
        <SymbolStyles type={symbolType} />
        <SpanStyled>{numberFormat(pricePerKilo)}</SpanStyled>
        <SymbolStyles type={"coins"} />
        <SpanStyled>{numberFormat(price)}</SpanStyled>
        <SymbolStyles type={"coins"} />
      </RightSpacedFlexContainer>
    </ListItemStyled>
  );
}

export default RecipeCostListItem;
