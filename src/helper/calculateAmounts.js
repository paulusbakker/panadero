import { TOTAL } from "../shared/constants/constants";
import { calculateTotalOverallLiquidPercentage } from "./calculateTotalOverallLiquidPercentage";

export function calculateAmounts(flattenedRecipe, weight, index, stepsMode) {
  console.log(flattenedRecipe);
  console.log('weight', weight);
  console.log('index', index);
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

  switch (index) {
    case TOTAL.FLOUR:
      totalFlourWeight = weight;
      totalLiquidWeight = weight * overallTotalLiquidPercentage;
      break;
    case TOTAL.LIQUID:
      totalFlourWeight = weight / overallTotalLiquidPercentage;
      totalLiquidWeight = weight;
      break;
    case TOTAL.RECIPE:
      totalIngredientPercentage = calculateTotalIngredientPercentage(0);
      totalFlourWeight = weight / totalIngredientPercentage;
      totalLiquidWeight = totalFlourWeight * overallTotalLiquidPercentage;
      break;
    default:
      if (!flattenedRecipe[index].isRecipe) {
        !stepsMode
          ? (totalFlourWeight = weight / flattenedRecipe[index].percentage)
          : (totalFlourWeight = weight / flattenedRecipe[index].stepPercentage);

        while (!flattenedRecipe[index].isRecipe) {
          index--;
        }
      } else {
        totalIngredientPercentage = calculateTotalIngredientPercentage(index);
        totalFlourWeight = weight / totalIngredientPercentage;
      }

      while (index > 0) {
        totalFlourWeight = totalFlourWeight / flattenedRecipe[index].percentage;
        index = findParentRecipe(index);
      }
  }

  const totalFlourWeightHistory = [];
  let currentDepth = -1;

  for (const [index, recipeItem] of flattenedRecipe.entries()) {
    const { isRecipe, depth, percentage, stepPercentage } = recipeItem;
    if (isRecipe) {
      if (depth > currentDepth) {
        totalFlourWeight = totalFlourWeight * percentage;
        totalIngredientPercentage = calculateTotalIngredientPercentage(index);
        totalFlourWeightHistory.push(totalFlourWeight);
        currentDepth++;
      } else {
        do {
          totalFlourWeightHistory.pop();
          currentDepth--;
        } while (depth <= currentDepth);
        totalFlourWeight =
          totalFlourWeightHistory[totalFlourWeightHistory.length - 1] * percentage;
        totalIngredientPercentage = calculateTotalIngredientPercentage(index);
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
