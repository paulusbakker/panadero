import { FlattenedRecipeItem } from '../classes/FlattenedRecipeItem';
import { TYPES } from '../shared/constants/constants';

export function flattenRecipe(id, recipeBook) {
    const flattenedRecipe = [];
    let index = 0;
    let isValidOverallRecipe = true;

    buildFlattenedRecipe(id);
    console.log(recipeBook);
    console.log(flattenedRecipe);

    return { flattenedRecipe, isValidOverallRecipe };

    function buildFlattenedRecipe(id, currentDepth = 0, recipePercentage = 1, parentIndex = -1) {
        const { name, ingredients, includedRecipes } = recipeBook.recipes.get(id);
        let flourWeightTotal = 0;
        let hasFlour = false;
        let deepestFaultyRecipeInfo = { found: false, depth: -1 };

        const currentRecipe = new FlattenedRecipeItem(
            index++,
            id,
            true,
            name,
            currentDepth,
            false,
            false,
            recipePercentage,
            0,
            parentIndex
        );

        sortIngredients(ingredients);
        sortIncludedRecipes(includedRecipes);

        flattenedRecipe.push(currentRecipe);

        ingredients.forEach((ingredient) => {
            const { id, isFlour, isLiquid, percentage } = ingredient;
            const { name, pricePerKilo } = recipeBook.ingredients.get(id);

            const currentIngredient = new FlattenedRecipeItem(
                index++,
                id,
                false,
                name,
                currentDepth,
                isFlour,
                isLiquid,
                percentage,
                pricePerKilo,
                currentRecipe.index
            );

            flattenedRecipe.push(currentIngredient);

            if (isFlour) {
                hasFlour = true;
                flourWeightTotal += percentage;
            }
        });

        if (hasFlour && flourWeightTotal !== 1) {
            currentRecipe.addIssue(TYPES.TOTAL_FLOUR_NOT_100, true, { invalidFlourPercentage: flourWeightTotal });
            markFlourItemsAsFaulty(index, TYPES.TOTAL_FLOUR_NOT_100, { invalidFlourPercentage: flourWeightTotal });
        }

        const childRecipeIndexes = [];

        includedRecipes.forEach((includedRecipe) => {
            const { directChildRecipeIndex, faultyRecipeInfo } = buildFlattenedRecipe(
                includedRecipe.id,
                currentDepth + 1,
                includedRecipe.percentage,
                currentRecipe.index
            );

            childRecipeIndexes.push(directChildRecipeIndex);

            if (faultyRecipeInfo.found && faultyRecipeInfo.depth > deepestFaultyRecipeInfo.depth) {
                deepestFaultyRecipeInfo = faultyRecipeInfo;
            }
        });
        console.log(childRecipeIndexes)

        childRecipeIndexes.forEach((childRecipeIndex) => {
            let childIngredientIndex = childRecipeIndex + 1;

            while (isIngredient(childIngredientIndex)) {
                let parentIngredientIndex = currentRecipe.index + 1;
                let ingredientMatchFound = false;

                while (isIngredient(parentIngredientIndex)) {
                    if (isSameIngredient(childIngredientIndex, parentIngredientIndex)) {
                        ingredientMatchFound = true;
                        break;
                    }
                    parentIngredientIndex++;
                }

                updateRecipeDetails(
                    currentRecipe,
                    parentIngredientIndex,
                    childRecipeIndex,
                    childIngredientIndex,
                    ingredientMatchFound
                );

                childIngredientIndex++;
            }
        });

        if (currentRecipe.isFaulty) {
            isValidOverallRecipe = false;
            if (!deepestFaultyRecipeInfo.found || currentDepth > deepestFaultyRecipeInfo.depth) {
                currentRecipe.isDeepestFaultyRecipe = true;
                deepestFaultyRecipeInfo = { found: true, depth: currentDepth };
            }
        }

        return {
            directChildRecipeIndex: currentRecipe.index,
            faultyRecipeInfo: deepestFaultyRecipeInfo,
        };
    }

    function markFlourItemsAsFaulty(currentIndex, issueType, details) {
        for (let i = currentIndex - 1; i >= 0; i--) {
            if (flattenedRecipe[i].isRecipe) {
                break;
            }
            if (flattenedRecipe[i].isFlour) {
                flattenedRecipe[i].addIssue(issueType, true, details);
            }
        }
    }

    function isIngredient(index) {
        return flattenedRecipe[index] && !flattenedRecipe[index].isRecipe;
    }

    function isSameIngredient(childIndex, parentIndex) {
        const childIngredient = flattenedRecipe[childIndex];
        const parentIngredient = flattenedRecipe[parentIndex];
        return (
            childIngredient.id === parentIngredient.id &&
            childIngredient.isFlour === parentIngredient.isFlour &&
            childIngredient.isLiquid === parentIngredient.isLiquid
        );
    }

    function updateRecipeDetails(
        currentRecipe,
        parentIngredientIndex,
        childRecipeIndex,
        childIngredientIndex,
        ingredientMatchFound
    ) {
        if (ingredientMatchFound) {
            flattenedRecipe[parentIngredientIndex].stepPercentage -=
                flattenedRecipe[childIngredientIndex].percentage *
                flattenedRecipe[childRecipeIndex].percentage;
            if (flattenedRecipe[parentIngredientIndex].stepPercentage < 0) {
                flattenedRecipe[parentIngredientIndex].addIssue(TYPES.NEGATIVE_STEP_PERCENTAGE, true);
                currentRecipe.addIssue(TYPES.NEGATIVE_STEP_PERCENTAGE, true);
            }
        } else {
            console.log(currentRecipe)
            // currentRecipe.addIssue(TYPES.MISSING_INGREDIENT_IN_PARENT, false);
            flattenedRecipe[childIngredientIndex].addIssue(TYPES.MISSING_INGREDIENT_IN_PARENT, false);
            flattenedRecipe[childRecipeIndex].addIssue(TYPES.MISSING_INGREDIENT_IN_PARENT, false, childIngredientIndex);
            propagateFaultyFlag(currentRecipe.index);
        }
    }

    function propagateFaultyFlag(recipeIndex) {
        let currentRecipeIndex = recipeIndex;
        while (currentRecipeIndex >= 0) {
            const currentRecipe = flattenedRecipe[currentRecipeIndex];
            currentRecipe.isFaulty = true;
            currentRecipe.addIssue(TYPES.MISSING_INGREDIENTS_IN_CHILD, true);
            const parentIndex = currentRecipe.parentIndex;
            if (parentIndex === -1) {
                break;
            }
            currentRecipeIndex = parentIndex;
        }
    }

    function sortIngredients(ingredients) {
        ingredients.sort((a, b) => {
            const categoryOrderA = getCategoryOrder(a);
            const categoryOrderB = getCategoryOrder(b);

            if (categoryOrderA !== categoryOrderB) {
                return categoryOrderA - categoryOrderB;
            }

            if (b.percentage !== a.percentage) {
                return b.percentage - a.percentage;
            }

            const nameA = recipeBook.ingredients.get(a.id).name;
            const nameB = recipeBook.ingredients.get(b.id).name;
            return nameA.localeCompare(nameB);
        });
    }

    function getCategoryOrder(ingredientItem) {
        if (ingredientItem.isFlour) return 1;
        if (ingredientItem.isLiquid) return 2;
        return 3;
    }

    function sortIncludedRecipes(includedRecipes) {
        includedRecipes.sort((a, b) => {
            if (b.percentage !== a.percentage) {
                return b.percentage - a.percentage;
            }

            const nameA = recipeBook.recipes.get(a.id).name;
            const nameB = recipeBook.recipes.get(b.id).name;
            return nameA.localeCompare(nameB);
        });
    }
}
