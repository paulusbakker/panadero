import React from 'react';
import ChoiceModal from './ChoiceModal';
import { VIEWMODE } from '../../../../constants/constants';

const ChoiceModalHandler = ({ flattenedRecipeState, dispatch }) => {
  const shouldShowChoiceModal = flattenedRecipeState.viewMode === VIEWMODE.VIEW_CHOICE_MODAL;

  return (
    <>
      {shouldShowChoiceModal && (
        <ChoiceModal
          recipeId={flattenedRecipeState.flattenedRecipe[flattenedRecipeState.itemIdOrTotal].id}
          sequenceNumber={flattenedRecipeState.flattenedRecipe[flattenedRecipeState.itemIdOrTotal].sequenceNumber}
          stepsMode={flattenedRecipeState.stepsMode}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default ChoiceModalHandler;
