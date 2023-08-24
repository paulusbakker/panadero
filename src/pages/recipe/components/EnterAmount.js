import React, { useState } from "react";
import Symbol from "../../../components/shared/Symbol";
import { ACTIONS } from "../Recipe";
import {
} from "../../recipeBookApp/Styles";
import {BackgroundOverlayStyled, PopupStyled} from '../../../styles/SharedStyles'

const INPUT_IDS = {
  BATCH: "batch",
  UNIT: "unit",
};

function EnterAmount({ name, dispatch }) {
  const [batchViewMode, toggleBatchViewMode] = useState(true);
  const [weight, setWeight] = useState(0);
  const [unitCount, setUnitCount] = useState(1);

  const handleClick = (e) => {
    const insidePopup = e.target.closest(`[data-action='popup']`);
    console.log(insidePopup);
    if (!insidePopup) {
      dispatch({ type: ACTIONS.CANCEL_CALCULATE_AMOUNT });
    }
  };

  const handleChange = (e) => {
    if (e.target.id === INPUT_IDS.BATCH) setWeight(e.target.value);
    else setUnitCount(e.target.value);
    e.stopPropagation();
  };

  return (
      <>
        <BackgroundOverlayStyled onClick={handleClick}>
          <PopupStyled data-action="popup">
            <h2 className="backdrop__popup__name">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </h2>
            <span>
            <input
                type="radio"
                id={INPUT_IDS.BATCH}
                onChange={() => toggleBatchViewMode(true)}
                checked={batchViewMode}
            />
            <label htmlFor={INPUT_IDS.BATCH}>Total Batch</label>

            <input
                type="radio"
                id={INPUT_IDS.UNIT}
                onChange={() => toggleBatchViewMode(false)}
                checked={!batchViewMode}
            />
            <label htmlFor={INPUT_IDS.UNIT}>Per Unit</label>
          </span>
            <span>
            <Symbol type={"scale"} />
            <input
                type="number"
                id={INPUT_IDS.BATCH}
                onChange={handleChange}
                value={weight}
            />
          </span>
            {!batchViewMode && (
                <span>
              <Symbol type={"bread"} />
              <input
                  type="number"
                  id={INPUT_IDS.UNIT}
                  onChange={handleChange}
                  value={unitCount}
              />
            </span>
            )}
            <span>
            <button
                onClick={() =>
                    dispatch({ type: ACTIONS.CANCEL_CALCULATE_AMOUNT })
                }
            >
              Cancel
            </button>
            <button
                onClick={() =>
                    dispatch({
                      type: ACTIONS.HANDLE_SUBMIT,
                      payload: { weight: weight * unitCount },
                    })
                }
            >
              Calculate
            </button>
          </span>
          </PopupStyled>
        </BackgroundOverlayStyled>
      </>
  );
}

export default EnterAmount;
