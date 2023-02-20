export function getIngredientsByCategory(recipeBook) {
  const sortedIngredientCategories = new Map(
    [...recipeBook.ingredientCategories].sort((a, b) =>
      a[1].toUpperCase() > b[1].toUpperCase() ? 1 : -1
    )
  );
  let ingredients = [...recipeBook.ingredients.values()];
  let ingredientsInCategory = [];
  let ingredientsByCategory = [];
  for (let ingredientCategory of sortedIngredientCategories) {
    // ingredientCategory hier een array geworden, is geen map meer
    for (let ingredient of ingredients)
      if (ingredient.category === ingredientCategory[0])
        ingredientsInCategory.push(ingredient.name);
    if (ingredientsInCategory.length > 0) {
      ingredientsInCategory.sort();
      ingredientsByCategory.push({
        categoryName: ingredientCategory[1],
        ingredientsInCategory,
      });
    }
    ingredientsInCategory = [];
  }
  return ingredientsByCategory;
}
