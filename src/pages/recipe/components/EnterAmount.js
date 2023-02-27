import React, { useEffect, useRef, useState } from "react";
import Symbol from "../../../components/Symbol";
import { ACTIONS } from "../Recipe";

function EnterAmount({ name, dispatch }) {
  const [batchViewMode, toggleBatchViewMode] = useState(true);
  const [weight, setWeight] = useState(0);
  const [unitCount, setUnitCount] = useState(1);
  const ref = useRef(false);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  });

  const handleClick = (e) => {
    if (ref.current && e.target.className === "backdrop") {
      dispatch({ type: ACTIONS.CANCEL_CALCULATE_AMOUNT });
    }
  };
  const handleChange = (e) => {
    // no need for seperate id in the input statement because the id is set by the htmlFor statement
    if (e.target.id === "batch") setWeight(e.target.value);
    else setUnitCount(e.target.value);
    e.stopPropagation();
  };

  return (
    <>
      <div ref={ref} className="backdrop">
        <div className="backdrop__popup">
          <h2 className="backdrop__popup__name">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h2>
          <span>
            <input
              type="radio"
              id="batch"
              onChange={() => toggleBatchViewMode(true)}
              checked={batchViewMode}
            />
            <label htmlFor="batch">Total Batch</label>

            <input
              type="radio"
              id="unit"
              onChange={() => toggleBatchViewMode(false)}
              checked={!batchViewMode}
            />
            <label htmlFor="unit">Per Unit</label>
          </span>
          <span>
            <Symbol type={"scale"} />
            <input
              type="number"
              id="batch"
              // aria-label="input"
              onChange={handleChange}
              value={weight}
            />
          </span>
          {!batchViewMode && (
            <span>
              <Symbol type={"bread"} />
              <input
                type="number"
                id="unit"
                // aria-label="input"
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
              className="backdrop__popup__submit"
            >
              Calculate
            </button>
          </span>
        </div>
      </div>
    </>
  );
}

export default EnterAmount;
