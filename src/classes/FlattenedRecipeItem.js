export class FlattenedRecipeItem {
  constructor(
    sequenceNumber, // needed
    id, // needed
    isRecipe, // needed
    name, // needed
    depth, // needed
    isFlour, // needed
    isLiquid, // needed
    percentage, // needed
    pricePerKilo, // needed
    ingredientIsMissingInParentRecipe, // needed
    isFaultyRecipe, // needed
  ) {
    this.sequenceNumber = sequenceNumber;
    this.id = id;
    this.isRecipe = isRecipe;
    this.recipeHasMissingIngredientsInParentRecipe = false;
    this.name = name;
    this.depth = depth;
    this.isFlour = isFlour;
    this.isLiquid = isLiquid;
    this.percentage = percentage;
    this.weight = 0;
    this.stepPercentage = percentage;
    this.stepWeight = 0;
    this.pricePerKilo = pricePerKilo;
    this.ingredientIsMissingInParentRecipe = ingredientIsMissingInParentRecipe;
    this.isDeepestFaultyRecipe = false;
    this.recipeTotalFlourNot100 = false;
    this.recipeIsMissingIngredientsPresentInChildren = false;
    this.isFaultyRecipe = isFaultyRecipe;
    this.recipeHasNegativeStepPercentage = false;
  }
  
}
