/**
 * Retrieves a recipe object from the recipe book based on its name.
 *
 * @param {string} ingredientName - Name of the ingredient to retrieve.
 * @param {Object} recipeBook - The recipe book containing recipes.
 * @param {Map<string, Object>} recipeBook.ingredients - Map of ingredient names to ingredient objects.
 * @returns {Object|undefined} The recipe object if found, otherwise undefined.
 */
export function getIngredientFromIngredientName(ingredientName, recipeBook) {
  for (const ingredient of recipeBook.ingredients.values()) {
    if (ingredient.name === ingredientName) {
      return ingredient;
    }
  }
  return undefined; // Explicitly return undefined if the ingredient is not found.
}
