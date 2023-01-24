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
import {calculateTotalLiquidPercentage} from '../../helper/calculateTotalLiquidPercentage'

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
        setEnterAmountWindow(false)
        if (weight=='cancel') return
        setShowAmounts(true)

        const [calculatedRecipe, totalFLourWeight, totalLiquidWeight] = calculateAmounts(flattenedRecipe, weight, index)
        setTotals({totalFlourWeight: totalFLourWeight, totalLiquidWeight: totalLiquidWeight})
        setFlattenedRecipe(calculatedRecipe)
    }


    return <>
        {enterAmountWindow && !showAmounts && <EnterAmount  name={isNaN(index) ? index : flattenedRecipe[Math.abs(index)+1].name} handleSubmit={handleSubmit}/>}
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
                        name={'total flour'}
                        isRecipe={false}
                        isFlour={true}
                        isLiquid={false}
                        totalLiquidPercentage={null}
                        showAmounts={showAmounts}
                        handleRecipeItemIndex={handleRecipeItemIndex}
                        weight={totals.totalFlourWeight}/>
                    <RecipeItemTotal
                        name={'total liquid'}
                        isRecipe={false}
                        isFlour={false}
                        isLiquid={true}
                        totalLiquidPercentage={calculateTotalLiquidPercentage(flattenedRecipe)}
                        showAmounts={showAmounts}
                        handleRecipeItemIndex={handleRecipeItemIndex}
                        weight={totals.totalLiquidWeight}/>
                    <RecipeItemTotal
                        name={'total recipe'}
                        isRecipe={true}
                        isFlour={false}
                        isLiquid={false}
                        totalLiquidPercentage={null}
                        showAmounts={showAmounts}
                        handleRecipeItemIndex={handleRecipeItemIndex}
                        weight={flattenedRecipe[0].weight}/>
                    {showAmounts && <button onClick={()=>setShowAmounts(false)}>C</button>}
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
