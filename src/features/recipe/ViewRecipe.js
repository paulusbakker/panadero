import {useEffect, useReducer} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useRecoilValue} from 'recoil'
import {recipeBookAtom} from '../../../atom/recipeBookAtom'
import {ACTIONS, RECIPE_VIEW} from '../../../constants/constants'
import {calculateAmounts} from '../../../helper/calculateAmounts'
import {createInitialState} from '../../../helper/createInitialState'
import RecipeCard from '../../../features/recipe/components/RecipeCard'
import Navbar from './navbar/Navbar'
import Popup from './recipeCard/popup/Popup'

const handleActionSubmit = (flattenedRecipeState, action) => {
    if (action.payload.weight === 0) return flattenedRecipeState

    const [calculatedRecipe, totalFlourWeight, totalLiquidWeight] = calculateAmounts(flattenedRecipeState.flattenedRecipe, action.payload.weight, flattenedRecipeState.index, flattenedRecipeState.stepsMode)

    return {
        ...flattenedRecipeState,
        flattenedRecipe: calculatedRecipe,
        totalFlourWeight: totalFlourWeight,
        totalLiquidWeight: totalLiquidWeight,
        showPopup: false,
        recipe_view: RECIPE_VIEW.PROCESSED,
    }
}

const handleItemPress = (flattenedRecipeState, action) => {
    console.log(action.payload.index)

    return {
        ...flattenedRecipeState,
        showPopup: true,
        index: action.payload.index,
        stepsMode: action.payload.stepsMode,
        isFirstView: false,
    }
}

const reducer = (flattenedRecipeState, action) => {
    console.log('Dispatched action:', action)
    console.log('Current state before update:', flattenedRecipeState)
    switch (action.type) {
        case ACTIONS.HANDLE_ITEM_PRESS:
            return handleItemPress(flattenedRecipeState, action)
        case ACTIONS.ENTER_AMOUNTS:
            return {
                ...flattenedRecipeState, showPopup: true,
            }
        case ACTIONS.HANDLE_SUBMIT:
            return handleActionSubmit(flattenedRecipeState, action)
        case ACTIONS.CANCEL:
            return {
                ...flattenedRecipeState, showPopup: false, recipe_view: RECIPE_VIEW.DEFAULT,
            }
        case ACTIONS.RESET_STATE:
            return {...action.payload, showPopup: action.payload.isFirstView}
        default:
            return flattenedRecipeState
    }
}

function ViewRecipe() {
    const navigate = useNavigate()
    const recipeBook = useRecoilValue(recipeBookAtom)

    const {id} = useParams()

    useEffect(() => {
        if (!id) {
            navigate('/recipes', {replace: true})
        } else {
            console.log('new')
            const newState = createInitialState(id, recipeBook)
            dispatch({type: ACTIONS.RESET_STATE, payload: newState})
        }
    }, [id, navigate, recipeBook])

    const [flattenedRecipeState, dispatch] = useReducer(reducer, {}, () => {
        return createInitialState(id, recipeBook)
    })
    if (!id) return null

    return (<>
        {console.log('Updated state:', flattenedRecipeState)}
        <Navbar id={id}/>
        <Popup flattenedRecipeState={flattenedRecipeState} dispatch={dispatch}/>
        <RecipeCard
            flattenedRecipeState={flattenedRecipeState}
            dispatch={dispatch}
            isMainRecipeCard={true}
        />
        <RecipeCard
            flattenedRecipeState={flattenedRecipeState}
            dispatch={dispatch}
            isMainRecipeCard={false}
        />
    </>)
}

export default ViewRecipe
