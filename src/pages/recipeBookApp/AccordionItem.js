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
      to: baseLink + convertToUrlFormat(itemName),
      state: isRecipeTab
        ? { recipeName: itemName }
        : { ingredientName: itemName },
    };
  };

  const itemCountLabel = `${itemsInThisCategory.length} ${
    isRecipeTab ? "recipe" : "ingredient"
  }${itemsInThisCategory.length > 1 ? "s" : ""}`;

  const renderCategoryContent = () =>
    isEditWindowOpen ? (
      <CategoryEditWindow
        categoryName={categoryName}
        handleInputChange={handleInputChange}
        currentEditValue={currentEditValue}
        handleCategoryUpdate={handleCategoryUpdate}
      />
    ) : (
      <EditCategoryButton categoryName={categoryName} />
    );

  return (
    <AccordionItemStyled>
      <div data-action="category-name" data-category-name={categoryName}>
        <CategoryLabelStyled>
          <div>{categoryName}</div>
          <Symbol type="menu" data-category-name={categoryName} />
          {activeCategory === categoryName && renderCategoryContent()}
        </CategoryLabelStyled>
        <ItemsCountStyled>{itemCountLabel}</ItemsCountStyled>
      </div>

      {isOpen &&
        itemsInThisCategory.map((itemName) => {
          const linkProps = createItemLink(itemName);
          return (
            <ul key={itemName}>
              <li>
                <LinkStyled to={linkProps.to} state={linkProps.state}>
                  {itemName}
                </LinkStyled>
              </li>
            </ul>
          );
        })}
    </AccordionItemStyled>
  );
}

export default AccordionItem;
