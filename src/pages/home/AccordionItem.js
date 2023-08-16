import React from "react";
import {
  AccordionItemStyled,
  CategoryLabelStyled,
  ItemsCountStyled,
  LinkStyled,
} from "./Styles";
import Symbol from "../../components/shared/Symbol";
import EditCategoryButton from "./EditCategoryButton";
import CategoryEditWindow from "./CategoryEditWindow";
import { convertToUrlFormat } from "../../helper/convertToUrlFormat";

function AccordionItem({
                         categoryName,
                         itemsInThisCategory,
                         isRecipeTab,
                         activeCategory,
                         isEditWindowOpen,
                         isOpen,
                         handleInputChange,
                         currentEditValue,
                         handleCategoryUpdate,
                       }) {
  const createItemLink = (itemName) => {
    const baseLink = isRecipeTab ? `/recipe/` : `/ingredient/`;
    return {
      pathname: baseLink + convertToUrlFormat(itemName),
      state: isRecipeTab ? { recipeName: itemName } : { ingredientName: itemName },
    };
  };

  const itemsCountLabel = () => {
    const itemCount = itemsInThisCategory.length;
    const itemType = isRecipeTab ? "recipe" : "ingredient";
    return `${itemCount} ${itemType}${itemCount > 1 ? "s" : ""}`;
  };

  return (
      <AccordionItemStyled>
        <div data-action="category" data-category-name={categoryName}>
          <CategoryLabelStyled>
            <div>{categoryName}</div>
            <Symbol type="menu" data-category-name={categoryName} />
            {activeCategory === categoryName && (
                isEditWindowOpen ? (
                    <CategoryEditWindow
                        categoryName={categoryName}
                        handleInputChange={handleInputChange}
                        currentEditValue={currentEditValue}
                        handleCategoryUpdate={handleCategoryUpdate}
                    />
                ) : (
                    <EditCategoryButton categoryName={categoryName} />
                )
            )}
          </CategoryLabelStyled>
          <ItemsCountStyled>{itemsCountLabel()}</ItemsCountStyled>
        </div>

        {isOpen &&
            itemsInThisCategory.map((itemName) => (
                <ul key={itemName}>
                  <LinkStyled to={createItemLink(itemName)}>
                    <li>{itemName}</li>
                  </LinkStyled>
                </ul>
            ))}
      </AccordionItemStyled>
  );
}

export default AccordionItem;
