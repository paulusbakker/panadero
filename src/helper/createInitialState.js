import { RECIPE_VIEW } from "../shared/constants/constants";
import { flattenRecipe } from "./flattenRecipe";

export function createInitialState(id, recipeBook) {
  let flattenedRecipeResult = null;
  let isValidOverallRecipe = true;

  if (id) {
    const result = flattenRecipe(id, recipeBook);
    flattenedRecipeResult = result.flattenedRecipe;
    isValidOverallRecipe = result.isValidOverallRecipe;
  }

  return {
    flattenedRecipe: flattenedRecipeResult || [],
    isValidOverallRecipe: isValidOverallRecipe,
    index: null,
    stepsMode: false,
    currentWeight: 0,
    totalFlourWeight: 0,
    totalLiquidWeight: 0,
    isFirstView: true,
    showPopup: !isValidOverallRecipe, // Show popup if the overall recipe is not valid
    recipe_view: RECIPE_VIEW.DEFAULT,
  };
}
