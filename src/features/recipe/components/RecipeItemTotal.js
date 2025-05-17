import {ACTIONS, RECIPE_VIEW} from '../../../shared/constants/constants'
import {getSymbolType} from '../../../helper/getSymbolType'
import {numberFormat} from '../../../helper/numberFormat'
import SymbolStyles from '../../../shared/components/SymbolStyles'
import {
    LeftAlignedFlexContainer, ListItemStyled, RightSpacedFlexContainer, SpanStyled,
} from './RecipeTotalListItemStyles'

function RecipeTotalListItem({
                                 name,
                                 isRecipe,
                                 isFlour,
                                 isLiquid,
                                 totalLiquidPercentage,
                                 recipe_view,
                                 dispatch,
                                 weight,
                                 isValidOverallRecipe
                             }) {
    const symbolType = getSymbolType({isRecipe, isFlour, isLiquid})

    return (<ListItemStyled
            onClick={() => {
                if (isValidOverallRecipe) dispatch({
                    type: ACTIONS.HANDLE_ITEM_PRESS, payload: {index: name},
                })
            }}
        >
            <LeftAlignedFlexContainer>
                {`total ${name.toLowerCase()}`}
                {isLiquid && `  (${numberFormat(totalLiquidPercentage * 100)}%)`}
            </LeftAlignedFlexContainer>
            <RightSpacedFlexContainer>
                <SymbolStyles type={symbolType}/>
                {recipe_view === RECIPE_VIEW.PROCESSED ? (<SpanStyled>{numberFormat(weight)}g</SpanStyled>) : (
                    <SpanStyled>
                        <SymbolStyles type={isValidOverallRecipe ? 'calculator' : 'empty'}/>
                    </SpanStyled>)}
            </RightSpacedFlexContainer>
        </ListItemStyled>)
}

export default RecipeTotalListItem
