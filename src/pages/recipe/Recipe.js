import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {recipeBookAtom} from '../../atom/recipeBookAtom'
import {getRecipeFromRecipeName} from '../../helper/getRecipeFromRecipeName'
import {useRecoilValue} from 'recoil'
import {flattenRecipe} from '../../helper/flattenRecipe'
import {calculateAmounts} from '../../helper/calculateAmounts'
import RecipeItem from './components/RecipeItem'
import Symbol from '../../components/Symbol'
import EnterAmount from './components/EnterAmount'
import RecipeItemCenter from './components/RecipeItemCenter'
import RecipeItemTotal from './components/RecipeItemTotal'
import RecipeItemCost from './components/RecipeItemCost'

function Recipe() {
    const location = useLocation()
    const recipeName = location.state.recipeName
    const recipeBook = useRecoilValue(recipeBookAtom)
    const [index, setIndex] = useState()
    const [flattenedRecipe, setFlattenedRecipe] = useState(flattenRecipe(getRecipeFromRecipeName(recipeName, recipeBook), recipeBook))
    const [totals, setTotals] = useState({totalFlourWeight: 0, totalLiquidWeight: 0})
    const [showAmounts, setShowAmounts] = useState(false)
    const [enterAmountWindow, setEnterAmountWindow] = useState(false)
    const handleRecipeItemIndex = index => {
        setEnterAmountWindow(true)
        setIndex(index)
    }

    const handleSubmit = (weight) => {
        setShowAmounts(true)
        setEnterAmountWindow(false)
        const [calculatedRecipe, totalFLourWeight, totalLiquidWeight] = calculateAmounts(flattenedRecipe, weight, index)
        setTotals({totalFlourWeight: totalFLourWeight, totalLiquidWeight: totalLiquidWeight})
        setFlattenedRecipe(calculatedRecipe)
    }
    // useEffect(() => {
    //     document.addEventListener('click', handleClick)
    //     return () =>
    //         document.removeEventListener('click', handleClick)
    // },)

    return <>
        {enterAmountWindow && <EnterAmount index={index} handleSubmit={handleSubmit}/>}
        <div className="recipe">
            <div
                className="recipe-title">{flattenedRecipe[0].name}<Symbol type={'menu'}/>
            </div>
            <ul className="recipe-list">
                {/*delete first element with slice because recipe title already printed*/}
                {flattenedRecipe.slice(1).map((recipeItem, index) =>

                    <RecipeItem
                        key={`recipe-item-${index}`}
                        recipeItem={recipeItem}
                        index={index}
                        showInclusive={true}
                        showAmounts={showAmounts}
                        handleRecipeItemIndex={handleRecipeItemIndex}
                    />)}
                <hr/>
                {/*totals*/}
                <ul className="recipe-list">
                    <RecipeItemTotal
                        name={'Total flour'}
                        isRecipe={false}
                        isFlour={true}
                        isLiquid={false}
                        showAmounts={showAmounts}
                        handleRecipeItemIndex={handleRecipeItemIndex}
                        weight={totals.totalFlourWeight}/>
                    <RecipeItemTotal
                        name={'Total liquid'}
                        isRecipe={false}
                        isFlour={true}
                        isLiquid={false}
                        showAmounts={showAmounts}
                        handleRecipeItemIndex={handleRecipeItemIndex}
                        weight={totals.totalLiquidWeight}/>
                    <RecipeItemTotal
                        name={'Total recipe'}
                        isRecipe={true}
                        isFlour={false}
                        isLiquid={false}
                        showAmounts={showAmounts}
                        handleRecipeItemIndex={handleRecipeItemIndex}
                        weight={flattenedRecipe[0].weight}/>
                </ul>

            </ul>

        </div>

        {/*Ingredients minus predoughs*/}
        {flattenedRecipe.some(recipeItem => recipeItem.depth !== 0) && <div className="recipe">
            <ul className="recipe-list">
                <RecipeItemCenter>Ingredients minus predoughs</RecipeItemCenter>
                {flattenedRecipe.slice(1).map((recipeItem, index) => {
                    return <RecipeItem
                        key={`recipe-item-${index}`}
                        recipeItem={recipeItem}
                        index={-index}
                        showInclusive={false}
                        showAmounts={showAmounts}
                        handleRecipeItemIndex={handleRecipeItemIndex}
                    />
                })}
            </ul>
        </div>}
        {/*costs*/}
        {showAmounts && <div className="recipe">
            <ul className="recipe-list">
                <RecipeItemCenter>Costs</RecipeItemCenter>
                {flattenedRecipe.slice(1).map((recipeItem, index) => recipeItem.depth === 0 && <RecipeItemCost
                    key={`recipe-item-${index}`}
                    recipeItem={recipeItem}
                    totalRecipe={false}/>)}
                <hr/>
                <RecipeItemCost recipeItem={flattenedRecipe[0]} totalRecipe={true}/>
            </ul>
        </div>}
    </>
}

export default Recipe
