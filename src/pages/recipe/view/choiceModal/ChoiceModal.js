import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ACTIONS } from "../ViewRecipe";
import { BackgroundOverlayStyled, PopupStyled } from "./Styles";

function ChoiceModal({ recipeId, sequenceNumber, stepsMode, dispatch }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    const insidePopup = e.target.closest(`[data-action='popup']`);
    if (!insidePopup) {
      dispatch({ type: ACTIONS.CANCEL });
    }
  };

  const handleNavigate = () => {
    navigate(`/recipe/view/${recipeId}`);
  };

  const handleCalculate = () => {
    dispatch({
      type: ACTIONS.HANDLE_ITEM_ID_OR_TOTAL,
      payload: { itemIdOrTotal: sequenceNumber, stepsMode: stepsMode },
    });
  };

  return (
    <>
      <BackgroundOverlayStyled onClick={handleClick}>
        <PopupStyled data-action="popup">
          <button onClick={handleNavigate}>Go to Recipe</button>
          <button onClick={handleCalculate}>Calculate Amounts</button>
        </PopupStyled>
      </BackgroundOverlayStyled>
    </>
  );
}

export default ChoiceModal;
