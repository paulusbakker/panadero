export function getRecipesByCategory(recipeBook) {
  const sortedRecipeCategories = new Map(
    [...recipeBook.recipeCategories].sort((a, b) =>
      a[1].toUpperCase() > b[1].toUpperCase() ? 1 : -1
    )
  );
  let recipes = [...recipeBook.recipes.values()];
  let recipesInCategory = [];
  let recipesByCategory = [];
  for (let recipeCategory of sortedRecipeCategories) {
    // recipeCategory hier een array geworden, is geen map meer
    for (let recipe of recipes)
      if (recipe.category === recipeCategory[0])
        recipesInCategory.push(recipe.name);
    if (recipesInCategory.length > 0) {
      recipesInCategory.sort();
      recipesByCategory.push({
        categoryName: recipeCategory[1],
        recipesInCategory,
      });
    }
    recipesInCategory = [];
  }
  return recipesByCategory;
}
