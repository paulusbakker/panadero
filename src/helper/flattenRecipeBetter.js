import { FlattenedRecipeItem } from "../classes/FlattenedRecipeItem";

export function flattenRecipe(id, recipeBook) {
  const flattenedRecipe = [];
  let sequenceCounter = 0;

  buildFlattenedRecipe(id);

  // markDeepestFaultyRecipes();

  return flattenedRecipe;

  function buildFlattenedRecipe(
    id,
    currentDepth = 0,
    recipePercentage = 1,
    parentIngredients = []
  ) {
    const { name, ingredients, includedRecipes } = recipeBook.recipes.get(id);
    let flourWeightTotal = 0;
    let hasFlour = false;
    let parentRecipeHasMissingIngredients = false;
    let setRecipeHasMissingIngredients = false;
    let setRecipeHasNegativeStepPercentage = false;
    let parentRecipeHasNegativeStepPercentage = false;
    let deepestFaultyRecipeInfo = { found: false, depth: -1 };

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
        parentRecipeHasMissingIngredients = true;
        recipeItem.ingredientIsMissingInParentRecipe = true;
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

      const negativeStepPercentage =
        updateStepPercentageOfIngredientInParentRecipe(
          id,
          isFlour,
          isLiquid,
          currentDepth,
          percentage * recipePercentage
        );
      if (negativeStepPercentage) {
        parentRecipeHasNegativeStepPercentage = true;
      } else return false;
    });

    if (parentRecipeHasMissingIngredients) {
      recipeItem.recipeHasMissingIngredientsInParentRecipe = true;
    }

    if (hasFlour && flourWeightTotal !== 1) {
      recipeItem.isFaultyRecipe = true;
      recipeItem.flourTotalNot100Percent = true;
      markFlourItemsAsFaulty(currentDepth);
    //   updateDeepestFaultyRecipe(recipeSequenceNumber, currentDepth);
    }

    includedRecipes.forEach((includedRecipe) => {
      const {
        recipeHasMissingIngredients,
        recipeHasNegativeStepPercentage,
        faultyRecipeInfo,
      } = buildFlattenedRecipe(
        includedRecipe.id,
        currentDepth + 1,
        includedRecipe.percentage,
        ingredients.map((ingredient) => ({
          id: ingredient.id,
          isFlour: ingredient.isFlour,
          isLiquid: ingredient.isLiquid,
        })),
        false
      );
      console.log(recipeHasMissingIngredients, recipeHasNegativeStepPercentage);
      if (recipeHasMissingIngredients) {
        setRecipeHasMissingIngredients = true;
      }

      if (recipeHasNegativeStepPercentage) {
        setRecipeHasNegativeStepPercentage = true;
      }

      if (faultyRecipeInfo.found && (faultyRecipeInfo.depth > deepestFaultyRecipeInfo.depth)) {
        deepestFaultyRecipeInfo = faultyRecipeInfo;
      }
    });

    if (setRecipeHasMissingIngredients) {
      recipeItem.isMissingIngredientsFromChildRecipe = true;
      recipeItem.isFaultyRecipe = true;
    }
    if (setRecipeHasNegativeStepPercentage) {
      recipeItem.recipeHasNegativeStepPercentage = true;
      recipeItem.isFaultyRecipe = true;
    }

    if (recipeItem.isFaultyRecipe) {
      if (!deepestFaultyRecipeInfo.found || currentDepth > deepestFaultyRecipeInfo.depth) {
        recipeItem.isDeepestFaultyRecipe = true;
        deepestFaultyRecipeInfo = { found: true, depth: currentDepth };
      }
    }
 
    return {
      recipeHasMissingIngredients: parentRecipeHasMissingIngredients,
      recipeHasNegativeStepPercentage: parentRecipeHasNegativeStepPercentage,
      faultyRecipeInfo: deepestFaultyRecipeInfo
    };
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
    ingredientId,
    isFlour,
    isLiquid,
    currentDepth,
    deductionAmount
  ) {
    const indexOfIngredientInParentRecipe = findIndexOfIngredientInParentRecipe(
      ingredientId,
      isFlour,
      isLiquid,
      currentDepth
    );
    if (indexOfIngredientInParentRecipe >= 0) {
      flattenedRecipe[indexOfIngredientInParentRecipe].stepPercentage -=
        deductionAmount;
      if (flattenedRecipe[indexOfIngredientInParentRecipe].stepPercentage < 0)
        return true;
    }
    return false;
  }

  function findIndexOfIngredientInParentRecipe(
    ingredientId,
    isFlour,
    isLiquid,
    currentDepth
  ) {
    for (let i = flattenedRecipe.length - 1; i >= 0; i--) {
      const recipeItem = flattenedRecipe[i];
      if (
        recipeItem.id === ingredientId &&
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
