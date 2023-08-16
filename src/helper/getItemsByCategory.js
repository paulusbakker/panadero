export function getItemsByCategory(recipeBook, sortByRecipes) {
  const categories = sortByRecipes
    ? recipeBook.recipeCategories
    : recipeBook.ingredientCategories;
  const items = sortByRecipes ? recipeBook.recipes : recipeBook.ingredients;
  const sortedCategories = new Map(
    [...categories].sort((a, b) => a[1].localeCompare(b[1]))
  );
  const categorizedItems = [];

  for (let [categoryId, categoryName] of sortedCategories) {
    const itemsInThisCategory = [...items.values()]
      .filter((item) => item.category === categoryId)
      .map((item) => item.name)
      .sort();

    if (itemsInThisCategory.length > 0) {
      categorizedItems.push({
        categoryName,
        itemsInThisCategory,
      });
    }
  }

  return categorizedItems;
}
