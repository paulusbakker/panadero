import React from "react";
import Symbol from "../../../components/Symbol";
import Indent from "./Indent";
import RecipeListItemLeft from "./RecipeListItemLeft";
import { ACTIONS, VIEWMODE } from "../Recipe";

function RecipeItem({ recipeItem, index, stepsMode, viewMode, dispatch }) {
  const {
    isRecipe,
    name,
    depth,
    isFlour,
    isLiquid,
    weight,
    percentage,
    stepWeight,
  } = recipeItem;

  return (
    <li
      className="recipe-list__item"
      onClick={() => {
        dispatch({
          type: ACTIONS.HANDLE_RECIPE_INDEX,
          payload: { index: index, stepsMode: stepsMode },
        });
      }}
    >
      <RecipeListItemLeft>
        {isRecipe ? <Indent depth={depth - 1} /> : <Indent depth={depth} />}
        {!isRecipe && depth !== 0 && "- "}
        {name}
      </RecipeListItemLeft>
      <span className="recipe-list__item__right">
        <Symbol type={isRecipe && "recipe"} />
        <Symbol type={isFlour && "flour"} />
        <Symbol type={isLiquid && "isLiquid"} />
        {viewMode === VIEWMODE.VIEW_AMOUNTS ? (
          <>
            <span className="tab">{`${(!stepsMode
              ? weight
              : stepWeight
            ).toFixed(2)}g`}</span>
          </>
        ) : (
          <>
            {!stepsMode ? (
              <span className="tab">{(percentage * 100).toFixed(2)}%</span>
            ) : (
              <span className="tab"></span>
            )}
            <Symbol type={"calculator"} />
          </>
        )}
      </span>
    </li>
  );
}

export default RecipeItem;
