export class Recipe {
  constructor(name, category, ingredients, includedRecipes) {
    this.name = name;
    this.category = category;
    this.ingredients = ingredients; // []
    this.includedRecipes = includedRecipes; // []
  }
}
