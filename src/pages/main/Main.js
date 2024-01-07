import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { recipeBookAtom } from "../../atom/recipeBookAtom";
import { skipActionIfNavbarHamburgerMenuIsOpenAtom } from "../../atom/skipActionIfNavbarHamburgerMenuIsOpenAtom";
import { useLocation } from "react-router-dom";
import { getItemsByCategory } from "../../helper/getItemsByCategory";
import AccordionItem from "./accordionItem/AccordionItem";
import { TabContainerUlStyled } from "./Styles";

function Main() {
  const [recipeBook, setRecipeBook] = useRecoilState(recipeBookAtom);
  const skipActionIfNavbarHamburgerMenuIsOpen = useRecoilValue(
    skipActionIfNavbarHamburgerMenuIsOpenAtom
  );
  const { pathname } = useLocation();
  const isRecipeTab = pathname === "/recipes";
  const categorizedItems = getItemsByCategory(recipeBook, isRecipeTab);

  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [isEditWindowOpen, setEditWindowOpen] = useState(false);
  const [currentEditValue, setCurrentEditValue] = useState("");
  const [openCategoryIds, setOpenCategoryIds] = useState([]);
  const toggleOpenCategoryId = (categoryId) => {
    setOpenCategoryIds((prevOpenCategories) =>
      prevOpenCategories.includes(categoryId)
        ? prevOpenCategories.filter((category) => category !== categoryId)
        : [...prevOpenCategories, categoryId]
    );
  };
  const containerRef = useRef(null);

  useEffect(() => {
    function handleOutsideIdClick(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setActiveCategoryId(null);
      }
    }

    document.addEventListener("click", handleOutsideIdClick);

    return () => {
      document.removeEventListener("click", handleOutsideIdClick);
    };
  }, []);

  function handleContainerClick(event) {
    event.stopPropagation(); // stop running handleOutsideIdClick
    if (skipActionIfNavbarHamburgerMenuIsOpen) return;
    const actionElement = event.target.closest("[data-action]");
    if (!actionElement) {
      setActiveCategoryId(null);
      return;
    }

    const targetAction = actionElement.getAttribute("data-action");
    const clickedCategoryId = actionElement.getAttribute("data-category-id");

    switch (targetAction) {
      case "EditCategoryButton":
        setActiveCategoryId(clickedCategoryId);
        setEditWindowOpen(true);
        setCurrentEditValue(recipeBook.recipeCategories.get(clickedCategoryId));
        break;

      case "symbol":
        if (clickedCategoryId) {
          setActiveCategoryId(clickedCategoryId);
          setEditWindowOpen(false);
        }
        break;

      case "category-header":
        if (activeCategoryId) {
          setActiveCategoryId(null);
        } else {
          toggleOpenCategoryId(clickedCategoryId);
        }
        break;

      case "category-items":
        setActiveCategoryId(null);
        break;

      default:
        // Handle unknown actions
        break;
    }
  }

  const handleInputChange = (e) => setCurrentEditValue(e.target.value);

  const handleCategoryUpdate = () => {
    setRecipeBook((prevRecipeBook) => {
      const updatedCategories = new Map(prevRecipeBook.recipeCategories);
      updatedCategories.set(activeCategoryId, currentEditValue);

      return isRecipeTab
        ? { ...prevRecipeBook, recipeCategories: updatedCategories }
        : { ...prevRecipeBook, ingredientCategories: updatedCategories };
    });

    setActiveCategoryId(null);
    setEditWindowOpen(false);
  };

  return (
    <TabContainerUlStyled onClick={handleContainerClick} ref={containerRef}>
      {categorizedItems.map(
        ({ categoryId, categoryName, itemsInThisCategory }) => (
          <AccordionItem
            key={categoryId}
            categoryId={categoryId}
            categoryName={categoryName}
            itemsInThisCategory={itemsInThisCategory}
            isRecipeTab={isRecipeTab}
            activeCategory={activeCategoryId}
            isEditWindowOpen={isEditWindowOpen}
            isOpen={openCategoryIds.includes(categoryId)}
            handleInputChange={handleInputChange}
            currentEditValue={currentEditValue}
            handleCategoryUpdate={handleCategoryUpdate}
            handleContainerClick={handleContainerClick}
          />
        )
      )}
    </TabContainerUlStyled>
  );
}

export default Main;