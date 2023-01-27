import React, {useEffect, useState} from 'react'
import {BiDotsVertical} from 'react-icons/bi'
import '../../../../styles.css'
import {useRecoilState} from 'recoil'
import {recipeBookAtom} from '../../../../atom/recipeBookAtom'
import {getMapKeyByValue} from '../../../../helper/getMapKeyByValue'

function CategoryTitle({categoryName, categoryLength, isRecipe}) {
    const [getRecipeBook, setRecipeBook] = useRecoilState(recipeBookAtom)
    const [showEditCategoryPopup, setShowEditCategoryPopup] = useState(false)
    const [popup, setPopup] = useState(false)
    const [field, setField] = useState(categoryName)
    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick)
        return () => {
            document.removeEventListener('click', handleDocumentClick)
        }
    }, [])

    // de field hieronder moet erin want soms kan de submit wel gezet zijn, maar is het field nog niet geupdatet, wanneer het field dan ook geupdatet is wordt er nogmaals gecontroleerd
    useEffect(() => {
        if (submit) {
            handleSubmit()
            setSubmit(false)
        }
    }, [submit, field])

    const handleDocumentClick = (e) => {
        console.log('doc')
        setShowEditCategoryPopup(false)
        setPopup(false)
    }
    const handle3Dots = (e) => {
        console.log('dots')
        setShowEditCategoryPopup(true)
        e.stopPropagation()
    }
    const invisibleTactileLayer = (e) => {
        console.log('tactile')
        setShowEditCategoryPopup(false)
        e.stopPropagation()
    }

    const backdrop = (e) => {
        console.log('backdrop')
        setPopup(false)
        e.stopPropagation()
    }

    const backdropPopup = (e) => {
        console.log(e.target.className)
        e.stopPropagation()
    }
    const handleEditCategory = (e) => {

        if (showEditCategoryPopup) {
            setShowEditCategoryPopup(false)
            setPopup(true)
        }
        console.log('cat')
        e.stopPropagation() // belangrijk dat deze achteraan staat! waarom?}
    }
    const handleClick = (e) => {
        console.log(e.target.className)
        switch (e.target.className) {
            case "dots":
                setShowEditCategoryPopup(true)
                break
            case "recipes-ingredients-list__item__title__popup":
                setShowEditCategoryPopup(false)
                setPopup(true)
                break
            case  "invisibleTactileLayer":
                setShowEditCategoryPopup(false)
                break
            case "backdrop":
                setPopup(false)
                break
            case "backdrop__popup":
                e.stopPropagation()
                break

        }
        e.stopPropagation()
    }

    const handleChange = (e) => {
        setField(e.target.value)
        // toggleShowEditCategoryPopup(!showEditCategoryPopup)
    }

    const handleSubmit = (e) => {
        let categories = isRecipe ? getRecipeBook.recipeCategories : getRecipeBook.ingredientCategories
        categories.set(getMapKeyByValue(categories, categoryName), field)
        if (isRecipe)
            setRecipeBook({...getRecipeBook, recipeCategories: categories})
        else
            setRecipeBook({...getRecipeBook, ingredientCategories: categories})
        setPopup(false)
        e.stopPropagation()
    }

    return (
        <>
            <div className="recipes-ingredients-list__item__title">
                <p className="recipes-ingredients-list__item__title__name">{categoryName}</p>

                <p className="symbol"><BiDotsVertical className="dots" onClick={handleClick}/></p> {/*3dot*/}
                {showEditCategoryPopup &&
                    <><p className="recipes-ingredients-list__item__title__popup" onClick={handleClick}>{/*handleeditcat*/}
                        Edit Category

                    </p><span className="invisibleTactileLayer" onClick={handleClick}></span></>}
            </div>
            <div
                className="recipes-ingredients-list__item_length">{categoryLength}&nbsp;{isRecipe ? 'recipe' : 'ingredient'}{categoryLength > 1 && 's'}
            </div>
            {popup && <div className="backdrop" onClick={handleClick}>{/*backdrop*/}
                <div className="backdrop__popup" onClick={handleClick}>{/*backdrop-pop*/}
                    <p className="backdrop__popup__name">Edit category:</p>
                    {categoryName}
                    <input type="text"
                           id="input"
                           aria-label="input"
                           onChange={handleChange}
                           value={field}
                    />
                    <button className="backdrop__popup__submit">Submit</button>
                </div>
            </div>}
        </>
    )
}

export default CategoryTitle
