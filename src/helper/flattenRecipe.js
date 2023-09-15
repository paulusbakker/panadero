import { FlattenedRecipeItem } from "../classes/FlattenedRecipeItem";

export function flattenRecipe(id, recipeBook) {
  // This will hold the final flattened recipe
  const flattenedRecipe = [];

  function buildFlattenedRecipe(id, currentDepth = 0, recipePercentage = 1) {
    const { name, ingredients, nestedRecipes } = recipeBook.recipes.get(id);

    // Add the main recipe item to the flattened list
    flattenedRecipe.push(new FlattenedRecipeItem(true, name, currentDepth, false, false, recipePercentage, 0));

    // Process each ingredient of the recipe
    ingredients.forEach((ingredient) => {
      const { id, isFlour, isLiquid, percentage } = ingredient;
      const { name: ingredientName, pricePerKilo } = recipeBook.ingredients.get(id);

      // Add the ingredient to the flattened list
      flattenedRecipe.push(new FlattenedRecipeItem(false, ingredientName, currentDepth, isFlour, isLiquid, percentage, pricePerKilo));

      // Deduct the percentage from the parent recipe, if applicable
      updateParentRecipeItemPercentage(ingredientName, isFlour, isLiquid, currentDepth, percentage * recipePercentage);
    });

    // Process nested recipes recursively
    nestedRecipes.forEach(nestedRecipe => {
      buildFlattenedRecipe(nestedRecipe.id, currentDepth + 1, nestedRecipe.percentage);
    });
  }

  /**
   * Updates the percentage of the parent recipe item in the flattened list based on a child ingredient.
   * @param {string} ingredientName - Name of the ingredient.
   * @param {boolean} isFlour - Indicates if the ingredient is flour.
   * @param {boolean} isLiquid - Indicates if the ingredient is liquid.
   * @param {number} currentDepth - Current nesting level.
   * @param {number} deductionAmount - The amount to deduct from the parent recipe percentage.
   */
  function updateParentRecipeItemPercentage(ingredientName, isFlour, isLiquid, currentDepth, deductionAmount) {
    const parentRecipeItemIndex = findParentRecipeItemIndex(ingredientName, isFlour, isLiquid, currentDepth);
    if (parentRecipeItemIndex >= 0) {
      flattenedRecipe[parentRecipeItemIndex].stepPercentage -= deductionAmount;
    }
  }

  /**
   * Finds the index of the parent recipe item in the flattened list for a given ingredient.
   * @param {string} ingredientName - Name of the ingredient.
   * @param {boolean} isFlour - Indicates if the ingredient is flour.
   * @param {boolean} isLiquid - Indicates if the ingredient is liquid.
   * @param {number} currentDepth - Current nesting level.
   * @returns {number} - Index of the parent recipe item, or -1 if not found.
   */
  function findParentRecipeItemIndex(ingredientName, isFlour, isLiquid, currentDepth) {
    return flattenedRecipe.findIndex(recipeItem => (
        recipeItem.name === ingredientName &&
        recipeItem.isFlour === isFlour &&
        recipeItem.isLiquid === isLiquid &&
        recipeItem.depth === currentDepth - 1
    ));
  }

  // Start the flattening process with the main recipe
  buildFlattenedRecipe(id);
  return flattenedRecipe;
}

// old codes
// import { FlattenedRecipeItem } from "../classes/FlattenedRecipeItem";
//
// export function flattenRecipe(recipe, recipeBook) {
//   const flattenedRecipe = [];
//
//   function buildFlattenedRecipe(
//     recipe,
//     parentRecipe,
//     currentDepth,
//     recipePercentage
//   ) {
//     flattenedRecipe.push(
//       new FlattenedRecipeItem(
//         true,
//         recipe.name,
//         currentDepth,
//         false,
//         false,
//         recipePercentage,
//         0
//       )
//     );
//
//     recipe.ingredients.forEach((ingredient) => {
//       const { id, isFlour, isLiquid, percentage } = ingredient;
//       const ingredientName = recipeBook.ingredients.get(id).name;
//       flattenedRecipe.push(
//         new FlattenedRecipeItem(
//           false,
//           ingredientName,
//           currentDepth,
//           isFlour,
//           isLiquid,
//           percentage,
//           recipeBook.ingredients.get(id).pricePerKilo
//         )
//       );
//
//
//       // find the corresponding ingredient in the mother recipe
//       const parentRecipeItemToBeAltered = flattenedRecipe.findIndex(
//         (recipeItem) => {
//           return (
//             recipeItem.name === ingredientName &&
//             recipeItem.isFlour === isFlour &&
//             recipeItem.isLiquid === isLiquid &&
//             recipeItem.depth === currentDepth - 1
//           );
//         }
//       );
//       // if found subtract ingredient from the corresponding ingredient in the mother recipe
//       if (parentRecipeItemToBeAltered >= 0)
//         flattenedRecipe[parentRecipeItemToBeAltered].stepPercentage -=
//           ingredient.percentage * recipePercentage;
//     });
//
//     currentDepth++;
//     for (let nestedRecipe of recipe.nestedRecipes) {
//       buildFlattenedRecipe(
//         recipeBook.recipes.get(nestedRecipe.id),
//         recipe,
//         currentDepth,
//         nestedRecipe.percentage
//       );
//     }
//     currentDepth--;
//   }
//
//   buildFlattenedRecipe(recipe, null, 0, 1, recipeBook);
//   return flattenedRecipe;
// }

// part of another helper?
// // check if all ingredients in the nested recipes all present in the parent recipe
// // not sure if this check belongs here
// let isValidParentRecipe = true
// recipe.ingredients.forEach(ingredient => {
//     const ingredientPresentInParent = nestedParentRecipe ? nestedParentRecipe.ingredients.some(parentRecipeIngredient =>
//         parentRecipeIngredient.id === ingredient.id &&
//         parentRecipeIngredient.flour === ingredient.flour &&
//         parentRecipeIngredient.isLiquid === ingredient.isLiquid) : true
//
//     isValidParentRecipe = ingredientPresentInParent ? isValidParentRecipe : false
//     flattenedRecipe.push
//     (new FlattenedRecipeItem(false,
//         ingredientPresentInParent,
//         currentDepth,
//         ingredient.id,
//         ingredient.isLiquid,
//         ingredient.flour,
//         ingredient.percentage))
// })
// // mark parent recipe as invalid as concluded above
// if (!isValidParentRecipe)
//     for (let recipeListItem = flattenedRecipe.length - 1; recipeListItem >= 0; recipeListItem--) {
//         if (flattenedRecipe[recipeListItem].isRecipe && flattenedRecipe[recipeListItem].currentDepth === currentDepth - 1) {
//             flattenedRecipe[recipeListItem].isValid = false
//             break
//         }
//     }
