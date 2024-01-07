import { calculateTotalOverallLiquidPercentage } from "./calculateTotalOverallLiquidPercentage";

export function calculateAmounts(flattenedRecipe, weight, itemIdOrTotal, stepsMode) {
  console.log(flattenedRecipe);
  console.log('weight', weight);
  console.log('itemIdOrTotal', itemIdOrTotal);
  console.log('stepsMode', stepsMode);

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

  const overallTotalLiquidPercentage =
    calculateTotalOverallLiquidPercentage(flattenedRecipe);

  let totalFlourWeight, totalLiquidWeight;
  let totalIngredientPercentage = 0;

  switch (itemIdOrTotal) {
    case "total flour":
      totalFlourWeight = weight;
      totalLiquidWeight = weight * overallTotalLiquidPercentage;
      break;
    case "total liquid":
      totalFlourWeight = weight / overallTotalLiquidPercentage;
      totalLiquidWeight = weight;
      break;
    case "total recipe":
      totalIngredientPercentage = calculateTotalIngredientPercentage(0);
      totalFlourWeight = weight / totalIngredientPercentage;
      totalLiquidWeight = totalFlourWeight * overallTotalLiquidPercentage;
      break;
    default:
      if (!flattenedRecipe[itemIdOrTotal].isRecipe) {
        !stepsMode
          ? (totalFlourWeight = weight / flattenedRecipe[itemIdOrTotal].percentage)
          : (totalFlourWeight = weight / flattenedRecipe[itemIdOrTotal].stepPercentage);

        while (!flattenedRecipe[itemIdOrTotal].isRecipe) {
          itemIdOrTotal--;
        }
      } else {
        totalIngredientPercentage = calculateTotalIngredientPercentage(itemIdOrTotal);
        totalFlourWeight = weight / totalIngredientPercentage;
      }

      while (itemIdOrTotal > 0) {
        totalFlourWeight = totalFlourWeight / flattenedRecipe[itemIdOrTotal].percentage;
        itemIdOrTotal = findParentRecipe(itemIdOrTotal);
      }
  }

  const totalFlourWeightHistory = [];
  let currentDepth = -1;

  for (const [itemIdOrTotal, recipeItem] of flattenedRecipe.entries()) {
    const { isRecipe, depth, percentage, stepPercentage } = recipeItem;
    if (isRecipe) {
      if (depth > currentDepth) {
        totalFlourWeight = totalFlourWeight * percentage;
        totalIngredientPercentage = calculateTotalIngredientPercentage(itemIdOrTotal);
        totalFlourWeightHistory.push(totalFlourWeight);
        currentDepth++;
      } else {
        do {
          totalFlourWeightHistory.pop();
          currentDepth--;
        } while (depth <= currentDepth);
        totalFlourWeight =
          totalFlourWeightHistory[totalFlourWeightHistory.length - 1] * percentage;
        totalIngredientPercentage = calculateTotalIngredientPercentage(itemIdOrTotal);
      }
      recipeItem.weight = recipeItem.stepWeight =
        totalFlourWeight * totalIngredientPercentage;
      continue;
    }

    recipeItem.weight = percentage * totalFlourWeight;
    recipeItem.stepWeight = stepPercentage * totalFlourWeight;
  }

  totalLiquidWeight = totalFlourWeightHistory[0] * overallTotalLiquidPercentage;

  let totalPrice = 0;
  flattenedRecipe.slice(1).forEach((recipeItem) => {
    if (recipeItem.depth === 0) {
      const price = (recipeItem.pricePerKilo / 1000) * recipeItem.weight;
      recipeItem.price = price;
      totalPrice += price;
    }
  });
  flattenedRecipe[0].price = totalPrice;
  flattenedRecipe[0].pricePerKilo = (totalPrice / flattenedRecipe[0].weight) * 1000;

  return [flattenedRecipe, totalFlourWeightHistory[0], totalLiquidWeight];
}
