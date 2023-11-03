/**
 * Calculates the overall total liquid percentage for the main (root) recipe.
 *
 * @param {Array} flattenedRecipe - The flattened recipe list.
 * @returns {number} - The overall total liquid percentage for the main recipe.
 */
export function calculateTotalOverallLiquidPercentage(flattenedRecipe) {
  // Filter out the ingredients from the main recipe (depth 0) that are liquid.
  const mainRecipeLiquids = flattenedRecipe.filter(recipeItem =>
      recipeItem.depth === 0 && recipeItem.isLiquid
  );

  // Sum up the percentages of these liquid ingredients.
  const overallTotalLiquidPercentage = mainRecipeLiquids.reduce(
      (total, recipeItem) => total + recipeItem.percentage,
      0
  );

  return overallTotalLiquidPercentage;
}
