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
      isFaultyParentRecipe = false
    ) {
      const { name, ingredients, includedRecipes } = recipeBook.recipes.get(id);
      let currentRecipeIsFaulty = isFaultyParentRecipe;
      let flourWeightTotal = 0;
      let hasFlour = false;
  
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
        currentRecipeIsFaulty
      );
  
      flattenedRecipe.push(recipeItem);

      let updateParentRequired = false;
  
      ingredients.forEach((ingredient) => {
        const { id, isFlour, isLiquid, percentage } = ingredient;
        const { name, pricePerKilo } = recipeBook.ingredients.get(id);
        const isMissingInParentRecipe =
          currentDepth !== 0 &&
          !ingredientPresentInParent(ingredient, parentIngredients);
  
        if (isMissingInParentRecipe) {
          updateParentRequired = true;
          recipeItem.isMissingInParentRecipe = true;
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
            isMissingInParentRecipe,
            false
          )
        );
  
        updateParentRecipeItemPercentage(
          id,
          isFlour,
          isLiquid,
          currentDepth,
          percentage * recipePercentage
        );
      });
  
      if (hasFlour && flourWeightTotal !== 1) {
        currentRecipeIsFaulty = true;
        markFlourItemsAsFaulty(sequenceCounter - 1);
      }
  
      recipeItem.isFaultyRecipe = currentRecipeIsFaulty;

      if (updateParentRequired) {
        updateParentRecipeForMissingIngredients(currentDepth - 1);
      }
  
      includedRecipes.forEach((includedRecipe) => {
        const childRecipeIsFaulty = buildFlattenedRecipe(
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
  
        if (childRecipeIsFaulty) {
          recipeItem.hasMissingNestedIngredients = true;
        }
      });
  
      if (currentRecipeIsFaulty && includedRecipes.length === 0) {
        recipeItem.isDeepestFaultyRecipe = true;
      }
  
      return currentRecipeIsFaulty;
    }

    function updateParentRecipeForMissingIngredients(currentDepth) {
        for (let i = flattenedRecipe.length - 1; i >= 0; i--) {
          const recipeItem = flattenedRecipe[i];
          if (recipeItem.isRecipe && recipeItem.depth === currentDepth) {
            recipeItem.hasMissingNestedIngredients = true;
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
  
    function updateParentRecipeItemPercentage(
        ingredientId, // Use ingredientId instead of ingredientName
        isFlour,
        isLiquid,
        currentDepth,
        deductionAmount
      ) {
        const parentRecipeItemIndex = findParentRecipeItemIndex(
          ingredientId, // Use ingredientId in the searching function
          isFlour,
          isLiquid,
          currentDepth
        );
        if (parentRecipeItemIndex >= 0) {
          flattenedRecipe[parentRecipeItemIndex].stepPercentage -= deductionAmount;
        }
      }
      
      function findParentRecipeItemIndex(
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
      
  
    function ingredientPresentInParent(childIngredient, parentIngredients) {
      return parentIngredients.some(
        (parentIngredient) =>
          parentIngredient.id === childIngredient.id &&
          parentIngredient.isFlour === childIngredient.isFlour &&
          parentIngredient.isLiquid === childIngredient.isLiquid
      );
    }
  
  }
  

  // =========
//   import { FlattenedRecipeItem } from "../classes/FlattenedRecipeItem";

// export function flattenRecipe(id, recipeBook) {
//   const flattenedRecipe = [];
//   let sequenceCounter = 0;

//   function ingredientPresentInParent(childIngredient, parentIngredients) {
//     return parentIngredients.some(
//       (parentIngredient) =>
//         parentIngredient.id === childIngredient.id &&
//         parentIngredient.isFlour === childIngredient.isFlour &&
//         parentIngredient.isLiquid === childIngredient.isLiquid
//     );
//   }

//   function buildFlattenedRecipe(
//     id,
//     currentDepth = 0,
//     recipePercentage = 1,
//     parentIngredients = []
//   ) {
//     const { name, ingredients, includedRecipes } = recipeBook.recipes.get(id);

//     // const isMissing = currentDepth !== 0 && !ingredientsPresentInParent(ingredients, parentIngredients);

//     flattenedRecipe.push(
//       new FlattenedRecipeItem(
//         sequenceCounter++,
//         id,
//         true,
//         name,
//         currentDepth,
//         false,
//         false,
//         recipePercentage,
//         0,
//         false
//       )
//     );

//     ingredients.forEach((ingredient) => {
//       const { id, isFlour, isLiquid, percentage } = ingredient;
//       const { name, pricePerKilo } = recipeBook.ingredients.get(id);
//       const isMissingInParentRecipe =
//         currentDepth !== 0 &&
//         !ingredientPresentInParent(ingredient, parentIngredients);

//       if (isMissingInParentRecipe) {
//         let tempSequenceCounter = sequenceCounter;
//         do {
//           tempSequenceCounter--;
//         } while (!flattenedRecipe[tempSequenceCounter].isRecipe);
//         flattenedRecipe[tempSequenceCounter].isMissingInParentRecipe = true;
//       }

//       flattenedRecipe.push(
//         new FlattenedRecipeItem(
//           sequenceCounter++,
//           id,
//           false,
//           name,
//           currentDepth,
//           isFlour,
//           isLiquid,
//           percentage,
//           pricePerKilo,
//           isMissingInParentRecipe,
          
//         )
//       );

//       updateParentRecipeItemPercentage(
//         name,
//         isFlour,
//         isLiquid,
//         currentDepth,
//         percentage * recipePercentage
//       );
//     });

//     includedRecipes.forEach((includedRecipe) => {
//       buildFlattenedRecipe(
//         includedRecipe.id,
//         currentDepth + 1,
//         includedRecipe.percentage,
//         ingredients.map((ingredient) => ({
//           id: ingredient.id,
//           isFlour: ingredient.isFlour,
//           isLiquid: ingredient.isLiquid,
//         }))
//       );
//     });
//   }

//   function updateParentRecipeItemPercentage(
//     ingredientName,
//     isFlour,
//     isLiquid,
//     currentDepth,
//     deductionAmount
//   ) {
//     const parentRecipeItemIndex = findParentRecipeItemIndex(
//       ingredientName,
//       isFlour,
//       isLiquid,
//       currentDepth
//     );
//     if (parentRecipeItemIndex >= 0) {
//       flattenedRecipe[parentRecipeItemIndex].stepPercentage -= deductionAmount;
//     }
//   }

//   function findParentRecipeItemIndex(
//     ingredientName,
//     isFlour,
//     isLiquid,
//     currentDepth
//   ) {
//     for (let i = flattenedRecipe.length - 1; i >= 0; i--) {
//       const recipeItem = flattenedRecipe[i];
//       if (
//         recipeItem.name === ingredientName &&
//         recipeItem.isFlour === isFlour &&
//         recipeItem.isLiquid === isLiquid &&
//         recipeItem.depth === currentDepth - 1
//       ) {
//         return i;
//       }
//     }
//     return -1;
//   }

//   buildFlattenedRecipe(id);
//   return flattenedRecipe;
// }
