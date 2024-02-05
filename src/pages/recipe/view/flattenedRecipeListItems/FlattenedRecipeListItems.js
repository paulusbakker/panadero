import { ACTIONS, VIEWMODE } from "../../../../constants/constants";
import { getSymbolType } from "../../../../helper/getSymbolType";
import { numberFormat } from "../../../../helper/numberFormat";
import Indent from "../../../../shared_components/Indent";
import Symbol from "../../../../shared_components/Symbol";
import {
  ContainerStyled,
  LeftAlignedFlexContainer,
  ListItemStyled,
  RightSpacedFlexContainer,
  SpanStyled,
} from "./Styles";

function FlattenedRecipeListItems({
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
    stepWeight,
    isFaultyRecipe,
    isFaultyIngredient,
    ingredientIsMissingInParentRecipe,
    recipeHasMissingIngredientsInParentRecipe,
  } = flattenedRecipeItem;
  const symbolType = getSymbolType({ isRecipe, isFlour, isLiquid });
  return (
    <ListItemStyled
      $isFaulty={isFaultyRecipe || isFaultyIngredient}
      $isOrHasMissingInParent={
        ingredientIsMissingInParentRecipe ||
        recipeHasMissingIngredientsInParentRecipe
      }
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

export default FlattenedRecipeListItems;
