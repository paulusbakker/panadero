/**
 * Retrieves a recipe object from the recipe book based on its name.
 *
 * @param {string} recipeName - Name of the recipe to retrieve.
 * @param {Object} recipeBook - The recipe book containing recipes.
 * @param {Map<string, Object>} recipeBook.recipes - Map of recipe names to recipe objects.
 * @returns {Object|undefined} The recipe object if found, otherwise undefined.
 */
export function getRecipeFromRecipeName(recipeName, recipeBook) {
  for (const [key, recipe] of recipeBook.recipes.entries()) {
    if (recipe.name === recipeName) {
      return recipe;
    }
  }
  return undefined;  // Explicitly return undefined if the recipe is not found.
}
