import { FlattenedRecipeItem } from "../classes/FlattenedRecipeItem";

export function flattenRecipe(id, recipeBook) {
  const flattenedRecipe = [];
  let sequenceCounter = 0;

  function ingredientPresentInParent(childIngredient, parentIngredients) {
    return parentIngredients.some(
      (parentIngredient) =>
        parentIngredient.id === childIngredient.id &&
        parentIngredient.isFlour === childIngredient.isFlour &&
        parentIngredient.isLiquid === childIngredient.isLiquid
    );
  }

  function buildFlattenedRecipe(
    id,
    currentDepth = 0,
    recipePercentage = 1,
    parentIngredients = []
  ) {
    const { name, ingredients, includedRecipes } = recipeBook.recipes.get(id);

    // const isMissing = currentDepth !== 0 && !ingredientsPresentInParent(ingredients, parentIngredients);

    flattenedRecipe.push(
      new FlattenedRecipeItem(
        sequenceCounter++,
        id,
        true,
        name,
        currentDepth,
        false,
        false,
        recipePercentage,
        0,
        false
      )
    );

    ingredients.forEach((ingredient) => {
      const { id, isFlour, isLiquid, percentage } = ingredient;
      const { name, pricePerKilo } = recipeBook.ingredients.get(id);
      const isMissing =
        currentDepth !== 0 &&
        !ingredientPresentInParent(ingredient, parentIngredients);

      if (isMissing) {
        let tempSequenceCounter = sequenceCounter;
        do {
          tempSequenceCounter--;
        } while (!flattenedRecipe[tempSequenceCounter].isRecipe);
        flattenedRecipe[tempSequenceCounter].isMissing = true;
      }

      flattenedRecipe.push(
        new FlattenedRecipeItem(
          sequenceCounter++,
          id,
          false,
          name,
          currentDepth,
          isFlour,
          isLiquid,
          percentage,
          pricePerKilo,
          isMissing
        )
      );

      updateParentRecipeItemPercentage(
        name,
        isFlour,
        isLiquid,
        currentDepth,
        percentage * recipePercentage
      );
    });

    includedRecipes.forEach((includedRecipe) => {
      buildFlattenedRecipe(
        includedRecipe.id,
        currentDepth + 1,
        includedRecipe.percentage,
        ingredients.map((ingredient) => ({
          id: ingredient.id,
          isFlour: ingredient.isFlour,
          isLiquid: ingredient.isLiquid,
        }))
      );
    });
  }

  function updateParentRecipeItemPercentage(
    ingredientName,
    isFlour,
    isLiquid,
    currentDepth,
    deductionAmount
  ) {
    const parentRecipeItemIndex = findParentRecipeItemIndex(
      ingredientName,
      isFlour,
      isLiquid,
      currentDepth
    );
    if (parentRecipeItemIndex >= 0) {
      flattenedRecipe[parentRecipeItemIndex].stepPercentage -= deductionAmount;
    }
  }

  function findParentRecipeItemIndex(
    ingredientName,
    isFlour,
    isLiquid,
    currentDepth
  ) {
    for (let i = flattenedRecipe.length - 1; i >= 0; i--) {
      const recipeItem = flattenedRecipe[i];
      if (
        recipeItem.name === ingredientName &&
        recipeItem.isFlour === isFlour &&
        recipeItem.isLiquid === isLiquid &&
        recipeItem.depth === currentDepth - 1
      ) {
        return i;
      }
    }
    return -1;
  }

  buildFlattenedRecipe(id);
  return flattenedRecipe;
}
