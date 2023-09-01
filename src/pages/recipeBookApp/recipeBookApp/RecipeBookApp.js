import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { recipeBookAtom } from "../../../atom/recipeBookAtom";
import { useLocation } from "react-router-dom";
import { getItemsByCategory } from "../../../helper/getItemsByCategory";
import { getMapKeyByValue } from "../../../helper/getMapKeyByValue";
import AccordionItem from "../accordionItem/AccordionItem";
import {BelowNavbarSpaceStyled, TabContainerUlStyled} from './Styles'

function RecipeBookApp() {
  const [recipeBook, setRecipeBook] = useRecoilState(recipeBookAtom);
  const { pathname } = useLocation();
  const isRecipeTab = pathname === "/recipes";
  const categorizedItems = getItemsByCategory(recipeBook, isRecipeTab);

  const [activeCategory, setActiveCategory] = useState(null);
  const [isEditWindowOpen, setEditWindowOpen] = useState(false);
  const [currentEditValue, setCurrentEditValue] = useState("");
  const [openCategoryNames, setOpenCategoryNames] = useState([]);
  const toggleOpenCategoryName = (categoryName) => {
    setOpenCategoryNames((prevOpenCategories) =>
      prevOpenCategories.includes(categoryName)
        ? prevOpenCategories.filter((category) => category !== categoryName)
        : [...prevOpenCategories, categoryName]
    );
  };

  function handleContainerClick(event) {
    const actionElement = event.target.closest("[data-action]");
    console.log(actionElement);

    if (!actionElement) {
      setActiveCategory(null);
      return;
    }

    const targetAction = actionElement.getAttribute("data-action");
    const clickedCategoryName =
      actionElement.getAttribute("data-category-name");

    switch (targetAction) {
      case "EditCategoryButton":
        setActiveCategory(clickedCategoryName);
        setEditWindowOpen(true);
        setCurrentEditValue(clickedCategoryName);
        break;

      case "symbol":
        if (clickedCategoryName) {
          setActiveCategory(clickedCategoryName);
          setEditWindowOpen(false);
        }
        break;

      case "category-name":
        if (activeCategory) {
          setActiveCategory(null);
        } else {
          toggleOpenCategoryName(clickedCategoryName);
        }
        break;

      case "category-items":
        setActiveCategory(null);
        break;

      default:
        // Handle unknown actions
        break;
    }
  }

  const handleInputChange = (e) => setCurrentEditValue(e.target.value);

  const handleCategoryUpdate = (originalCategoryName) => {
    const keyToUpdate = getMapKeyByValue(
      isRecipeTab
        ? recipeBook.recipeCategories
        : recipeBook.ingredientCategories,
      originalCategoryName
    );

    setRecipeBook((prevRecipeBook) => {
      const updatedCategories = new Map(prevRecipeBook.recipeCategories);
      updatedCategories.set(keyToUpdate, currentEditValue);

      return isRecipeTab
        ? { ...prevRecipeBook, recipeCategories: updatedCategories }
        : { ...prevRecipeBook, ingredientCategories: updatedCategories };
    });

    setActiveCategory(null);
    setEditWindowOpen(false);
  };

  return (
    <BelowNavbarSpaceStyled onClick={handleContainerClick}>
      <TabContainerUlStyled>
        {categorizedItems.map(({ categoryName, itemsInThisCategory }) => (
          <AccordionItem
            key={categoryName}
            categoryName={categoryName}
            itemsInThisCategory={itemsInThisCategory}
            isRecipeTab={isRecipeTab}
            activeCategory={activeCategory}
            isEditWindowOpen={isEditWindowOpen}
            isOpen={openCategoryNames.includes(categoryName)}
            handleInputChange={handleInputChange}
            currentEditValue={currentEditValue}
            handleCategoryUpdate={handleCategoryUpdate}
            handleContainerClick={handleContainerClick}
          />
        ))}
      </TabContainerUlStyled>
    </BelowNavbarSpaceStyled>
  );
}

export default RecipeBookApp;