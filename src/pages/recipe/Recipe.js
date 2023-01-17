import React, {useState} from 'react'
import {useLocation} from 'react-router-dom'
import {recipeBookAtom} from '../../atom/recipeBookAtom'
import {getRecipeFromRecipeName} from '../../helper/getRecipeFromRecipeName'
import {useRecoilValue} from 'recoil'
import {flattenRecipe} from '../../helper/flattenRecipe'
import {BiDotsVertical} from 'react-icons/bi'
import Calculator from './components/Calculator'
import Symbol from './components/Symbol.js'
import {calculateAmounts} from '../../helper/calculateAmounts'

function Recipe() {
    const location = useLocation()
    const recipeName = location.state.recipeName
    const recipeBook = useRecoilValue(recipeBookAtom)
    const [flattenedRecipe, setFlattenedRecipe] = useState(flattenRecipe(getRecipeFromRecipeName(recipeName, recipeBook), recipeBook))
    const [totals, setTotals] = useState({totalFlourWeight: 0, totalLiquidWeight: 0})
    const [calculateMode, setCalculateMode] = useState(false)
    const handleWeight = ({weight, index}) => {
        setCalculateMode(true)
        const [calculatedRecipe, totalFLourWeight, totalLiquidWeight] = calculateAmounts(flattenedRecipe, weight, index)
        setTotals({totalFlourWeight: totalFLourWeight, totalLiquidWeight: totalLiquidWeight})
        setFlattenedRecipe(calculatedRecipe)
    }
    console.log(flattenedRecipe)

    const handleClick = () => {
        console.log('test')
    }
    const indent = (depth) => {
        return ([...Array(depth)].map((e, index) => <span key={index}>&nbsp;</span>))
    }

    return <>
        <div className="recipe">
            <div
                className="recipe-title">{flattenedRecipe[0].name}<BiDotsVertical
                onClick={handleClick}/>
            </div>
            <ul className="recipe-list">
                {/*delete first element with slice because recipe title already printed*/}
                {flattenedRecipe.slice(1).map((recipeItem, index) =>
                    <li className="recipe-list__item" key={index}>
                        <span className="recipe-list__item__left">
                            {recipeItem.isRecipe ? indent(recipeItem.depth - 1) : indent(recipeItem.depth)}
                            {!recipeItem.isRecipe && recipeItem.depth !== 0 && '- '}
                            {recipeItem.name}
                            </span>
                        <span className="recipe-list__item__right">
                            <Symbol type={recipeItem.isRecipe && 'recipe'}/>
                            <Symbol type={recipeItem.isFlour && 'flour'}/>
                            <Symbol type={recipeItem.isLiquid && 'isLiquid'}/>
                            {calculateMode ?
                                <>
                                    <span className="tab">{(recipeItem.weight).toFixed(2)}g</span>
                                </> :
                                <>
                                    <span className="tab">{(recipeItem.percentage * 100).toFixed(2)}%</span>
                                    <Calculator index={index} handleWeight={handleWeight}/>
                                </>}
                        </span>
                    </li>)}
                <hr/>
                {/*totals*/}
                <ul className="recipe-list">
                    <li className="recipe-list__item">
                        <span className="recipe-list__item__left"><Symbol type={'flour'}/>Total Flour</span>
                        {calculateMode ? Number(totals.totalFlourWeight).toFixed(2) + 'g' :
                            <Calculator index={'totalFlour'} handleWeight={handleWeight}/>}
                    </li>
                    <li className="recipe-list__item">
                        <span className="recipe-list__item__left"><Symbol type={'isLiquid'} className="symbol"/>Total Liquid</span>
                        {calculateMode ? Number(totals.totalLiquidWeight).toFixed(2) + 'g' :
                            <Calculator index={'totalLiquid'} handleWeight={handleWeight}/>}
                    </li>
                    <li className="recipe-list__item">
                        <span className="recipe-list__item__left"><Symbol type={'recipe'} className="symbol"/>Total Recipe</span>
                        {calculateMode ? flattenedRecipe[0].weight.toFixed(2) + 'g' :
                            <Calculator index={'totalRecipe'} handleWeight={handleWeight}/>}
                    </li>
                </ul>


            </ul>

        </div>
        {/*Ingredients minus predoughs*/}
        {flattenedRecipe.some(recipeItem => recipeItem.depth !== 0) && <div className="recipe">
            {<ul className="recipe-list">
                <li className="recipe-list__item">
                        <span
                            className="recipe-list__item__center">Ingredients minus predoughs
                        </span>
                </li>
                {flattenedRecipe.slice(1).map((recipeItem, index) =>
                    <li className="recipe-list__item" key={index}>
                        <span className="recipe-list__item__left">
                            {recipeItem.isRecipe ? indent(recipeItem.depth - 1) : indent(recipeItem.depth)}
                            {!recipeItem.isRecipe && recipeItem.depth !== 0 && '- '}
                            {recipeItem.name}
                            </span>
                        <span className="recipe-list__item__right">
                            <Symbol
                                type={recipeItem.isRecipe ? 'recipe' : recipeItem.isFlour ? 'flour' : recipeItem.isLiquid ? 'isLiquid' : ''}/>
                            {calculateMode ?
                                <>
                                    <span className="tab">{(recipeItem.stepWeight).toFixed(2)}g</span>
                                </> :
                                <>
                                    <span className="tab"></span>
                                    <Calculator index={-index} handleWeight={handleWeight}/>
                                </>}
                        </span>
                    </li>)}
            </ul>}
        </div>}
        {/*costs*/}
        <div className="recipe">
            {calculateMode && <>
                <li className="recipe-list__item">
                        <span
                            className="recipe-list__item__center">Costs
                        </span>
                </li>
                <ul className="recipe-list">
                    {flattenedRecipe.slice(1).map((recipeItem, index) =>
                        recipeItem.depth === 0 && <li className="recipe-list__item" key={index}>
                            {!recipeItem.isRecipe && <>
                            <span className="recipe-list__item__left">
                                {recipeItem.name}
                            </span>
                                <span className="recipe-list__item__right">
                                   <span
                                       className="tab"><Symbol type={'coins'}/>{recipeItem.pricePerKilo.toFixed(2)}/kg
                                   </span>
                                   <span
                                       className="tab"><Symbol type={'coins'}/>{(recipeItem.pricePerKilo / 1000 * recipeItem.weight).toFixed(2)}
                                   </span>

                            </span>

                            </>}
                        </li>)
                    }
                    <hr/>
                </ul>
            </>}
        </div>
    </>
}

export default Recipe
