import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Symbol from "../../../components/shared/Symbol";
import { convertToUrlFormat } from "../../../helper/convertToUrlFormat";
import {
  SpaceBelowNavbarStyled,
  ButtonContainerStyled,
  HamburgerMenuItemStyled,
  HamburgerMenuStyled,
  MainNavLinkStyled,
  MainNavStyled
} from './Styles'

function Navbar() {
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
        <ButtonContainerStyled>
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
          <ButtonContainerStyled
            onClick={() => toggleHamburgerMenuOpen(!hamburgerMenuOpen)}
          >
            <Symbol type={hamburgerMenuOpen ? "closeMenu" : "openMenu"} />
          </ButtonContainerStyled>

        </ButtonContainerStyled>
        {hamburgerMenuOpen && (
            <HamburgerMenuStyled>
              <HamburgerMenuItemStyled>EXPORT</HamburgerMenuItemStyled>
              <HamburgerMenuItemStyled>EXPENSE REPORT</HamburgerMenuItemStyled>
              <HamburgerMenuItemStyled>CALORIE REPORT</HamburgerMenuItemStyled>
            </HamburgerMenuStyled>
        )}
      </MainNavStyled>
      <SpaceBelowNavbarStyled onClick={()=>toggleHamburgerMenuOpen(false)}>
        <Outlet />
      </SpaceBelowNavbarStyled>
    </>
  );
}

export default Navbar;
