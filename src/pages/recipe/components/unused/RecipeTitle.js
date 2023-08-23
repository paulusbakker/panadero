// import React, {useEffect, useRef, useState} from 'react'
// import {BsBook} from 'react-icons/bs'
// import {BiDotsVertical} from 'react-icons/bi'
// import {ImCalculator} from 'react-icons/im'
// import {FiCheckSquare} from 'react-icons/fi'
// import {FiSquare} from 'react-icons/fi'
// import {Link} from 'react-router-dom'
//
// function RecipeTitle({flattenedRecipe, percent, recipeBook}) {
//     const isRootRecipe = percent === 0
//     const recipeName = flattenedRecipe.name
//     const [showPopup, toggleShowPopup] = useState(false)
//     const [combineIngredients, toggleCombineIngredients] = useState(false)
//
//     useEffect(() => {
//         document.addEventListener('click', handleClick)
//         return () => {
//             !showPopup && document.removeEventListener('click', handleClick)
//         }
//     },)
//
//     // useEffect(() => {
//         console.log('ok')
//     // }, [combineIngredients])
//
//     const ref = useRef(null)
//
//     const handleClick = (e) => {
//         console.log('klik')
//         if (ref.current) {
//             if (!ref.current.contains(e.target)) {
//                 toggleShowPopup(false)
//             } else {
//                 toggleShowPopup(false)
//                 toggleCombineIngredients((prevState) => !prevState)
//             }
//             e.stopPropagation()
//             e.preventDefault()
//         }
//
//     }
//
//     return (<div className={isRootRecipe ? 'recipe__item__title' : 'recipe__item__recursive__title'}>
//             <span
//                 className={isRootRecipe ? 'recipe__item__title__item' : 'recipe__item__recursive__title__item'}>
//                 {isRootRecipe ? recipeName : <Link to="" state={{recipeName: recipeName}}>
//                     {recipeName}
//                 </Link>}
//
//                 </span>
//             {isRootRecipe && <span className="symbol" onClick={(e) => {
//                 e.stopPropagation()
//                 toggleShowPopup(prevState => !prevState)
//             }}><BiDotsVertical/></span>}
//             {isRootRecipe && showPopup &&
//                 <div className="recipe-item__title__popup" ref={ref}>Combine ingredients{combineIngredients ?
//                     <FiCheckSquare/> : <FiSquare/>}
//
//                 </div>}
//
//             {!isRootRecipe && <span className="symbol"><BsBook/><span
//                 className="recipe__item__ingredient__item__percentage">{(percent * 100).toFixed(2)}%</span><span
//                 className="recipe__item__ingredient__item__symbol"><ImCalculator/></span></span>}
//         </div>)
// }
//
// export default RecipeTitle