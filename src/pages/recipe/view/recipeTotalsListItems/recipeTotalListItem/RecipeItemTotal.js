import { ACTIONS, VIEWMODE } from "../../../../../constants/constants";
import { getSymbolType } from "../../../../../helper/getSymbolType";
import { numberFormat } from "../../../../../helper/numberFormat";
import Symbol from "../../../../../shared_components/Symbol";
import {
  LeftAlignedFlexContainer,
  ListItemStyled,
  RightSpacedFlexContainer,
  SpanStyled,
} from "./Styles";

function RecipeTotalListItem({
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
    <ListItemStyled
      onClick={() => {
        dispatch({
          type: ACTIONS.HANDLE_ITEM_ID_OR_TOTAL,
          payload: { itemIdOrTotal: name },
        });
      }}
    >
      <LeftAlignedFlexContainer>
        {name}
        {isLiquid && `  (${numberFormat(totalLiquidPercentage * 100)}%)`}
      </LeftAlignedFlexContainer>
      <RightSpacedFlexContainer>
        <Symbol type={symbolType} />
        {viewMode === VIEWMODE.VIEW_AMOUNTS ? (
          <SpanStyled>{numberFormat(weight)}g</SpanStyled>
        ) : (
          <SpanStyled>
            <Symbol type={"calculator"} />
          </SpanStyled>
        )}
      </RightSpacedFlexContainer>
    </ListItemStyled>
  );
}

export default RecipeTotalListItem;
