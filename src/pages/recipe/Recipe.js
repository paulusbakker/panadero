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
                {flattenedRecipe.slice(1).map((recipeItem, index) => {
                    const {name, isRecipe, isFlour, isLiquid, percentage, weight, depth} = recipeItem
                    return (
                        <RecipeItem
                            key={`recipe-item-${index}`}
                            name={name}
                            isRecipe={isRecipe}
                            isFlour={isFlour}
                            isLiquid={isLiquid}
                            percentage={percentage}
                            weight={weight}
                            index={index}
                            depth={depth}
                            calculateMode={showAmounts}
                            handleRecipeItemIndex={handleRecipeItemIndex}
                        />
                    )
                })}
                <hr/>
                {/*totals*/}
                <ul className="recipe-list">
                    <RecipeItem
                        name={'Total Flour'}
                        isRecipe={false}
                        isFlour={true}
                        isLiquid={false}
                        percentage={null}
                        weight={totals.totalFlourWeight}
                        index={'totalFlour'}
                        depth={0}
                        calculateMode={showAmounts}
                        handleRecipeItemIndex={handleRecipeItemIndex}
                    />
                    <RecipeItem
                        name={'Total Liquid'}
                        isRecipe={false}
                        isFlour={false}
                        isLiquid={true}
                        percentage={null}
                        weight={totals.totalLiquidWeight}
                        index={'totalLiquid'}
                        depth={0}
                        calculateMode={showAmounts}
                        handleRecipeItemIndex={handleRecipeItemIndex}
                    />
                    <RecipeItem
                        name={'Total Recipe'}
                        isRecipe={false}
                        isFlour={false}
                        isLiquid={false}
                        percentage={null}
                        weight={flattenedRecipe[0].weight}
                        index={'totalRecipe'}
                        depth={0}
                        calculateMode={showAmounts}
                        handleRecipeItemIndex={handleRecipeItemIndex}
                    />
                </ul>

            </ul>

        </div>

        {/*Ingredients minus predoughs*/}

        {flattenedRecipe.some(recipeItem => recipeItem.depth !== 0) &&
            <div className="recipe">
                <ul className="recipe-list">
                    <li className="recipe-list__item">
                            <span
                                className="recipe-list__item__center">Ingredients minus predoughs
                            </span>
                    </li>
                    {flattenedRecipe.slice(1).map((recipeItem, index) => {
                        const {name, isRecipe, isFlour, isLiquid, stepWeight, depth} = recipeItem
                        return (
                            <RecipeItem
                                key={`recipe-item-${index}`}
                                name={name}
                                isRecipe={isRecipe}
                                isFlour={isFlour}
                                isLiquid={isLiquid}
                                percentage={null}
                                weight={stepWeight}
                                index={-index}
                                depth={depth}
                                calculateMode={showAmounts}
                                handleRecipeItemIndex={handleRecipeItemIndex}
                            />
                        )
                    })}
                </ul>
            </div>}
    </>
}

export default Recipe

{/*            <li className="recipe-list__item" key={index}>*/
}
{/*                <span className="recipe-list__item__left">*/
}
{/*                    {recipeItem.isRecipe ? indent(recipeItem.depth - 1) : indent(recipeItem.depth)}*/
}
{/*                    {!recipeItem.isRecipe && recipeItem.depth !== 0 && '- '}*/
}
{/*                    {recipeItem.name}*/
}
{/*                    </span>*/
}
{/*                <span className="recipe-list__item__right">*/
}
{/*                    <Symbol*/
}
{/*                        type={recipeItem.isRecipe ? 'recipe' : recipeItem.isFlour ? 'flour' : recipeItem.isLiquid ? 'isLiquid' : ''}/>*/
}
{/*                    {showAmounts ?*/
}
{/*                        <>*/
}
{/*                            <span className="tab">{(recipeItem.stepWeight).toFixed(2)}g</span>*/
}
{/*                        </> :*/
}
{/*                        <>*/
}
{/*                            <span className="tab"></span>*/
}
{/*                            <EnterAmount index={-index} handleWeight={handleWeight}/>*/
}
{/*                        </>}*/
}
{/*                </span>*/
}
{/*            </li>)}*/
}
{/*    </ul>}*/
}
{/*</div>}*/
}


{/*/!*costs*!/*/
}
{/*<div className="recipe">*/
}
{/*    {showAmounts && <>*/
}
{/*        <li className="recipe-list__item">*/
}
{/*                <span*/
}
{/*                    className="recipe-list__item__center">Costs*/
}
{/*                </span>*/
}
{/*        </li>*/
}
{/*        <ul className="recipe-list">*/
}
{/*            {flattenedRecipe.slice(1).map((recipeItem, index) =>*/
}
{/*                recipeItem.depth === 0 && <li className="recipe-list__item" key={index}>*/
}
{/*                    {!recipeItem.isRecipe && <>*/
}
{/*                    <span className="recipe-list__item__left">*/
}
{/*                        {recipeItem.name}*/
}
{/*                    </span>*/
}
{/*                        <span className="recipe-list__item__right">*/
}
{/*                           <span*/
}
{/*                               className="tab"><Symbol type={'coins'}/>{recipeItem.pricePerKilo.toFixed(2)}/kg*/
}
{/*                           </span>*/
}
{/*                           <span*/
}
{/*                               className="tab"><Symbol type={'coins'}/>{recipeItem.price.toFixed(2)}*/
}
{/*                           </span>*/
}

{/*                    </span>*/
}

{/*                    </>}*/
}
{/*                </li>)*/
}
{/*            }*/
}
{/*            <hr/>*/
}
{/*            <li className="recipe-list__item">*/
}
{/*                <span*/
}
{/*                    className="recipe-list__item__left">Total*/
}
{/*                </span>*/
}
{/*                <span className="recipe-list__item__right"><Symbol*/
}
{/*                    type={'coins'}/>{flattenedRecipe[0].price.toFixed(2)}*/
}
{/*                </span>*/
}
{/*            </li>*/
}
{/*        </ul>*/
}
{/*    </>}*/
}