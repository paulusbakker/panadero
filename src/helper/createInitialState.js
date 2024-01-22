import { VIEWMODE } from "./path/to/constants"; // Adjust the path as needed
import { flattenRecipe } from "/flattenedRecipe";

export function createInitialState(id, recipeBook) {
  return {
    flattenedRecipe: id ? flattenRecipe(id, recipeBook) : null,
    itemIdOrTotal: null,
    stepsMode: false,
    currentWeight: 0,
    totalFlourWeight: 0,
    totalLiquidWeight: 0,
    viewMode: VIEWMODE.VIEW_RECIPE,
  };
}
