import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Symbol from "../../components/shared/Symbol";
import { convertToUrlFormat } from "../../helper/convertToUrlFormat";
import {
  MainNavButtonContainerStyled, MainNavItemStyled,
  MainNavLinkStyled, MainNavListStyled,
  MainNavStyled,
} from '../recipeBookApp/navbar/NavBar.styles'

function RecipeNavbar() {
  const { state } = useLocation();

  const recipeName = state ? state.recipeName || "" : "";

  const [hamburgerMenuOpen, toggleHamburgerMenuOpen] = useState(false);

  return (
    <>
      <MainNavStyled>
        <MainNavLinkStyled
          onClick={() => toggleHamburgerMenuOpen(!hamburgerMenuOpen)}
          to="/recipes"
        >
          PANADERO
        </MainNavLinkStyled>
        <MainNavButtonContainerStyled>
          {!hamburgerMenuOpen && (
            <div>
              <Link
                to={`/edit-recipe/${convertToUrlFormat(recipeName)}`}
                state={{ recipeName: recipeName }}
              >
                <Symbol type={"pencil"} />
              </Link>
            </div>
          )}
          <MainNavButtonContainerStyled
            onClick={() => toggleHamburgerMenuOpen(!hamburgerMenuOpen)}
          >
            <Symbol type={hamburgerMenuOpen ? "closeMenu" : "openMenu"} />
          </MainNavButtonContainerStyled>

        </MainNavButtonContainerStyled>
        {hamburgerMenuOpen && (
            <MainNavListStyled>
              <MainNavItemStyled>EXPORT</MainNavItemStyled>
              <MainNavItemStyled>EXPENSE REPORT</MainNavItemStyled>
              <MainNavItemStyled>CALORIE REPORT</MainNavItemStyled>
            </MainNavListStyled>
        )}
      </MainNavStyled>
      <div onClick={()=>toggleHamburgerMenuOpen(false)}>
        <Outlet />
      </div>
    </>
  );
}

export default RecipeNavbar;
