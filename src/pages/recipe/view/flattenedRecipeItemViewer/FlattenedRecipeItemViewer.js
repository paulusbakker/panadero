import React from "react";
import Symbol from "../../../../components/shared/Symbol";
import { getSymbolType } from "../../../../helper/getSymbolType";
import { numberFormat } from "../../../../helper/numberFormat";
import { ACTIONS, VIEWMODE } from "../ViewRecipe";
import Indent from "../indent/Indent";
import {
  ContainerStyled,
  LeftAlignedFlexContainer,
  ListItemStyled,
  RightSpacedFlexContainer,
  SpanStyled,
} from "./Styles";

function FlattenedRecipeItemViewer({
  flattenedRecipeItem,
  stepsMode,
  viewMode,
  dispatch,
}) {
  const {
    isRecipe,
    name,
    sequenceNumber,
    depth,
    isFlour,
    isLiquid,
    weight,
    percentage,
    stepPercentage,
    stepWeight,
    ingredientIsMissingInParentRecipe,
    recipeHasNegativeStepPercentage,
    flourTotalNot100Percent,
  } = flattenedRecipeItem;
  const symbolType = getSymbolType({ isRecipe, isFlour, isLiquid });
  return (
    <ListItemStyled
      onClick={() => {
        if (isRecipe) {
          dispatch({
            type: ACTIONS.SHOW_CHOICE_MODAL,
            payload: { itemIdOrTotal: sequenceNumber },
          });
        } else {
          dispatch({
            type: ACTIONS.HANDLE_ITEM_ID_OR_TOTAL,
            payload: { itemIdOrTotal: sequenceNumber, stepsMode: stepsMode },
          });
        }
      }}
      $stepPercentage={stepPercentage}
      $ingredientIsMissingInParentRecipe={ingredientIsMissingInParentRecipe}
      $recipeHasNegativeStepPercentage={recipeHasNegativeStepPercentage}
      $flourTotalNot100Percent={flourTotalNot100Percent}
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
            <SpanStyled>{`${numberFormat(
              !stepsMode ? weight : stepWeight
            )}g`}</SpanStyled>
          ) : (
            <>
              {!stepsMode ? (
                <SpanStyled>{numberFormat(percentage * 100)}%</SpanStyled>
              ) : (
                <SpanStyled />
              )}
              {isRecipe ? (
                <Symbol type={"menu"} />
              ) : (
                <Symbol type={"calculator"} />
              )}
            </>
          )}
        </ContainerStyled>
      </RightSpacedFlexContainer>
    </ListItemStyled>
  );
}

export default FlattenedRecipeItemViewer;
