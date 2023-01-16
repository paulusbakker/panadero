import {getRecipeIdFromRecipeName} from './getRecipeIDfromRecipeName'
import {FlattenedRecipeItem} from '../classes/FlattenedRecipeItem'

export function flattenRecipe(recipe, recipeBook) {
    const flattenedRecipe = []

    function buildFlattenedRecipe(recipe, parentRecipe, depth, recipePercentage, recipeBook) {
        flattenedRecipe.push
        (new FlattenedRecipeItem(
            true,
            depth,
            getRecipeIdFromRecipeName(recipe.name, recipeBook),
            false,
            false,
            recipePercentage))

        recipe.ingredients.forEach(ingredient => {
            flattenedRecipe.push(new FlattenedRecipeItem(
                false,
                depth,
                ingredient.id,
                ingredient.isFlour,
                ingredient.isLiquid,
                ingredient.percentage,
            ))
            let stepPercentage = recipePercentage
             const parentRecipeItemToBeAltered = flattenedRecipe.findIndex(recipeItem =>
                recipeItem.id === ingredient.id &&
                recipeItem.isFlour === ingredient.isFlour &&
                recipeItem.isLiquid === ingredient.isLiquid &&
                recipeItem.depth === depth - 1
            )
            if (parentRecipeItemToBeAltered>=0)  flattenedRecipe[parentRecipeItemToBeAltered].stepPercentage-=ingredient.percentage*recipePercentage

        })


        // // check if all ingredients in the nested recipes all present in the parent recipe
        // // not sure if this check belongs here
        // let isValidParentRecipe = true
        // recipe.ingredients.forEach(ingredient => {
        //     const ingredientPresentInParent = nestedParentRecipe ? nestedParentRecipe.ingredients.some(parentRecipeIngredient =>
        //         parentRecipeIngredient.id === ingredient.id &&
        //         parentRecipeIngredient.flour === ingredient.flour &&
        //         parentRecipeIngredient.isLiquid === ingredient.isLiquid) : true
        //
        //     isValidParentRecipe = ingredientPresentInParent ? isValidParentRecipe : false
        //     flattenedRecipe.push
        //     (new FlattenedRecipeItem(false,
        //         ingredientPresentInParent,
        //         depth,
        //         ingredient.id,
        //         ingredient.isLiquid,
        //         ingredient.flour,
        //         ingredient.percentage))
        // })
        // // mark parent recipe as invalid as concluded above
        // if (!isValidParentRecipe)
        //     for (let recipeListItem = flattenedRecipe.length - 1; recipeListItem >= 0; recipeListItem--) {
        //         if (flattenedRecipe[recipeListItem].isRecipe && flattenedRecipe[recipeListItem].depth === depth - 1) {
        //             flattenedRecipe[recipeListItem].isValid = false
        //             break
        //         }
        //     }
        depth++
        for (let nestedRecipe of recipe.nestedRecipes) {
            buildFlattenedRecipe(recipeBook.recipes.get(nestedRecipe.id), recipe, depth, nestedRecipe.percentage, recipeBook)
        }
        depth--
    }


    buildFlattenedRecipe(recipe, null, 0, 1, recipeBook)

    return flattenedRecipe
}