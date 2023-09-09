import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Symbol from "../../../components/shared/Symbol";
import { useRecoilState } from 'recoil';
import {skipActionIfNavbarHamburgerMenuIsOpenAtom } from '../../../atom/skipActionIfNavbarHamburgerMenuIsOpenAtom'
import {
  ButtonContainerStyled,
  HamburgerMenuItemStyled,
  HamburgerMenuStyled,
  MainNavLinkStyled,
  MainNavStyled,
  TabsStyled,
  TabStyled,
} from "./Styles";
import Ingredient from '../../ingredient/Ingredient'

function Navbar() {
  const [hamburgerMenuOpen, toggleHamburgerMenuOpen] = useState(false);
  const [addIngredientMode, toggleAddIngredientModeMode]=useState(false)
  const [, toggleSkipActionIfNavbarHamburgerMenuIsOpen] = useRecoilState(skipActionIfNavbarHamburgerMenuIsOpenAtom); // Using Recoil state
  const { pathname } = useLocation();

  const menuRef = useRef(null);
  // window.noExecute = false;
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (hamburgerMenuOpen) {
          toggleHamburgerMenuOpen(false);
          toggleSkipActionIfNavbarHamburgerMenuIsOpen(true);  // Set the flag which will be used in RecipeBookApp
          return;
        }
      }
      toggleSkipActionIfNavbarHamburgerMenuIsOpen(false);  // Reset the flag which will be used in RecipeBookApp
    }

    // Attach the click event handler
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove the click event handler
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hamburgerMenuOpen, toggleSkipActionIfNavbarHamburgerMenuIsOpen]);

  return (
    <>
      <MainNavStyled>
        <MainNavLinkStyled
          onClick={() => toggleHamburgerMenuOpen(false)}
          to="/recipes"
        >
          PANADERO
        </MainNavLinkStyled>
        <ButtonContainerStyled
          onClick={() => toggleHamburgerMenuOpen(!hamburgerMenuOpen)}
        >
          <Symbol type={hamburgerMenuOpen ? "closeMenu" : "openMenu"} />
        </ButtonContainerStyled>
        {hamburgerMenuOpen && (
          <HamburgerMenuStyled ref={menuRef}>
            <HamburgerMenuItemStyled to="/ingredients">
              ADD RECIPE
            </HamburgerMenuItemStyled>
            <HamburgerMenuItemStyled
              onClick={() => {
                toggleAddIngredientModeMode(true);
                toggleHamburgerMenuOpen(false)
              }}
            >
              ADD INGREDIENT
            </HamburgerMenuItemStyled>
            <HamburgerMenuItemStyled to="/ingredients">
              ADD RECIPE CATEGORY
            </HamburgerMenuItemStyled>
            <HamburgerMenuItemStyled to="/ingredients">
              ADD INGREDIENT CATEGORY
            </HamburgerMenuItemStyled>
            <HamburgerMenuItemStyled to="/ingredients">
              BACKUP
            </HamburgerMenuItemStyled>
            <HamburgerMenuItemStyled to="/ingredients">
              PURGE
            </HamburgerMenuItemStyled>
          </HamburgerMenuStyled>
        )}
      </MainNavStyled>
      <TabsStyled>
        <TabStyled to="/recipes" active={pathname === "/recipes" ? 1 : 0}>
          RECIPES
        </TabStyled>
        <TabStyled
          to="/ingredients"
          active={pathname === "/ingredients" ? 1 : 0}
        >
          INGREDIENTS
        </TabStyled>
      </TabsStyled>
      <Outlet />
      {addIngredientMode && (
        <Ingredient isNew={true} toggleAddIngredientModeMode={toggleAddIngredientModeMode} />
      )}
    </>
  );
}

export default Navbar;
