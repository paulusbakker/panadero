export function findRecipesMissingIngredients(recipeId, recipeBook) {
  let missingIngredientRecipes = [];

  // Gets the current recipe by its ID
  const recipe = recipeBook.recipes.get(recipeId);

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

  recipe.nestedRecipes.forEach((nestedRecipeRef) => {
    const nestedRecipe = recipeBook.recipes.get(nestedRecipeRef.id);

    if (!ingredientsPresentInParent(nestedRecipe.ingredients, recipe.ingredients)) {
      missingIngredientRecipes.push(recipeId); // Add parent ID to the list
    }

    const nestedMissing = findRecipesMissingIngredients(nestedRecipeRef.id, recipeBook);
    missingIngredientRecipes = missingIngredientRecipes.concat(nestedMissing);
  });

  return [...new Set(missingIngredientRecipes)];
}

// Usage
// const faultyRecipes = findRecipesMissingIngredients(mainRecipeId, recipeBook);
// console.log(faultyRecipes);
