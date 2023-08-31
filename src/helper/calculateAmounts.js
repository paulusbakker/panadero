import { calculateTotalOveralLiquidPercentage } from "./calculateTotalOveralLiquidPercentage";

export function calculateAmounts(flattenedRecipe, weight, index, stepsMode) {
  // find parent recipe
  function findParentRecipe(currentIndex) {
    const currentDepth = flattenedRecipe[currentIndex].depth;
    let parentIndex = currentIndex;

    while (parentIndex > 0) {
      const isParentRecipe =
        flattenedRecipe[parentIndex].depth === currentDepth - 1 &&
        flattenedRecipe[parentIndex].isRecipe;

      if (isParentRecipe) {
        return parentIndex;
      }

      parentIndex--;
    }
    return 0;
  }

  // calculate total percentage of all ingredients in recipe, currentIndex = recipeItem where recipe begins
  function calculateTotalIngredientPercentage(currentIndex) {
    let totalIngredientPercentage = 0;
    for (let i = currentIndex + 1; i < flattenedRecipe.length; i++) {
      const ingredient = flattenedRecipe[i];
      if (ingredient.isRecipe) {
        break;
      }
      totalIngredientPercentage += ingredient.percentage;
    }
    return totalIngredientPercentage;
  }

  // calculate total percentage of liquids
  const overalTotalLiquidPercentage =
    calculateTotalOveralLiquidPercentage(flattenedRecipe);
  // for (let currentIndex = 1; currentIndex < flattenedRecipe.length; currentIndex++) {
  //     const ingredient = flattenedRecipe[currentIndex]
  //     if (ingredient.isRecipe) {
  //         break
  //     }
  //     if (ingredient.isLiquid) calculateTotalOveralLiquidPercentage += ingredient.percentage
  // }
  let totalFlourWeight, totalLiquidWeight;
  let totalIngredientPercentage = 0;
  switch (index) {
    case "total flour":
      totalFlourWeight = weight;
      totalLiquidWeight = weight * overalTotalLiquidPercentage;
      break;
    case "total liquid":
      totalFlourWeight = weight / overalTotalLiquidPercentage;
      totalLiquidWeight = weight;
      break;
    case "total recipe":
      totalIngredientPercentage = calculateTotalIngredientPercentage(0);
      totalFlourWeight = weight / totalIngredientPercentage;
      totalLiquidWeight = totalFlourWeight * overalTotalLiquidPercentage;
      break;
    default:
      // if index is negative , it was sent from the dough minus predoughs section
      // let minusPredoughs = false;
      // Object.is(index, -0) needed to detect the index=-0 in case of first minus predough item
      // if (index < 0 || Object.is(index, -0)) {
      //   index = -index;
      //   minusPredoughs = true;
      // }

      // add 1 to index because the received index is one number too low because of the sliced off recipe title
      index++;
      // first calculate the weight of 100% flour of the recipe where the index is in:
      if (!flattenedRecipe[index].isRecipe) {
        // stepsMode means user input from the ingredients minus predoughs section
        !stepsMode
          ? (totalFlourWeight = weight / flattenedRecipe[index].percentage)
          : (totalFlourWeight = weight / flattenedRecipe[index].stepPercentage);
        // go up until index at a recipe:
        while (!flattenedRecipe[index].isRecipe) {
          index--;
        }
      } else {
        totalIngredientPercentage = calculateTotalIngredientPercentage(index);
        totalFlourWeight = weight / totalIngredientPercentage;
      }

      // calculate weight in the recipe above until ending up in the root:
      while (index > 0) {
        totalFlourWeight = totalFlourWeight / flattenedRecipe[index].percentage;
        index = findParentRecipe(index);
      }
  }

  // calculate weights of all ingredients
  const totalFlourWeightHistory = [];
  let currentDepth = -1;

  // flattenedRecipeItem.entries() returns for example
  // index=1, recipeItem={ "isRecipe": false, "name": "Tarwemeel De Vriendschap", "depth": 0, etc }
  for (const [index, recipeItem] of flattenedRecipe.entries()) {
    const { isRecipe, depth, percentage, stepPercentage } = recipeItem;
    if (isRecipe) {
      // depth > currentDepth means new recipe is included
      if (depth > currentDepth) {
        totalFlourWeight = totalFlourWeight * percentage;
        totalIngredientPercentage = calculateTotalIngredientPercentage(index);
        totalFlourWeightHistory.push(totalFlourWeight);
        currentDepth++;
      }
      // get flourWeight belonging to the mother recipe
      else {
        do {
          totalFlourWeightHistory.pop();
          currentDepth--;
        } while (depth <= currentDepth);
        totalFlourWeight =
          totalFlourWeightHistory[totalFlourWeightHistory.length - 1] *
          percentage;
        totalIngredientPercentage = calculateTotalIngredientPercentage(index);
      }
      recipeItem.weight = recipeItem.stepWeight =
        totalFlourWeight * totalIngredientPercentage;
      continue;
    }

    // calculate weights in case of an ingredient and not a recipe
    recipeItem.weight = percentage * totalFlourWeight;
    recipeItem.stepWeight = stepPercentage * totalFlourWeight;
  }

  totalLiquidWeight = totalFlourWeightHistory[0] * overalTotalLiquidPercentage;

  let totalPrice = 0;
  flattenedRecipe.slice(1).forEach((recipeItem) => {
    if (recipeItem.depth === 0) {
      const price = (recipeItem.pricePerKilo / 1000) * recipeItem.weight;
      recipeItem.price = price;
      totalPrice += price;
    }
  });
  flattenedRecipe[0].price = totalPrice;
  flattenedRecipe[0].pricePerKilo =
    (totalPrice / flattenedRecipe[0].weight) * 1000;
  return [flattenedRecipe, totalFlourWeightHistory[0], totalLiquidWeight];
}

