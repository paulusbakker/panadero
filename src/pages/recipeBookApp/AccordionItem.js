import React from "react";
import { ItemsCountStyled, LinkStyled } from "./Styles";
import Symbol from "../../components/shared/Symbol";
import EditCategoryButton from "./EditCategoryButton";
import CategoryEditWindow from "./CategoryEditWindow";
import { convertToUrlFormat } from "../../helper/convertToUrlFormat";
import { ContentHeaderStyled } from "../../styles/SharedStyles";

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
  handleContainerClick,
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
    <li>
      <div data-action="category-name" data-category-name={categoryName}>
        <ContentHeaderStyled>
          <div>{categoryName}</div>
          <Symbol type="menu" data-category-name={categoryName} />
          {activeCategory === categoryName && renderCategoryContent()}
        </ContentHeaderStyled>
        <ItemsCountStyled>{itemCountLabel}</ItemsCountStyled>
      </div>

      {isOpen &&
        itemsInThisCategory.map((itemName) => {
          const linkProps = createItemLink(itemName);
          return (
            <ul key={itemName}>
              <li
                onClick={handleContainerClick}
                data-action="category-items"
                data-category-name={categoryName}
              >
                <LinkStyled
                  to={linkProps.to}
                  state={linkProps.state}
                  onClick={(e) => {
                    if (activeCategory !== null) {
                      e.preventDefault(); // Stops the link from being followed
                    }
                  }}
                >
                  {itemName}
                </LinkStyled>
              </li>
            </ul>
          );
        })}
    </li>
  );
}

export default AccordionItem;
