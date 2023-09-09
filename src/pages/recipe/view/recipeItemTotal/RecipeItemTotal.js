import React from "react";
import Symbol from "../../../../components/shared/Symbol";
import { getSymbolType } from '../../../../helper/getSymbolType';
import {numberFormat} from '../../../../helper/numberFormat'
import {LeftAlignedFlexContainer, ListItemStyled, RightSpacedFlexContainer, SpanStyled} from './Styles'
import {ACTIONS, VIEWMODE} from '../ViewRecipe'

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
      <ListItemStyled
          onClick={() => {
            dispatch({
              type: ACTIONS.HANDLE_RECIPE_INDEX,
              payload: { index: name },
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

export default RecipeItemTotal;
