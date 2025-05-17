import { TOTAL } from "../../../shared/constants/constants";
import { calculateTotalOverallLiquidPercentage } from "../../../helper/calculateTotalOverallLiquidPercentage";
import RecipeTotalListItem from "./RecipeItemTotal";

const RecipeTotalsListItems = ({ flattenedRecipeState, dispatch }) => {
  return (
    <>
      <RecipeTotalListItem
        name={TOTAL.FLOUR}
        isRecipe={false}
        isFlour={true}
        isLiquid={false}
        totalLiquidPercentage={null}
        recipe_view={flattenedRecipeState.recipe_view}
        dispatch={dispatch}
        weight={flattenedRecipeState.totalFlourWeight}
        isValidOverallRecipe={flattenedRecipeState.isValidOverallRecipe}
      />
      <RecipeTotalListItem
        name={TOTAL.LIQUID}
        isRecipe={false}
        isFlour={false}
        isLiquid={true}
        totalLiquidPercentage={calculateTotalOverallLiquidPercentage(
          flattenedRecipeState.flattenedRecipe
        )}
        recipe_view={flattenedRecipeState.recipe_view}
        dispatch={dispatch}
        weight={flattenedRecipeState.totalLiquidWeight}
        isValidOverallRecipe={flattenedRecipeState.isValidOverallRecipe}
      />
      <RecipeTotalListItem
        name={TOTAL.RECIPE}
        isRecipe={true}
        isFlour={false}
        isLiquid={false}
        totalLiquidPercentage={null}
        recipe_view={flattenedRecipeState.recipe_view}
        dispatch={dispatch}
        weight={flattenedRecipeState.flattenedRecipe[0].weight}
        isValidOverallRecipe={flattenedRecipeState.isValidOverallRecipe}
      />
    </>
  );
};

export default RecipeTotalsListItems;
