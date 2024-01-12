import { FlattenedRecipeItem } from "../classes/FlattenedRecipeItem";

export function flattenRecipe(id, recipeBook) {
  const flattenedRecipe = [];
  let sequenceCounter = 0;

  buildFlattenedRecipe(id);

  return flattenedRecipe;

  function buildFlattenedRecipe(
    id,
    currentDepth = 0,
    recipePercentage = 1,
    parentIngredients = [],
    parentRecipeIsFaulty = false
  ) {
    const { name, ingredients, includedRecipes } = recipeBook.recipes.get(id);
    let flourWeightTotal = 0;
    let hasFlour = false;
    let markParentAsFaultyWithMissingIngredients = false;
    let currentRecipeIsFaulty = false;

    const recipeItem = new FlattenedRecipeItem(
      sequenceCounter++,
      id,
      true,
      name,
      currentDepth,
      false,
      false,
      recipePercentage,
      0,
      false,
      false
    );

    flattenedRecipe.push(recipeItem);

    ingredients.forEach((ingredientItem) => {
      const { id, isFlour, isLiquid, percentage } = ingredientItem;
      const { name, pricePerKilo } = recipeBook.ingredients.get(id);
      const ingredientIsMissingInParentRecipe =
        currentDepth !== 0 &&
        !ingredientItemPresentInParent(ingredientItem, parentIngredients);

      if (ingredientIsMissingInParentRecipe) {
        markParentAsFaultyWithMissingIngredients = true;
        recipeItem.recipeHasMissingIngredientsInParentRecipe = true;
        // having missing ingredients in the parent doesn't make this recipe faulty
      }

      if (isFlour) {
        hasFlour = true;
        flourWeightTotal += percentage;
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
          ingredientIsMissingInParentRecipe,
          false
        )
      );

      // Update step percentage in parent recipe
      updateStepPercentageOfIngredientInParentRecipe(
        id,
        isFlour,
        isLiquid,
        currentDepth,
        percentage * recipePercentage
      );
    });

    if (hasFlour && flourWeightTotal !== 1) {
      currentRecipeIsFaulty = true;
      recipeItem.isFaultyRecipe = true;
      recipeItem.isDeepestFaultyRecipe = true;
      markFlourItemsAsFaulty(sequenceCounter - 1);
      if (parentRecipeIsFaulty) {
        markParentRecipeNotDeepest(currentDepth);
      }
    }

    includedRecipes.forEach((includedRecipe) => {
      buildFlattenedRecipe(
        includedRecipe.id,
        currentDepth + 1,
        includedRecipe.percentage,
        ingredients.map((ingredient) => ({
          id: ingredient.id,
          isFlour: ingredient.isFlour,
          isLiquid: ingredient.isLiquid,
        })),
        currentRecipeIsFaulty
      );
    });

    if (markParentAsFaultyWithMissingIngredients) {
      updateParentRecipeStatus(
        currentDepth,
        !currentRecipeIsFaulty, // Set to false if current recipe is faulty, otherwise true
        true,
        true
      );
    }
  }

  function updateParentRecipeStatus(
    currentDepth,
    setDeepest,
    setFaulty,
    setMissingIngredients
  ) {
    console.log(setDeepest);
    for (let i = flattenedRecipe.length - 1; i >= 0; i--) {
      const recipeItem = flattenedRecipe[i];
      if (recipeItem.isRecipe && recipeItem.depth === currentDepth - 1) {
        recipeItem.isDeepestFaultyRecipe = setDeepest;
        recipeItem.isFaultyRecipe = setFaulty;
        recipeItem.hasMissingNestedIngredients = setMissingIngredients;
        break;
      }
    }
  }

  function markParentRecipeNotDeepest(currentDepth) {
    for (let i = flattenedRecipe.length - 1; i >= 0; i--) {
      const recipeItem = flattenedRecipe[i];
      if (recipeItem.isRecipe && recipeItem.depth === currentDepth - 1) {
        recipeItem.isDeepestFaultyRecipe = false;
        break;
      }
    }
  }

  function markFlourItemsAsFaulty(currentIndex) {
    for (let i = currentIndex; i >= 0; i--) {
      if (flattenedRecipe[i].isRecipe) {
        break;
      }
      if (flattenedRecipe[i].isFlour) {
        flattenedRecipe[i].flourTotalNot100Percent = true;
      }
    }
  }

  function updateStepPercentageOfIngredientInParentRecipe(
    ingredientId, // Use ingredientId instead of ingredientName
    isFlour,
    isLiquid,
    currentDepth,
    deductionAmount
  ) {
    const indexOfIngredientInParentRecipe = findIndexOfIngredientInParentRecipe(
      ingredientId, // Use ingredientId in the searching function
      isFlour,
      isLiquid,
      currentDepth
    );
    if (indexOfIngredientInParentRecipe >= 0) {
      flattenedRecipe[indexOfIngredientInParentRecipe].stepPercentage -=
        deductionAmount;
    }
  }

  function findIndexOfIngredientInParentRecipe(
    ingredientId, // Use ingredientId instead of ingredientName
    isFlour,
    isLiquid,
    currentDepth
  ) {
    for (let i = flattenedRecipe.length - 1; i >= 0; i--) {
      const recipeItem = flattenedRecipe[i];
      if (
        recipeItem.id === ingredientId && // Compare with ingredientId
        recipeItem.isFlour === isFlour &&
        recipeItem.isLiquid === isLiquid &&
        recipeItem.depth === currentDepth - 1
      ) {
        return i;
      }
    }
    return -1;
  }

  function ingredientItemPresentInParent(childIngredient, parentIngredients) {
    return parentIngredients.some(
      (parentIngredient) =>
        parentIngredient.id === childIngredient.id &&
        parentIngredient.isFlour === childIngredient.isFlour &&
        parentIngredient.isLiquid === childIngredient.isLiquid
    );
  }
}
