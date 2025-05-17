export function determineSymbolType({
                                        index,
                                        isValidOverallRecipe,
                                        isRecipe,
                                        isFaultyIngredient,
                                        ingredientIsMissingInParentRecipe
                                    }) {
    if (isValidOverallRecipe) {
        return isRecipe ? 'menu' : 'calculator';
    }

    if (isRecipe) {
        return index === 0 ? 'info' : 'forward';
    }

    if (isFaultyIngredient || ingredientIsMissingInParentRecipe) {
        return 'info';
    }

    // Default case
    return 'empty'; // or any other default handling you prefer
}
