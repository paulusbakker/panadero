import React, { useState } from "react";
import { Link } from "react-router-dom";
import SymbolStyles from '../../../shared/components/SymbolStyles';
import {
  ButtonContainerStyled,
  HamburgerMenuItemStyled,
  HamburgerMenuStyled,
  MainNavLinkStyled,
  MainNavStyled,
  UnderlayWindow,
} from './ViewNavbarStyles';

function ViewNavbar({ id }) {
  const [hamburgerMenuOpen, toggleHamburgerMenuOpen] = useState(false);

  const closeHamburgerMenu = () => {
    toggleHamburgerMenuOpen(false);
  };

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
              <Link to={`/recipe/edit/${id}`} state={{ id }}>
                <SymbolStyles type={"pencil"} />
              </Link>
            </div>
          )}
          <ButtonContainerStyled
            onClick={() => toggleHamburgerMenuOpen(!hamburgerMenuOpen)}
          >
            <SymbolStyles type={hamburgerMenuOpen ? "closeMenu" : "openMenu"} />
          </ButtonContainerStyled>
        </ButtonContainerStyled>
        {hamburgerMenuOpen && (
          <>
            <HamburgerMenuStyled>
              <HamburgerMenuItemStyled>EXPORT</HamburgerMenuItemStyled>
              <HamburgerMenuItemStyled>EXPENSE REPORT</HamburgerMenuItemStyled>
              <HamburgerMenuItemStyled>CALORIE REPORT</HamburgerMenuItemStyled>
            </HamburgerMenuStyled>
            <UnderlayWindow onClick={closeHamburgerMenu}></UnderlayWindow>
          </>
        )}
      </MainNavStyled>
    </>
  );
}

export default ViewNavbar;
