import { calculateTotalLiquidPercentage } from "./calculateTotalLiquidPercentage";

export function calculateAmounts(flattenedRecipe, weight, index) {
  console.log(index);

  // find parent recipe
  function findParentRecipe(currentIndex) {
    let depth = flattenedRecipe[currentIndex].depth;
    // go up until recipe found with one depth less
    while (
      currentIndex > 0 &&
      !(
        flattenedRecipe[currentIndex].depth === depth - 1 &&
        flattenedRecipe[currentIndex].isRecipe
      )
    ) {
      currentIndex--;
    }
    return currentIndex;
  }

  // calculate total percentage of all ingredients in recipe, index=recipeItem where recipe begins
  function calculateRecipePercentage(currentIndex) {
    let totalRecipePercentage = 0;
    for (let i = currentIndex + 1; i < flattenedRecipe.length; i++) {
      const ingredient = flattenedRecipe[i];
      if (ingredient.isRecipe) {
        break;
      }
      totalRecipePercentage += ingredient.percentage;
    }
    return totalRecipePercentage;
  }

  // calculate total percentage of liquids
  const totalLiquidPercentage = calculateTotalLiquidPercentage(flattenedRecipe);
  // for (let currentIndex = 1; currentIndex < flattenedRecipe.length; currentIndex++) {
  //     const ingredient = flattenedRecipe[currentIndex]
  //     if (ingredient.isRecipe) {
  //         break
  //     }
  //     if (ingredient.isLiquid) calculateTotalLiquidPercentage += ingredient.percentage
  // }
  let totalFlourWeight, totalLiquidWeight;
  let totalRecipePercentage = 0;
  switch (index) {
    case "total flour":
      totalFlourWeight = weight;
      totalLiquidWeight = weight * totalLiquidPercentage;
      break;
    case "total liquid":
      totalFlourWeight = weight / totalLiquidPercentage;
      totalLiquidWeight = weight;
      break;
    case "total recipe":
      totalRecipePercentage = calculateRecipePercentage(0);
      totalFlourWeight = weight / totalRecipePercentage;
      totalLiquidWeight = totalFlourWeight * totalLiquidPercentage;
      break;
    default:
      // if index is negative , it was sent from the dough minus predoughs section
      let minusPredoughs = false;
      // Object.is(index, -0) needed to detect the index=-0 in case of first minus predough item
      if (index < 0 || Object.is(index, -0)) {
        index = -index;
        minusPredoughs = true;
      }

      // add 1 to index because the received index is one number too low because of the sliced off recipe title
      index++;
      // first calculate the weight of 100% flour of the recipe where the index is in:
      if (!flattenedRecipe[index].isRecipe) {
        !minusPredoughs
          ? (totalFlourWeight = weight / flattenedRecipe[index].percentage)
          : (totalFlourWeight = weight / flattenedRecipe[index].stepPercentage);
        // go up until index at a recipe:
        while (!flattenedRecipe[index].isRecipe) {
          index--;
        }
      } else {
        totalRecipePercentage = calculateRecipePercentage(index);
        totalFlourWeight = weight / totalRecipePercentage;
      }

      totalLiquidWeight = totalFlourWeight * totalLiquidPercentage;

      // calculate weight in root recipe:
      while (index > 0) {
        totalFlourWeight = totalFlourWeight / flattenedRecipe[index].percentage;
        index = findParentRecipe(index);
        console.log(totalFlourWeight);
      }
  }

  // calculate weights of all ingredients
  const totalFlourWeightHistory = [];
  let currentDepth = -1;
  for (const [index, recipeItem] of flattenedRecipe.entries()) {
    const { isRecipe, depth, percentage, stepPercentage } = recipeItem;
    if (isRecipe)
      if (depth > currentDepth) {
        totalFlourWeight = totalFlourWeight * percentage;
        totalRecipePercentage = calculateRecipePercentage(index);
        recipeItem.weight = recipeItem.stepWeight =
          totalFlourWeight * totalRecipePercentage;
        totalFlourWeightHistory.push(totalFlourWeight);
        currentDepth++;
      } else {
        while (depth < currentDepth) {
          totalFlourWeightHistory.pop();
          currentDepth--;
        }
      }
    else {
      recipeItem.weight = percentage * totalFlourWeight;
      recipeItem.stepWeight = stepPercentage * totalFlourWeight;
    }
  }

  // let calculateTotalLiquidPercentage = 0
  // flattenedRecipe.forEach((recipeItem) => {
  //     if (recipeItem.isRecipe) {
  //         return
  //     }
  //     if (recipeItem.isLiquid) {
  //         calculateTotalLiquidPercentage += recipeItem.percentage
  //     }
  // })
  // = calculateTotalLiquidPercentage * totalFlourWeightHistory[0]
  // let totalPrice = 0
  // flattenedRecipe.slice(1).every(recipeItem=>{
  //     if (recipeItem.isRecipe) return false
  //     recipeItem.pricePerKilo=recipeBook.ingredients.get(recipeItem.id).pricePerKilo
  // })
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

