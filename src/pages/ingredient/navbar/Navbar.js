import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Symbol from "../../../components/shared/Symbol";
import { NavButtonContainerStyled, NavLinkStyled, NavStyled } from "./Styles";

function Navbar() {
  const { state } = useLocation();
  const ingredientName = state ? state.ingredientName || "" : "";

  const editIngredient = () => {};

  const deleteIngredient = () => {};

  return (
    <>
      <NavStyled>
        <NavLinkStyled to="/recipes">PANADERO</NavLinkStyled>
        <NavButtonContainerStyled>
          <div onClick={editIngredient}>
            <Symbol type={"pencil"} />
          </div>
          <div onClick={deleteIngredient}>
            <Symbol type={"delete"} />
          </div>
        </NavButtonContainerStyled>
      </NavStyled>
      <Outlet />
    </>
  );
}

export default Navbar;
