import SymbolStyles from '../../../shared/components/SymbolStyles'
import {DottedListLine, RecipeCardStyled, RecipeNameStyled} from './RecipeCardStyles'
import FlattenedRecipeListItem from './FlattenedRecipeListItem'
import IngredientsMinusPredoughsListItems from './IngredientsMinusPredoughsListItems'
import RecipeCostListItems from './RecipeCostListItems'
import RecipeTotalsListItems from './RecipeTotalsListItems'

const RecipeCard = ({
                        flattenedRecipeState, dispatch, isMainRecipeCard,
                    }) => {
    return (<RecipeCardStyled>
        {isMainRecipeCard && (<>
            {flattenedRecipeState.flattenedRecipe
                .map((flattenedRecipeItem) => (<FlattenedRecipeListItem
                    key={`${flattenedRecipeItem.index}`}
                    flattenedRecipeItem={flattenedRecipeItem}
                    isValidOverallRecipe={flattenedRecipeState.isValidOverallRecipe}
                    stepsMode={false}
                    recipe_view={flattenedRecipeState.recipe_view}
                    dispatch={dispatch}
                />))}
            <DottedListLine/>
            <RecipeTotalsListItems
                flattenedRecipeState={flattenedRecipeState}
                dispatch={dispatch}
            />
        </>)}
        {!isMainRecipeCard && (<>
            <IngredientsMinusPredoughsListItems
                flattenedRecipeState={flattenedRecipeState}
                dispatch={dispatch}
            />
            <RecipeCostListItems flattenedRecipeState={flattenedRecipeState}/>
        </>)}
    </RecipeCardStyled>)
}

export default RecipeCard
