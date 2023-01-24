export function calculateTotalLiquidPercentage(flattenedRecipe) {
    let totalLiquidPercentage = 0
    for (let currentIndex = 1; currentIndex < flattenedRecipe.length; currentIndex++) {
        const ingredient = flattenedRecipe[currentIndex]
        if (ingredient.isRecipe) {
            break
        }
        if (ingredient.isLiquid) totalLiquidPercentage += ingredient.percentage
    }
    return totalLiquidPercentage
}