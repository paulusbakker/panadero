export function calculateTotalOveralLiquidPercentage(flattenedRecipe) {
  const liquids = flattenedRecipe.filter((recipeItem) => {
    return (recipeItem.depth === 0) & recipeItem.isLiquid;
  });
  const overalTotalLiquidPercentage = liquids.reduce(
    (total, recipeItem) => total + recipeItem.percentage,
    0
  );
  return overalTotalLiquidPercentage;
}
