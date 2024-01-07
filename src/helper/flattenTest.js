import { FlattenedRecipeItem } from "../classes/FlattenedRecipeItem";

export function flattenRecipe(id , recipeBook) {
  const flattenedRecipe = [];

  // Pass the entire parent ingredients array to keep track of all details
  function buildFlattenedRecipe(id , currentDepth = 0, recipePercentage = 1, parentIngredients = []) {
    const { name, ingredients, includedRecipes } = recipeBook.recipes.get(id );

    const currentRecipeItem = new FlattenedRecipeItem(
      id ,
      true,
      name,
      currentDepth,
      false,
      false,
      recipePercentage,
      0
    );

    flattenedRecipe.push(currentRecipeItem);

    const ingredientDetails = ingredients.map(ingredient => ({
      id : ingredient.id ,
      isFlour: ingredient.isFlour,
      isLiquid: ingredient.isLiquid
    }));

    ingredients.forEach((ingredient) => {
      const { id , isFlour, isLiquid, percentage } = ingredient;
      const { name, pricePerKilo } = recipeBook.ingredients.get(id );

      const isMissing = !parentIngredients.some(parentIngredient =>
        parentIngredient.id === id && 
        parentIngredient.isFlour === isFlour &&
        parentIngredient.isLiquid === isLiquid
      );

      const ingredientItem = new FlattenedRecipeItem(
        id ,
        false,
        name,
        currentDepth + 1,
        isFlour,
        isLiquid,
        percentage * recipePercentage, // Calculate the actual percentage
        pricePerKilo,
        isMissing // Check if the ingredient is missing in the parent recipe
      );

      flattenedRecipe.push(ingredientItem);

      updateParentRecipeItemPercentage(
        ingredientItem,
        recipePercentage
      );
    });

    includedRecipes.forEach((includedRecipe) => {
      buildFlattenedRecipe(
        includedRecipe.id ,
        currentDepth + 1,
        includedRecipe.percentage * recipePercentage,
        ingredientDetails // Pass the current recipe's ingredient details as parentIngredients
      );
    });
  }

  function updateParentRecipeItemPercentage(
    ingredientItem,
    recipePercentage
  ) {
    const parentRecipeItemIndex = findParentRecipeItemIndex(ingredientItem);
    if (parentRecipeItemIndex >= 0) {
      flattenedRecipe[parentRecipeItemIndex].stepPercentage -= ingredientItem.percentage * recipePercentage;
    }
  }

  function findParentRecipeItemIndex(ingredientItem) {
    for (let i = flattenedRecipe.length - 1; i >= 0; i--) {
      const recipeItem = flattenedRecipe[i];
      if (
        recipeItem.id === ingredientItem.id &&
        recipeItem.isFlour === ingredientItem.isFlour &&
        recipeItem.isLiquid === ingredientItem.isLiquid &&
        recipeItem.depth === ingredientItem.depth - 1
      ) {
        return i;
      }
    }
    return -1; // Return -1 if no matching parent recipe item is found
  }

  buildFlattenedRecipe(id );
  console.log(flattenedRecipe);
  return flattenedRecipe;
}
