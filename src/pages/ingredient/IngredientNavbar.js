import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Symbol from "../../components/shared/Symbol";
import { convertToUrlFormat } from "../../helper/convertToUrlFormat";
import {
  MainNavButtonContainerStyled, MainNavItemStyled,
  MainNavLinkStyled, MainNavListStyled,
  MainNavStyled,
} from '../recipeBookApp/navbar/NavBar.styles'

function IngredientNavbar() {
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
          {/*<MainNavButtonContainerStyled>*/}
          {/*  {hamburgerMenuOpen ? (*/}
          {/*    <MdClose className="main-nav__button--closed" />*/}
          {/*  ) : (*/}
          {/*    <Symbol type={"menu"} className="main-nav__button--open" />*/}
          {/*  )}*/}
          {/*</MainNavButtonContainerStyled>*/}
        </MainNavButtonContainerStyled>
        {hamburgerMenuOpen && (
            <MainNavListStyled>
              <MainNavItemStyled>SAVE AS</MainNavItemStyled>
              <MainNavItemStyled>EXPORT</MainNavItemStyled>
              <MainNavItemStyled>EXPENSE REPORT</MainNavItemStyled>
              <MainNavItemStyled>CALORIE REPORT</MainNavItemStyled>
            </MainNavListStyled>
          // <ul className="main-nav__list">
          //   <li className="main-nav__item">
          //     <Link onClick={() => closeMenu()} to="save as">
          //       SAVE AS
          //     </Link>
          //   </li>
          //   <li className="main-nav__item">
          //     <Link onClick={() => closeMenu()} to="export">
          //       EXPORT
          //     </Link>
          //   </li>
          //   <li className="main-nav__item">
          //     <Link onClick={() => closeMenu()} to="expense_report">
          //       EXPENSE REPORT
          //     </Link>
          //   </li>
          //   <li className="main-nav__item">
          //     <Link onClick={() => closeMenu()} to="calorie_report">
          //       CALORIE REPORT
          //     </Link>
          //   </li>
          // </ul>
        )}
      </MainNavStyled>
      <div onClick={()=>toggleHamburgerMenuOpen(false)}>
        <Outlet />
      </div>
    </>
  );
}

export default IngredientNavbar;
