import { RecipeIngredient } from "../classes/RecipeIngredient";

export function addIngredientsToParentRecipe(recipe, recipeBook) {
  recipe.nestedRecipes.forEach((includedRecipeReference) => {
    const includedRecipe = recipeBook.recipes.get(includedRecipeReference.id);
    includedRecipe.ingredients.forEach((ingredient) => {
      let found = false;
      for (let parentRecipeIngredient of recipe.ingredients) {
        if (
          parentRecipeIngredient.id === ingredient.id &&
          parentRecipeIngredient.isFlour === ingredient.isFlour &&
          parentRecipeIngredient.isLiquid === ingredient.isLiquid
        ) {
          found = true;
          break;
        }
      }
      if (!found) {
        recipe.ingredients.push(
          new RecipeIngredient(
            ingredient.isFlour,
            ingredient.isLiquid,
            ingredient.id,
            0
          )
        );
      }
    });
  });
  return recipe;
}




