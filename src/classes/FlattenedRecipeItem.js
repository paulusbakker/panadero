export class FlattenedRecipeItem {
    constructor(isRecipe, depth, id, isFlour, isLiquid, percentage) {
        this.isRecipe = isRecipe
        this.depth = depth
        this.id = id
        this.isFlour = isFlour
        this.isLiquid = isLiquid
        this.percentage = percentage
        this.weight = 0
        this.stepPercentage=percentage
        this.stepWeight=0
        this.pricePerKilo=0
        this.price=0
    }
}



