export function getRecipeFromRecipeName(recipeName, recipeBook) {
  for (let recipe of recipeBook.recipes) {
    //recipe[0]=key
    //recipe[1]=value
    if (recipe[1].name === recipeName) {
      return recipe[1];
    }
  }
}