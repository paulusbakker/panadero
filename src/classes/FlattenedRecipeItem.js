export class FlattenedRecipeItem {
  constructor(
    sequenceNumber, 
    id, 
    isRecipe, 
    name, 
    depth, 
    isFlour, 
    isLiquid, 
    percentage, 
    pricePerKilo, 
    ingredientIsMissingInParentRecipe, 
    isFaultyRecipe, 
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
    this.totalFlourNot100 = false;
    this.recipeIsMissingIngredientsPresentInChildren = false;
    this.isFaultyRecipe = isFaultyRecipe;
    this.recipeHasNegativeStepPercentage = false;
    this.isFaultyIngredient= false
  }
  
}
