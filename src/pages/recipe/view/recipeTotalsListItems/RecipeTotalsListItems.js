import { TOTAL } from "../../../../constants/constants";
import { calculateTotalOverallLiquidPercentage } from "../../../../helper/calculateTotalOverallLiquidPercentage";
import RecipeTotalListItem from "./recipeTotalListItem/RecipeItemTotal";

const RecipeTotalsListItems = ({ flattenedRecipeState, dispatch }) => {
  return (
    <>
      <RecipeTotalListItem
        name={TOTAL.FLOUR}
        isRecipe={false}
        isFlour={true}
        isLiquid={false}
        totalLiquidPercentage={null}
        viewMode={flattenedRecipeState.viewMode}
        dispatch={dispatch}
        weight={flattenedRecipeState.totalFlourWeight}
      />
      <RecipeTotalListItem
        name={TOTAL.LIQUID}
        isRecipe={false}
        isFlour={false}
        isLiquid={true}
        totalLiquidPercentage={calculateTotalOverallLiquidPercentage(
          flattenedRecipeState.flattenedRecipe
        )}
        viewMode={flattenedRecipeState.viewMode}
        dispatch={dispatch}
        weight={flattenedRecipeState.totalLiquidWeight}
      />
      <RecipeTotalListItem
        name={TOTAL.RECIPE}
        isRecipe={true}
        isFlour={false}
        isLiquid={false}
        totalLiquidPercentage={null}
        viewMode={flattenedRecipeState.viewMode}
        dispatch={dispatch}
        weight={flattenedRecipeState.flattenedRecipe[0].weight}
      />
    </>
  );
};

export default RecipeTotalsListItems;
