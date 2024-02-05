import React from "react";
import Symbol from "../../../../shared_components/Symbol";
import { getSymbolType } from "../../../../helper/getSymbolType";
import { numberFormat } from "../../../../helper/numberFormat";
import { ACTIONS, VIEWMODE } from "../../../../constants/constants";
import Indent from "../../../../shared_components/Indent";
import {
    ContainerStyled,
    LeftAlignedFlexContainer,
    ListItemStyled,
    RightSpacedFlexContainer,
    SpanStyled,
} from "./Styles";

function FlattenedRecipeItemEditor({
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
              <Symbol type={"calculator"} />
            </>
          )}
        </ContainerStyled>
      </RightSpacedFlexContainer>
    </ListItemStyled>
  );
}

export default FlattenedRecipeItemEditor;
