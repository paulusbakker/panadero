import React from "react";
import SymbolStyles from "../../../shared/components/SymbolStyles";
import { getSymbolType } from "../../../helper/getSymbolType";
import { numberFormat } from "../../../helper/numberFormat";
import { ACTIONS, RECIPE_VIEW } from "../../../shared/constants/constants";
import Indent from "../../../shared/components/Indent";
import {
    ContainerStyled,
    LeftAlignedFlexContainer,
    ListItemStyled,
    RightSpacedFlexContainer,
    SpanStyled,
} from "./FlattenedRecipeItemEditorStyles";

function FlattenedRecipeItemEditor({
  flattenedRecipeItem,
  stepsMode,
  recipe_view,
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
    isMissing,
  } = flattenedRecipeItem;
  const symbolType = getSymbolType({ isRecipe, isFlour, isLiquid });
  return (
    <ListItemStyled
      onClick={() => {
        dispatch({
          type: ACTIONS.HANDLE_ITEM_ID_OR_TOTAL,
          payload: { itemIdOrTotal: sequenceNumber, stepsMode: stepsMode },
        });
      }}
      $stepPercentage={stepPercentage}
      $isMissing={isMissing}
    >
      <LeftAlignedFlexContainer>
        {isRecipe ? <Indent depth={depth - 1} /> : <Indent depth={depth} />}
        {!isRecipe && depth !== 0 && "- "}
        {name}
      </LeftAlignedFlexContainer>
      <RightSpacedFlexContainer>
        <SymbolStyles type={symbolType} />
        <ContainerStyled>
          {recipe_view === RECIPE_VIEW.PROCESSED ? (
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
              <SymbolStyles type={"calculator"} />
            </>
          )}
        </ContainerStyled>
      </RightSpacedFlexContainer>
    </ListItemStyled>
  );
}

export default FlattenedRecipeItemEditor;
