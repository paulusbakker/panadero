import React from "react";
import Symbol from "../../../components/shared/Symbol";
import EditCategoryButton from "../editCategoryButton/EditCategoryButton";
import EditCategory from "../editCategory/EditCategory";
import { ItemHeaderStyled, ItemsCountStyled, LinkStyled } from "./Styles";
import { skipActionIfNavbarHamburgerMenuIsOpenAtom } from "../../../atom/skipActionIfNavbarHamburgerMenuIsOpenAtom";
import { useRecoilValue } from "recoil";

function AccordionItem({
  categoryId,
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
  const skipActionIfNavbarHamburgerMenuIsOpen = useRecoilValue(
    skipActionIfNavbarHamburgerMenuIsOpenAtom
  );

  const itemCountLabel = `${itemsInThisCategory.length} ${
    isRecipeTab ? "recipe" : "ingredient"
  }${itemsInThisCategory.length > 1 ? "s" : ""}`;

  const renderCategoryContent = () =>
    isEditWindowOpen ? (
      <EditCategory
        categoryId={categoryId}
        categoryName={categoryName}
        handleInputChange={handleInputChange}
        currentEditValue={currentEditValue}
        handleCategoryUpdate={handleCategoryUpdate}
      />
    ) : (
      <EditCategoryButton categoryId={categoryId} />
    );

  return (
    <li>
      <div data-action="category-header" data-category-id={categoryId}>
        <ItemHeaderStyled>
          <div>{categoryName}</div>
          <Symbol type="menu" data-category-id={categoryId} />
          {activeCategory === categoryId && renderCategoryContent()}
        </ItemHeaderStyled>
        <ItemsCountStyled>{itemCountLabel}</ItemsCountStyled>
      </div>

      {isOpen &&
        itemsInThisCategory.map(({ name, id }) => {
          const baseLink = isRecipeTab ? "/recipe/" : "/ingredient/";
          return (
            <ul key={id}>
              <li
                onClick={handleContainerClick}
                data-action="category-items"
                data-category-name={categoryName}
              >
                <LinkStyled
                  to={baseLink + "view/" + id}
                  onClick={(e) => {
                    if (
                      activeCategory !== null ||
                      skipActionIfNavbarHamburgerMenuIsOpen
                    ) {
                      e.preventDefault(); // Stops the link from being followed
                    }
                  }}
                >
                  {name}
                </LinkStyled>
              </li>
            </ul>
          );
        })}
    </li>
  );
}

export default AccordionItem;