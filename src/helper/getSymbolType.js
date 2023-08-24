export function getSymbolType({ isRecipe, isFlour, isLiquid }) {
  if (isRecipe) return "recipe";
  if (isFlour) return "flour";
  if (isLiquid) return "isLiquid";
  return "empty"; // default value or any other handling
}
