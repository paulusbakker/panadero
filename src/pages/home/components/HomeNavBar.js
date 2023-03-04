import React, { useEffect, useRef, useState } from "react";
import "../../../styles.css";
import { Outlet, Link, useLocation } from "react-router-dom";
import Symbol from "../../../components/Symbol";

function HomeNavBar() {
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
      <nav className="main-nav">
        <Link
          className="main-nav__link"
          onClick={() => toggleHamburgerMenuOpen(false)}
          to="/recipes"
        >
          PANADERO
        </Link>
        <button
          className="main-nav__button"
          onClick={() => toggleHamburgerMenuOpen(!hamburgerMenuOpen)}
        >
          {hamburgerMenuOpen ? (
            <Symbol type={"closeMenu"} className="main-nav__button--closed" />
          ) : (
            <Symbol type={"menu"} className="main-nav__button--open" />
          )}
        </button>
        {hamburgerMenuOpen && (
          <ul className="main-nav__list">
            <li className="main-nav__item">ADD RECIPE</li>
            <li className="main-nav__item">ADD INGREDIENT</li>
            <li className="main-nav__item">ADD RECIPE CATEGORY</li>
            <li className="main-nav__item">ADD INGREDIENT</li>
          </ul>
        )}
      </nav>
      <div className="tabs">
        <Link
          className={
            pathname === "/recipes" ? "tabs__item --active" : "tabs__item"
          }
          to="/recipes"
        >
          RECIPES
        </Link>
        <Link
          className={
            pathname === "/ingredients" ? "tabs__item --active" : "tabs__item"
          }
          to="/ingredients"
        >
          INGREDIENTS
        </Link>
      </div>
      <div ref={ref}>
        <Outlet />
      </div>
    </>
  );
}

export default HomeNavBar;
