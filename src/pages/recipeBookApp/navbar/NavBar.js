import React, { useEffect, useRef, useState } from "react";
import "../../../styles.css";
import { Outlet, useLocation } from "react-router-dom";
import Symbol from "../../../components/shared/Symbol";
import {
  MainNavStyled,
  MainNavButtonStyled,
  MainNavItemStyled,
  MainNavLinkStyled,
  MainNavListStyled,
  TabItemStyled,
  TabsStyled,
} from "./NavBar.styles";

function NavBar() {
  const [hamburgerMenuOpen, toggleHamburgerMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOnContent, true);
    return () =>
      document.removeEventListener("click", handleClickOnContent, true);
  }, []);

  const handleClickOnContent = () => {
    if (ref.current) toggleHamburgerMenuOpen(false);
  };
  return (
    <>
      <MainNavStyled>
        <MainNavLinkStyled
          onClick={() => toggleHamburgerMenuOpen(false)}
          to="/recipes"
        >
          PANADERO
        </MainNavLinkStyled>
        <MainNavButtonStyled
          onClick={() => toggleHamburgerMenuOpen(!hamburgerMenuOpen)}
        >
          <Symbol type={hamburgerMenuOpen ? "closeMenu" : "openMenu"} />
        </MainNavButtonStyled>
        {hamburgerMenuOpen && (
          <MainNavListStyled>
            <MainNavItemStyled>ADD RECIPE</MainNavItemStyled>
            <MainNavItemStyled>ADD INGREDIENT</MainNavItemStyled>
            <MainNavItemStyled>ADD RECIPE CATEGORY</MainNavItemStyled>
            <MainNavItemStyled>ADD INGREDIENT</MainNavItemStyled>
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
      <div ref={ref}>
        <Outlet />
      </div>
    </>
  );
}

export default NavBar;
