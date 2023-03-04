export class FlattenedRecipeItem {
  constructor(
    isRecipe,
    name,
    depth,
    isFlour,
    isLiquid,
    percentage,
    pricePerKilo
  ) {
    this.isRecipe = isRecipe;
    this.name = name;
    this.depth = depth;
    this.isFlour = isFlour;
    this.isLiquid = isLiquid;
    this.percentage = percentage;
    this.weight = 0;
    this.stepPercentage = percentage;
    this.stepWeight = 0;
    this.pricePerKilo = pricePerKilo;
    this.price = 0;
  }
}
