export function getItemsByCategory(recipeBook, sortByRecipes) {
  const categories = sortByRecipes
    ? recipeBook.recipeCategories
    : recipeBook.ingredientCategories;
  const items = sortByRecipes ? recipeBook.recipes : recipeBook.ingredients;
  const sortedCategories = new Map(
    [...categories].sort((a, b) => a[1].localeCompare(b[1]))
  );
  const categorizedItems = [];

  for (let [categoryId , categoryName] of sortedCategories) {
    const itemsInThisCategory = [...items.entries()]
      .filter(([_, item]) => item.category === categoryId && !item.isArchived)
      .map(([id , item]) => ({
        name: item.name,
        id ,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    if (itemsInThisCategory.length > 0) {
      categorizedItems.push({
        categoryId ,
        categoryName,
        itemsInThisCategory,
      });
    }
  }
  return categorizedItems;
}
