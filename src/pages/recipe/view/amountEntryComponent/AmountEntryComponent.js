import React from "react";
import { TOTAL, VIEWMODE } from "../../../../constants/constants";
import EnterAmount from "./enterAmounts/EnterAmount";

const AmountEntryComponent = ({ flattenedRecipeState, dispatch }) => {
  const shouldShowEnterAmount =
    flattenedRecipeState.isValidOverallRecipe &&
    flattenedRecipeState.viewMode === VIEWMODE.ENTER_AMOUNTS;

  return (
    <>
      {shouldShowEnterAmount && (
        <EnterAmount
          name={
            [TOTAL.FLOUR, TOTAL.LIQUID, TOTAL.RECIPE].includes(
              flattenedRecipeState.itemIdOrTotal
            )
              ? flattenedRecipeState.itemIdOrTotal
              : flattenedRecipeState.flattenedRecipe[
                  flattenedRecipeState.itemIdOrTotal
                ].name
          }
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default AmountEntryComponent;
