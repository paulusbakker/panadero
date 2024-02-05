import { FlattenedRecipeItem } from "../classes/FlattenedRecipeItem";

export function flattenRecipe(id, recipeBook) {
  const flattenedRecipe = [];
  let sequenceCounter = 0;
  let isValidOverallRecipe = true;

  buildFlattenedRecipe(id);
  console.log(recipeBook);
  console.log(flattenedRecipe);

  return { flattenedRecipe, isValidOverallRecipe };

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

    sortIngredients(ingredients);
    sortIncludedRecipes(includedRecipes);

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
      recipeItem.totalFlourNot100 = true;
      markFlourItemsAsFaulty(sequenceCounter);
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
      isValidOverallRecipe = false;
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
    console.log(currentIndex);
    for (let i = currentIndex-1; i >= 0; i--) {
      if (flattenedRecipe[i].isRecipe) {
        break;
      }
      if (flattenedRecipe[i].isFlour) {
        flattenedRecipe[i].totalFlourNot100 = true;
        flattenedRecipe[i].isFaultyIngredient= true;
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
        flattenedRecipe[parentIngredientSeqNum].isFaultyIngredient=true
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

  // Function to sort ingredients
  function sortIngredients(ingredients) {
    ingredients.sort((a, b) => {
      const categoryOrderA = getCategoryOrder(a);
      const categoryOrderB = getCategoryOrder(b);

      if (categoryOrderA !== categoryOrderB) {
        return categoryOrderA - categoryOrderB;
      }

      if (b.percentage !== a.percentage) {
        return b.percentage - a.percentage; // Sort by descending percentage
      }

      // If percentages are equal, sort by name
      const nameA = recipeBook.ingredients.get(a.id).name;
      const nameB = recipeBook.ingredients.get(b.id).name;
      return nameA.localeCompare(nameB);
    });
  }

  // ... rest of the existing code ...

  // Function to get category order
  function getCategoryOrder(ingredientItem) {
    if (ingredientItem.isFlour) return 1;
    if (ingredientItem.isLiquid) return 2;
    return 3; // Non-flour, non-liquid
  }

  // Function to sort included recipes
  function sortIncludedRecipes(includedRecipes) {
    includedRecipes.sort((a, b) => {
      if (b.percentage !== a.percentage) {
        return b.percentage - a.percentage; // Sort by descending percentage
      }

      const nameA = recipeBook.recipes.get(a.id).name;
      const nameB = recipeBook.recipes.get(b.id).name;
      return nameA.localeCompare(nameB);
    });
  }
}
