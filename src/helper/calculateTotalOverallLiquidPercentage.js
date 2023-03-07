export function calculateTotalOverallLiquidPercentage(flattenedRecipe) {
  const liquids = flattenedRecipe.filter((recipeItem) => {
    return (recipeItem.depth === 0) & recipeItem.isLiquid;
  });
  const overallTotalLiquidPercentage = liquids.reduce(
    (total, recipeItem) => total + recipeItem.percentage,
    0
  );
  return overallTotalLiquidPercentage;
}
