import { calculateTotalOverallLiquidPercentage } from "./calculateTotalOverallLiquidPercentage";

export function calculateAmounts(flattenedRecipe, weight, index, stepsMode) {
  console.log(flattenedRecipe);

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
  const overalTotallLiquidPercentage =
    calculateTotalOverallLiquidPercentage(flattenedRecipe);
  // for (let currentIndex = 1; currentIndex < flattenedRecipe.length; currentIndex++) {
  //     const ingredient = flattenedRecipe[currentIndex]
  //     if (ingredient.isRecipe) {
  //         break
  //     }
  //     if (ingredient.isLiquid) calculateTotalOverallLiquidPercentage += ingredient.percentage
  // }
  let totalFlourWeight, totalLiquidWeight;
  let totalIngredientPercentage = 0;
  switch (index) {
    case "total flour":
      totalFlourWeight = weight;
      totalLiquidWeight = weight * overalTotallLiquidPercentage;
      break;
    case "total liquid":
      totalFlourWeight = weight / overalTotallLiquidPercentage;
      totalLiquidWeight = weight;
      break;
    case "total recipe":
      totalIngredientPercentage = calculateTotalIngredientPercentage(0);
      totalFlourWeight = weight / totalIngredientPercentage;
      totalLiquidWeight = totalFlourWeight * overalTotallLiquidPercentage;
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

      // calculate weight in root recipe:
      while (index > 0) {
        totalFlourWeight = totalFlourWeight / flattenedRecipe[index].percentage;
        index = findParentRecipe(index);
      }
  }

  // calculate weights of all ingredients
  const totalFlourWeightHistory = [];
  let currentDepth = -1;
  for (const [index, recipeItem] of flattenedRecipe.entries()) {

    const { isRecipe, depth, percentage, stepPercentage } = recipeItem;
    if (isRecipe) {
      if (depth > currentDepth) {
        totalFlourWeight = totalFlourWeight * percentage;
        totalIngredientPercentage = calculateTotalIngredientPercentage(index);
        recipeItem.weight = recipeItem.stepWeight =
          totalFlourWeight * totalIngredientPercentage;
        totalFlourWeightHistory.push(totalFlourWeight);
        currentDepth++;
      } else {
        do {
          totalFlourWeightHistory.pop();
          currentDepth--;
        } while (depth < currentDepth);

        totalFlourWeight =
          totalFlourWeightHistory[totalFlourWeightHistory.length - 1] *
          percentage;
        totalIngredientPercentage = calculateTotalIngredientPercentage(index);
        recipeItem.weight = recipeItem.stepWeight =
          totalFlourWeight * totalIngredientPercentage;
      }
      continue;
    }

    // not a recipe
    recipeItem.weight = percentage * totalFlourWeight;
    recipeItem.stepWeight = stepPercentage * totalFlourWeight;
  }

  totalLiquidWeight = totalFlourWeightHistory[0] * overalTotallLiquidPercentage;

  let totalPrice = 0;
  flattenedRecipe.slice(1).forEach((recipeItem) => {
    if (recipeItem.depth === 0) {
      const price = (recipeItem.pricePerKilo / 1000) * recipeItem.weight;
      recipeItem.price = price;
      totalPrice += price;
    }
  });
  flattenedRecipe[0].price = totalPrice;
  console.log(flattenedRecipe);
  flattenedRecipe[0].pricePerKilo =
    (totalPrice / flattenedRecipe[0].weight) * 1000;
  return [flattenedRecipe, totalFlourWeightHistory[0], totalLiquidWeight];
}

// let calculateTotalOverallLiquidPercentage = 0
// flattenedRecipe.forEach((recipeItem) => {
//     if (recipeItem.isRecipe) {
//         return
//     }
//     if (recipeItem.isLiquid) {
//         calculateTotalOverallLiquidPercentage += recipeItem.percentage
//     }
// })
// = calculateTotalOverallLiquidPercentage * totalFlourWeightHistory[0]
// let totalPrice = 0
// flattenedRecipe.slice(1).every(recipeItem=>{
//     if (recipeItem.isRecipe) return false
//     recipeItem.pricePerKilo=recipeBook.ingredients.get(recipeItem.id).pricePerKilo
// })
