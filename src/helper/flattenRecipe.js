import { FlattenedRecipeItem } from "../classes/FlattenedRecipeItem";

export function flattenRecipe(id, recipeBook) {
  const flattenedRecipe = [];
  let sequenceCounter = 0;

  buildFlattenedRecipe(id);

  return flattenedRecipe;

  function buildFlattenedRecipe(id, currentDepth = 0, recipePercentage = 1) {
    const { name, ingredients, includedRecipes } = recipeBook.recipes.get(id);
    let flourWeightTotal = 0;
    let hasFlour = false;
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
          false,
          false
        )
      );

      if (isFlour) {
        hasFlour = true;
        flourWeightTotal += percentage;
      }
    });

    if (hasFlour && flourWeightTotal !== 1) {
      recipeItem.isFaultyRecipe = true;
      recipeItem.recipeTotalFlourNot100 = true;
      markFlourItemsAsFaulty(currentDepth);
    }

    const directChildRecipeSeqNumbers = [];

    includedRecipes.forEach((includedRecipe) => {
      const { directChildRecipeSeqNum, faultyRecipeInfo } =
        buildFlattenedRecipe(
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

      directChildRecipeSeqNumbers.push(directChildRecipeSeqNum);

      if (
        faultyRecipeInfo.found &&
        faultyRecipeInfo.depth > deepestFaultyRecipeInfo.depth
      ) {
        deepestFaultyRecipeInfo = faultyRecipeInfo;
      }
    });

    // Process each direct child recipe sequence number
    directChildRecipeSeqNumbers.forEach((childRecipeSeqNum) => {
      let childIngredientSeqNum = childRecipeSeqNum + 1;

      // Iterate through the ingredients of the child recipe
      while (isIngredient(childIngredientSeqNum)) {
        let parentIngredientSeqNum = recipeItem.sequenceNumber + 1;
        let ingredientMatchFound = false;

        // Compare ingredients in the parent recipe
        while (isIngredient(parentIngredientSeqNum)) {
          if (isSameIngredient(childIngredientSeqNum, parentIngredientSeqNum)) {
            ingredientMatchFound = true;
            break;
          }
          parentIngredientSeqNum++;
        }

        // Update recipe details based on ingredient match
        updateRecipeDetails(
          recipeItem,
          parentIngredientSeqNum,
          childRecipeSeqNum,
          childIngredientSeqNum,
          ingredientMatchFound
        );

        childIngredientSeqNum++;
      }
    });

    if (recipeItem.isFaultyRecipe) {
      if (
        !deepestFaultyRecipeInfo.found ||
        currentDepth > deepestFaultyRecipeInfo.depth
      ) {
        recipeItem.isDeepestFaultyRecipe = true;
        deepestFaultyRecipeInfo = { found: true, depth: currentDepth };
      }
    }

    return {
      directChildRecipeSeqNum: recipeItem.sequenceNumber,
      faultyRecipeInfo: deepestFaultyRecipeInfo,
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
  function isIngredient(sequenceNumber) {
    return (
      flattenedRecipe[sequenceNumber] &&
      !flattenedRecipe[sequenceNumber].isRecipe
    );
  }

  function isSameIngredient(childSeqNum, parentSeqNum) {
    const childIngredient = flattenedRecipe[childSeqNum];
    const parentIngredient = flattenedRecipe[parentSeqNum];
    return (
      childIngredient.id === parentIngredient.id &&
      childIngredient.isFLour === parentIngredient.isFLour &&
      childIngredient.isLiquid === parentIngredient.isLiquid
    );
  }

  function updateRecipeDetails(
    recipeItem,
    parentIngredientSeqNum,
    childRecipeSeqNum,
    childIngredientSeqNum,
    ingredientMatchFound
  ) {
    if (ingredientMatchFound) {
      flattenedRecipe[parentIngredientSeqNum].stepPercentage -=
        flattenedRecipe[childIngredientSeqNum].percentage *
        flattenedRecipe[childRecipeSeqNum].percentage;
      if (flattenedRecipe[parentIngredientSeqNum].stepPercentage < 0) {
        recipeItem.recipeHasNegativeStepPercentage = true;
        recipeItem.isFaultyRecipe = true;
      }
    } else {
      recipeItem.isFaultyRecipe = true;
      flattenedRecipe[
        childIngredientSeqNum
      ].ingredientIsMissingInParentRecipe = true;
      flattenedRecipe[
        childRecipeSeqNum
      ].recipeHasMissingIngredientsInParentRecipe = true;
      recipeItem.recipeIsMissingIngredientsPresentInChildren = true;
    }
  }
}
