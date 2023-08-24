/**
 * Recursive function to verify if a parent recipe contains all ingredients from its child recipes.
 * @param {Object} recipe - The current recipe being checked.
 * @param {Object} recipeBook - An object containing all recipes.
 * @returns {Array} - List of parent recipes missing ingredients from their child recipes.
 */
export function findRecipesMissingIngredients(recipe, recipeBook) {
  let missingIngredientRecipes = [];

  // Checks if all ingredients of the child are in the parent
  function ingredientsPresentInParent(childIngredients, parentIngredients) {
    return childIngredients.every((childIngredient) => {
      return parentIngredients.some(
        (parentIngredient) =>
          parentIngredient.id === childIngredient.id &&
          parentIngredient.isFlour === childIngredient.isFlour &&
          parentIngredient.isLiquid === childIngredient.isLiquid
      );
    });
  }

  // For each nested recipe of the current recipe
  recipe.nestedRecipes.forEach((nestedRecipeRef) => {
    const nestedRecipe = recipeBook.recipes.get(nestedRecipeRef.id);

    // If an ingredient from the child isn't found in the parent
    if (
      !ingredientsPresentInParent(nestedRecipe.ingredients, recipe.ingredients)
    ) {
      missingIngredientRecipes.push(recipe.name); // Add parent to the list
    }

    // Recursively check the child's nested recipes
    const nestedMissing = findRecipesMissingIngredients(
      nestedRecipe,
      recipeBook
    );
    // Concatenate results from deeper nested checks
    missingIngredientRecipes = missingIngredientRecipes.concat(nestedMissing);
  });

  // Return only unique recipe names
  return [...new Set(missingIngredientRecipes)];
}

// Usage
// const faultyRecipes = findRecipesMissingIngredients(mainRecipe, recipeBook);
// console.log(faultyRecipes);
