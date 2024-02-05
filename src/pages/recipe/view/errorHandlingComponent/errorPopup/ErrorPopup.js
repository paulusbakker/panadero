import React from "react";
import { ACTIONS } from "../../../../../constants/constants";
import { BackgroundOverlayStyled, PopupStyled } from "./Styles";

function ErrorPopup({ flattenedRecipeState, dispatch }) {
  const errorMessage = [];
  if (flattenedRecipeState.isFirstLoad) {
    errorMessage.push("This recipe is not valid");
    errorMessage.push("Push on highlighted item for info..");
  } else {
    errorMessage.push("under construction");
  }
  return (
    <BackgroundOverlayStyled>
      <PopupStyled data-action="popup">
        <ul>
          {errorMessage.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>

        <button
          onClick={() =>
            dispatch({
              type: ACTIONS.CLOSE_ERROR_POPUP,
              payload: { firstLoad: true },
            })
          }
        >
          Understood!
        </button>
      </PopupStyled>
    </BackgroundOverlayStyled>
  );
}

export default ErrorPopup;
