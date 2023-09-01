import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../../../styles.css";
import Symbol from "../../../components/shared/Symbol";
import { TabItemStyled, TabsStyled } from "./Styles";
import {
  MainNavButtonContainerStyled,
  MainNavHamburgerMenuItemStyled,
  MainNavLinkStyled,
  MainNavHamburgerMenuStyled,
  MainNavStyled,
} from "../../../styles/SharedStyles";

function Navbar() {
  const [hamburgerMenuOpen, toggleHamburgerMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <MainNavStyled>
        <MainNavLinkStyled
          onClick={() => toggleHamburgerMenuOpen(false)}
          to="/recipes"
        >
          PANADERO
        </MainNavLinkStyled>
        <MainNavButtonContainerStyled
          onClick={() => toggleHamburgerMenuOpen(!hamburgerMenuOpen)}
        >
          <Symbol type={hamburgerMenuOpen ? "closeMenu" : "openMenu"} />
        </MainNavButtonContainerStyled>
        {hamburgerMenuOpen && (
          <MainNavHamburgerMenuStyled>
            <MainNavHamburgerMenuItemStyled>
              ADD RECIPE
            </MainNavHamburgerMenuItemStyled>
            <MainNavHamburgerMenuItemStyled>
              ADD INGREDIENT
            </MainNavHamburgerMenuItemStyled>
            <MainNavHamburgerMenuItemStyled>
              ADD RECIPE CATEGORY
            </MainNavHamburgerMenuItemStyled>
            <MainNavHamburgerMenuItemStyled>
              ADD INGREDIENT CATEGORY
            </MainNavHamburgerMenuItemStyled>
            <MainNavHamburgerMenuItemStyled>
              BACKUP
            </MainNavHamburgerMenuItemStyled>
            <MainNavHamburgerMenuItemStyled>
              PURGE
            </MainNavHamburgerMenuItemStyled>
          </MainNavHamburgerMenuStyled>
        )}
      </MainNavStyled>
      <TabsStyled>
        <TabItemStyled to="/recipes" active={pathname === "/recipes" ? 1 : 0}>
          RECIPES
        </TabItemStyled>
        <TabItemStyled
          to="/ingredients"
          active={pathname === "/ingredients" ? 1 : 0}
        >
          INGREDIENTS
        </TabItemStyled>
      </TabsStyled>
      <div onClick={() => toggleHamburgerMenuOpen(false)}>
        <Outlet />
      </div>
    </>
  );
}

export default Navbar;
