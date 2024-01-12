// export function findDeepestRedItems(flattenedRecipe) {
//   const faultyRecipes = [];
//   let currentRecipeFlourPercentage = 0;
//   let currentFlattenedRecipeItemParent = null;
//   let currentMaxDepth = 0;
//   let faultyStepWeight = false;

//   flattenedRecipe.forEach((flattenedRecipeItem) => {
//     // Bij elk nieuw recept, check en reset
//     if (flattenedRecipeItem.isRecipe) {
//       if (
//         currentFlattenedRecipeItemParent &&
//         currentMaxDepth > 0 &&
//         currentRecipeFlourPercentage !== 1
//       ) {
//         // Voeg bovenliggend recept-item toe als het meeltotaal niet 100% is
//         if (
//           !faultyRecipes.some(
//             (item) =>
//               item.id === currentFlattenedRecipeItemParent.id && item.isRecipe
//           )
//         ) {
//           faultyRecipes.push({
//             id: currentFlattenedRecipeItemParent.id,
//             isRecipe: true,
//           });
//         }
//       }
//       currentRecipeFlourPercentage = 0;
//       currentMaxDepth = 0;
//       currentFlattenedRecipeItemParent = flattenedRecipeItem;
//       faultyStepWeight = false;
//     }

//     // Update de maximale diepte voor het huidige recept
//     if (flattenedRecipeItem.depth > currentMaxDepth) {
//       currentMaxDepth = flattenedRecipeItem.depth;
//     }

//     // Tel meel percentages op voor het huidige recept
//     if (flattenedRecipeItem.isFlour) {
//       currentRecipeFlourPercentage += flattenedRecipeItem.percentage;
//     }

//     // Andere checks voor rode markering
//     const isMissingIngredient = flattenedRecipeItem.isMissing;
//     const isZeroPercentage = flattenedRecipeItem.percentage === 0;

//     if (isMissingIngredient || isZeroPercentage) {
//       faultyRecipes.push(flattenedRecipeItem);
//     }
//   });

//   // Check voor het laatste recept in de lijst
//   if (
//     currentFlattenedRecipeItemParent &&
//     currentMaxDepth > 0 &&
//     currentRecipeFlourPercentage !== 1
//   ) {
//     faultyRecipes.push(currentFlattenedRecipeItemParent);
//   }

//   return faultyRecipes;
// }
