import React, { useState } from "react";
import SymbolStyles from "../../../shared/components/SymbolStyles";
import { ACTIONS, INPUT_IDS } from "../../../shared/constants/constants";

function EnterAmount({ name, dispatch }) {
  const [batchViewMode, toggleBatchViewMode] = useState(true);
  const [weight, setWeight] = useState(0);
  const [unitCount, setUnitCount] = useState(1);

  const handleClick = (e) => {
    const insidePopup = e.target.closest(`[data-action='popup']`);
    if (!insidePopup) {
      dispatch({ type: ACTIONS.CANCEL });
    }
  };

  const handleChange = (e) => {
    if (e.target.id === INPUT_IDS.BATCH) setWeight(e.target.value);
    else setUnitCount(e.target.value);
    e.stopPropagation();
  };

  return (
      <div onClick={handleClick}>
        <div data-action="popup">
          <h2 className="backdrop__popup__name">
            {`Total ${name.toLowerCase()}`}
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
          <SymbolStyles type={"scale"} />
          <input
              type="number"
              id={INPUT_IDS.BATCH}
              onChange={handleChange}
              value={weight}
          />
        </span>
          {!batchViewMode && (
              <span>
            <SymbolStyles type={"bread"} />
            <input
                type="number"
                id={INPUT_IDS.UNIT}
                onChange={handleChange}
                value={unitCount}
            />
          </span>
          )}
          <span>
          <button onClick={() => dispatch({ type: ACTIONS.CANCEL })}>
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
        </div>
      </div>
  );
}

export default EnterAmount;
