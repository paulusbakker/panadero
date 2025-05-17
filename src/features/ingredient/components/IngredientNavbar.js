import React from "react";
import SymbolStyles from '../../../shared/components/SymbolStyles';
import {
  NavButtonContainerStyled,
  NavButtonStyled,
  NavLinkStyled,
  NavStyled,
} from './IngredientNavbarStyles'

function IngredientNavbar({ toggleEditIngredientWindow, toggleDeleteIngredientWindow }) {


  return (
      <NavStyled>
        <NavLinkStyled to="/ingredients">PANADERO</NavLinkStyled>
        <NavButtonContainerStyled>
          <NavButtonStyled  onClick={toggleEditIngredientWindow}>
            <SymbolStyles type={"pencil"} />
          </NavButtonStyled >
          <NavButtonStyled  onClick={toggleDeleteIngredientWindow}>
            <SymbolStyles type={"delete"} />
          </NavButtonStyled >
        </NavButtonContainerStyled>
      </NavStyled>
  );
}

export default IngredientNavbar;
