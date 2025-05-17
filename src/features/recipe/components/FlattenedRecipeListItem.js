import {ACTIONS, RECIPE_VIEW} from '../../../shared/constants/constants'
import {getSymbolType} from '../../../helper/getSymbolType'
import {numberFormat} from '../../../helper/numberFormat'
import Indent from '../../../shared/components/Indent'
import SymbolStyles from '../../../shared/components/SymbolStyles'
import {determineSymbolType} from '../../../helper/determineSymbolType'
import {
    ContainerStyled, LeftAlignedFlexContainer, ListItemStyled, RightSpacedFlexContainer, SpanStyled,
} from './FlattenedRecipeListItemStyles'

function FlattenedRecipeListItem({
                                     flattenedRecipeItem, isValidOverallRecipe, stepsMode, recipe_view, dispatch,
                                 }) {
    const {
        depth,
        ingredientIsMissingInParentRecipe,
        isFaultyIngredient,
        isFaultyRecipe,
        isFlour,
        isLiquid,
        isRecipe,
        name,
        percentage,
        index,
        stepWeight,
        weight,
    } = flattenedRecipeItem

    const symbolType = getSymbolType({isRecipe, isFlour, isLiquid})
    const isFaultyItem = isFaultyRecipe || isFaultyIngredient

    return <ListItemStyled
        $isFaultyItem={isFaultyItem || ingredientIsMissingInParentRecipe}
        onClick={() => {
            if ((!isValidOverallRecipe && !isRecipe && !isFaultyIngredient && !ingredientIsMissingInParentRecipe) || (index === 0 && isValidOverallRecipe)) {
                console.log('test', index)
                return
            }
            dispatch({
                type: ACTIONS.HANDLE_ITEM_PRESS, payload: {index: index, stepsMode: stepsMode},
            })
        }}
    >
        <LeftAlignedFlexContainer>
            {isRecipe ? <Indent depth={depth}/> : <Indent depth={depth + 1}/>}
            {!isRecipe && depth !== 0 && '- '}
            {name}
        </LeftAlignedFlexContainer>
        <RightSpacedFlexContainer>
            <SymbolStyles type={symbolType}/>
            <ContainerStyled>
                {recipe_view === RECIPE_VIEW.PROCESSED ?
                    <SpanStyled>{`${numberFormat(!stepsMode ? weight : stepWeight)}g`}</SpanStyled> : <>
                        {!stepsMode ? <SpanStyled>{numberFormat(percentage * 100)}%</SpanStyled> : <SpanStyled/>}
                        <SymbolStyles
                            type={determineSymbolType({
                                index,
                                isValidOverallRecipe,
                                isRecipe,
                                isFaultyIngredient,
                                ingredientIsMissingInParentRecipe
                            })}
                        />
                    </>}
            </ContainerStyled>
        </RightSpacedFlexContainer>
    </ListItemStyled>
}

export default FlattenedRecipeListItem
