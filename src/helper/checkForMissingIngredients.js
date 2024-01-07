export function checkForMissingIngredients(flattenedRecipe) {
    // Add an 'isMissing' property to each ingredient
    return flattenedRecipe.map((index, item) => {
      // Skip if it's the first item or not an ingredient
      if (index === 0 || item.isRecipe !== 'ingredient') return item;
  
      const currentDepth = item.depth;
      const parentRecipeIndex = findParentRecipeIndex(index, array, currentDepth);
      
      // If no parent recipe is found (which shouldn't happen), don't modify the item
      if (parentRecipeIndex === -1) return item;
  
      // Extract the parent recipe's ingredients
      const parentIngredients = array[parentRecipeIndex].ingredients;
  
      // Check if the current ingredient is present in the parent recipe's ingredients
      const isMissing = !parentIngredients.some(parentItem => parentItem.id === item.id);
  
      // Return the item with the 'isMissing' property updated
      return {
        ...item,
        isMissing: isMissing
      };
    });
  }
  
  // Helper function to find the index of the parent recipe in the flattened array
  function findParentRecipeIndex(childIndex, array, currentDepth) {
    for (let i = childIndex - 1; i >= 0; i--) {
      // If an item with a lesser depth (parent recipe) is found, return its index
      if (array[i].depth < currentDepth) {
        return i;
      }
    }
    // Return -1 if no parent recipe is found (this would be an error in the data)
    return -1;
  }
  