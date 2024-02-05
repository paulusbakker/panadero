import { VIEWMODE } from "../constants/constants";
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
    flattenedRecipe: flattenedRecipeResult,
    isValidOverallRecipe: isValidOverallRecipe,
    itemIdOrTotal: null,
    stepsMode: false,
    currentWeight: 0,
    totalFlourWeight: 0,
    totalLiquidWeight: 0,
    viewMode: VIEWMODE.VIEW_RECIPE,
    isFirstLoad: true,
  };
}
