import React, { useEffect, useRef, useState } from "react";
import "../../../styles.css";
import { Outlet, useLocation } from "react-router-dom";
import Symbol from "../../../components/shared/Symbol";
import {
  MainNavStyled,
  MainNavButtonContainerStyled,
  MainNavItemStyled,
  MainNavLinkStyled,
  MainNavListStyled,
  TabItemStyled,
  TabsStyled,
} from "./NavBar.styles";

function NavBar() {
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
          <MainNavListStyled>
            <MainNavItemStyled>ADD RECIPE</MainNavItemStyled>
            <MainNavItemStyled>ADD INGREDIENT</MainNavItemStyled>
            <MainNavItemStyled>ADD RECIPE CATEGORY</MainNavItemStyled>
            <MainNavItemStyled>ADD INGREDIENT CATEGORY</MainNavItemStyled>
            <MainNavItemStyled>BACKUP</MainNavItemStyled>
            <MainNavItemStyled>PURGE</MainNavItemStyled>
          </MainNavListStyled>
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
      <div onClick={()=>toggleHamburgerMenuOpen(false)}>
        <Outlet />
      </div>
    </>
  );
}

export default NavBar;
