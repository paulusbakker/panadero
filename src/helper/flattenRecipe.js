import { FlattenedRecipeItem } from "../classes/FlattenedRecipeItem";

export function flattenRecipe(recipe, recipeBook) {
  const flattenedRecipe = [];

  function buildFlattenedRecipe(
    recipe,
    parentRecipe,
    currentDepth,
    recipePercentage
  ) {
    flattenedRecipe.push(
      new FlattenedRecipeItem(
        true,
        recipe.name,
        currentDepth,
        false,
        false,
        recipePercentage,
        0
      )
    );

    recipe.ingredients.forEach((ingredient) => {
      const { id, isFlour, isLiquid, percentage } = ingredient;
      const ingredientName = recipeBook.ingredients.get(id).name;
      flattenedRecipe.push(
        new FlattenedRecipeItem(
          false,
          ingredientName,
          currentDepth,
          isFlour,
          isLiquid,
          percentage,
          recipeBook.ingredients.get(id).pricePerKilo
        )
      );


      // find the corresponding ingredient in the mother recipe
      const parentRecipeItemToBeAltered = flattenedRecipe.findIndex(
        (recipeItem) => {
          return (
            recipeItem.name === ingredientName &&
            recipeItem.isFlour === isFlour &&
            recipeItem.isLiquid === isLiquid &&
            recipeItem.depth === currentDepth - 1
          );
        }
      );
      // if found subtract ingredient from the corresponding ingredient in the mother recipe
      if (parentRecipeItemToBeAltered >= 0)
        flattenedRecipe[parentRecipeItemToBeAltered].stepPercentage -=
          ingredient.percentage * recipePercentage;
    });

    currentDepth++;
    for (let nestedRecipe of recipe.nestedRecipes) {
      buildFlattenedRecipe(
        recipeBook.recipes.get(nestedRecipe.id),
        recipe,
        currentDepth,
        nestedRecipe.percentage
      );
    }
    currentDepth--;
  }

  buildFlattenedRecipe(recipe, null, 0, 1, recipeBook);
  return flattenedRecipe;
}


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
