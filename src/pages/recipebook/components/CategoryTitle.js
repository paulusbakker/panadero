import React, { useEffect, useRef, useState } from "react";
import { BiDotsVertical } from "react-icons/bi";
import "../../../styles.css";
import { useRecoilState } from "recoil";
import { recipeBookAtom } from "../../../atom/recipeBookAtom";
import { getMapKeyByValue } from "../../../helper/getMapKeyByValue";

function CategoryTitle({ categoryName, categoryLength, isRecipe }) {
  const [getRecipeBook, setRecipeBook] = useRecoilState(recipeBookAtom);
  const [showEditCategoryPopup, toggleShowEditCategoryPopup] = useState(false);
  const [showEditCategoryWindow, setShowEditCategoryWindow] = useState(false);
  const [field, setField] = useState(categoryName);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  // de field hieronder moet erin want soms kan de submit wel gezet zijn, maar is het field nog niet geupdatet, wanneer het field dan ook geupdatet is wordt er nogmaals gecontroleerd
  useEffect(() => {
    if (submit) {
      handleSubmit();
      setSubmit(false);
    }
  }, [submit, field]);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const handleClick = (e) => {
    if (ref1.current) {
      if (!ref1.current.contains(e.target)) {
        toggleShowEditCategoryPopup(false);
      } else {
        toggleShowEditCategoryPopup(false);
        setShowEditCategoryWindow(true);
      }
      e.stopPropagation();
      e.preventDefault();
    }
    if (ref2.current) {
      if (e.target.className === "backdrop") {
        setShowEditCategoryWindow(false);
      }
      e.stopPropagation();
      e.preventDefault();
    }
    if (ref3.current) {
      if (e.target.className === "backdrop__popup__submit") {
        setSubmit(true);
      }
    }
  };

  const handleChange = (e) => {
    setField(e.target.value);
  };

  const handleSubmit = () => {
    let categories = isRecipe
      ? getRecipeBook.recipeCategories
      : getRecipeBook.ingredientCategories;
    categories.set(getMapKeyByValue(categories, categoryName), field);
    if (isRecipe)
      setRecipeBook({ ...getRecipeBook, recipeCategories: categories });
    else setRecipeBook({ ...getRecipeBook, ingredientCategories: categories });
    setShowEditCategoryWindow(false);
  };

  return (
    <>
      <div className="recipes-ingredients-list__item__title">
        <p className="recipes-ingredients-list__item__title__name">
          {categoryName}
        </p>
        <p
          className="symbol"
          onClick={(e) => {
            toggleShowEditCategoryPopup(!showEditCategoryPopup);
            e.stopPropagation();
          }}
        >
          <BiDotsVertical />
        </p>
        {showEditCategoryPopup && (
          <div
            className="recipes-ingredients-list__item__title__popup"
            ref={ref1}
          >
            Edit Category
          </div>
        )}
      </div>
      <div className="recipes-ingredients-list__item_length">
        {categoryLength}&nbsp;{isRecipe ? "recipe" : "ingredient"}
        {categoryLength > 1 && "s"}
      </div>
      {showEditCategoryWindow && (
        <div className="backdrop" ref={ref2}>
          <div className="backdrop__popup">
            <p className="backdrop__popup__name">Edit category:</p>
            {categoryName}
            <input
              type="text"
              id="input"
              aria-label="input"
              onChange={handleChange}
              value={field}
            />
            <button className="backdrop__popup__submit" ref={ref3}>
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryTitle
