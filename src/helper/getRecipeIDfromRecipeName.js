export function getRecipeIdFromRecipeName(recipeName, recipeBook) {
  for (let recipe of recipeBook.recipes) {
    //recipe[0]=id 
    //recipe[1]=value
    if (recipe[1].name === recipeName) return recipe[0];
  }
}