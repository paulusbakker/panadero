import React from "react";
import Symbol from "../../../components/shared/Symbol";
import EditCategoryButton from "../editCategoryButton/EditCategoryButton";
import EditCategory from "../editCategory/EditCategory";
import { convertToUrlFormat } from "../../../helper/convertToUrlFormat";
import {ItemHeaderStyled, ItemsCountStyled, LinkStyled} from './Styles'
import {skipActionIfNavbarHamburgerMenuIsOpenAtom} from '../../../atom/skipActionIfNavbarHamburgerMenuIsOpenAtom'
import {useRecoilValue} from 'recoil'


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
  const skipActionIfNavbarHamburgerMenuIsOpen = useRecoilValue(skipActionIfNavbarHamburgerMenuIsOpenAtom);

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
      <EditCategory
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
        <ItemHeaderStyled>
          <div>{categoryName}</div>
          <Symbol type="menu" data-category-name={categoryName} />
          {activeCategory === categoryName && renderCategoryContent()}
        </ItemHeaderStyled>
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
                    if (activeCategory !== null || skipActionIfNavbarHamburgerMenuIsOpen) {
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
