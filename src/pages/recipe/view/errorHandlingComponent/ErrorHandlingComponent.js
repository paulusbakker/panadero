import React from "react";
import ErrorPopup from "./errorPopup/ErrorPopup";

const ErrorHandlingComponent = ({ flattenedRecipeState, dispatch }) => {
  const shouldShowError =
    flattenedRecipeState.isFirstLoad &&
    !flattenedRecipeState.isValidOverallRecipe;
  const shouldShowErrorOnItem =
    !flattenedRecipeState.isFirstLoad &&
    !flattenedRecipeState.isValidOverallRecipe &&
    flattenedRecipeState.itemIdOrTotal !== null;

  return (
    <>
      {shouldShowError && (
        <ErrorPopup
          flattenedRecipeState={flattenedRecipeState}
          dispatch={dispatch}
        />
      )}
      {shouldShowErrorOnItem && (
        <ErrorPopup
          flattenedRecipeState={flattenedRecipeState}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default ErrorHandlingComponent;
