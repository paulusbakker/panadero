export function calculateAmounts(flattenedRecipe, weight, index) {

    // find parent recipe
    function findParentRecipe(currentIndex) {
        let depth = flattenedRecipe[currentIndex].depth
        // go up until recipe found with one depth less
        while (currentIndex > 0 && !(flattenedRecipe[currentIndex].depth === depth - 1 && flattenedRecipe[currentIndex].isRecipe)) {
            currentIndex--
        }
        return currentIndex
    }

    // calculate total percentage of all ingredients in recipe, index=recipeItem where recipe begins
    function calculateRecipePercentage(currentIndex) {
        let totalRecipePercentage = 0
        for (let i = currentIndex + 1; i < flattenedRecipe.length; i++) {
            const ingredient = flattenedRecipe[i]
            if (ingredient.isRecipe) {
                break
            }
            totalRecipePercentage += ingredient.percentage
        }
        return totalRecipePercentage
    }

    // calculate total percentage of liquids
    let totalLiquidPercentage = 0
    for (let currentIndex = 1; currentIndex < flattenedRecipe.length; currentIndex++) {
        const ingredient = flattenedRecipe[currentIndex]
        if (ingredient.isRecipe) {
            break
        }
        if (ingredient.isLiquid) totalLiquidPercentage += ingredient.percentage
    }
    let totalFlourWeight, totalLiquidWeight
    let totalRecipePercentage = 0
    switch (index) {
        case 'totalFlour':
            totalFlourWeight = weight
            totalLiquidWeight = weight * totalLiquidPercentage
            break
        case 'totalLiquid':
            totalFlourWeight = weight / totalLiquidPercentage
            totalLiquidWeight = weight
            break
        case 'totalRecipe':
            totalRecipePercentage = calculateRecipePercentage(0)
            totalFlourWeight = weight / totalRecipePercentage
            totalLiquidWeight = totalFlourWeight * totalLiquidPercentage
            break
        default:
            // add 1 to index because the received index is one number too low because of the sliced off recipe title
            index++

            // if index is negative , it was sent from the dough minus predoughs section
            let minusPredoughs = false
            if (index < 0) {
                index =-index
                minusPredoughs = true
            }
            // first calculate the weight of 100% flour of the recipe where the index is in:
            if (!flattenedRecipe[index].isRecipe) {
                !minusPredoughs ?
                    totalFlourWeight = weight / flattenedRecipe[index].percentage : totalFlourWeight = weight / flattenedRecipe[index].stepPercentage
                // go up until index at a recipe:
                while (!flattenedRecipe[index].isRecipe) {
                    index--
                }
            } else {
                totalRecipePercentage = calculateRecipePercentage(index)
                totalFlourWeight = weight / totalRecipePercentage
            }

            totalLiquidWeight = totalFlourWeight * totalLiquidPercentage

            // calculate weight in root recipe:
            while (index > 0) {
                totalFlourWeight = totalFlourWeight / flattenedRecipe[index].percentage
                index = findParentRecipe(index)
                console.log(totalFlourWeight)
            }
    }

    // calculate weights of all ingredients
    const totalFlourWeightHistory = []
    let depth = -1
    for (const [index, recipeItem] of flattenedRecipe.entries()) {
        // eslint-disable-next-line default-case
        switch (recipeItem.isRecipe) {
            case true:
                if (recipeItem.depth > depth) {
                    totalRecipePercentage = calculateRecipePercentage(index)
                    totalFlourWeight = totalFlourWeight * recipeItem.percentage
                    recipeItem.weight = recipeItem.stepWeight = totalFlourWeight * totalRecipePercentage
                    totalFlourWeightHistory.push(totalFlourWeight)
                    depth++
                } else {
                    while (recipeItem.depth < depth) {
                        totalFlourWeightHistory.pop()
                        depth--
                    }
                }
                break
            case false:
                recipeItem.weight = recipeItem.percentage * totalFlourWeight
                recipeItem.stepWeight = recipeItem.stepPercentage * totalFlourWeight
                break
        }
    }

    // let totalLiquidPercentage = 0
    // flattenedRecipe.forEach((recipeItem) => {
    //     if (recipeItem.isRecipe) {
    //         return
    //     }
    //     if (recipeItem.isLiquid) {
    //         totalLiquidPercentage += recipeItem.percentage
    //     }
    // })
    // = totalLiquidPercentage * totalFlourWeightHistory[0]
    // let totalPrice = 0
    // flattenedRecipe.slice(1).every(recipeItem=>{
    //     if (recipeItem.isRecipe) return false
    //     recipeItem.pricePerKilo=recipeBook.ingredients.get(recipeItem.id).pricePerKilo
    // })
    let totalPrice=0
    flattenedRecipe.slice(1).forEach(recipeItem=> {
            if (recipeItem.depth===0) {
                const price=recipeItem.pricePerKilo/1000*recipeItem.weight
                recipeItem.price=price
                totalPrice+=price
            }
        }
    )
    flattenedRecipe[0].price=totalPrice
    return [flattenedRecipe, totalFlourWeightHistory[0], totalLiquidWeight]
}

