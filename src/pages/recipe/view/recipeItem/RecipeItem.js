import React from "react";
import Symbol from "../../../../components/shared/Symbol";
// import { ACTIONS, VIEWMODE } from "../ViewRecipe";
import { getSymbolType } from '../../../../helper/getSymbolType';
import Indent from '../indent/Indent'
import {numberFormat} from '../../../../helper/numberFormat'
import {ContainerStyled, LeftAlignedFlexContainer, ListItemStyled, RightSpacedFlexContainer, SpanStyled} from './Styles'
import {ACTIONS, VIEWMODE} from '../ViewRecipe'

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
      <ListItemStyled
          onClick={() => {
            dispatch({
              type: ACTIONS.HANDLE_RECIPE_INDEX,
              payload: { index: index, stepsMode: stepsMode },
            });
          }}
      >
        <LeftAlignedFlexContainer>
          {isRecipe ? <Indent depth={depth - 1} /> : <Indent depth={depth} />}
          {!isRecipe && depth !== 0 && "- "}
          {name}
        </LeftAlignedFlexContainer>
        <RightSpacedFlexContainer>
          <Symbol type={symbolType} />
          <ContainerStyled>
            {viewMode === VIEWMODE.VIEW_AMOUNTS ? (
                <SpanStyled>{`${numberFormat(!stepsMode
                        ? weight
                        : stepWeight
                )}g`}</SpanStyled>
            ) : (
                <>
                  {!stepsMode ? (
                      <SpanStyled>{numberFormat(percentage * 100)}%</SpanStyled>
                  ) : (
                      <SpanStyled />
                  )}
                  <Symbol type={"calculator"} />
                </>
            )}
          </ContainerStyled>
        </RightSpacedFlexContainer>
      </ListItemStyled>
  );
}

export default RecipeItem;
