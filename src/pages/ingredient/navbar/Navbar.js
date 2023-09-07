import React from "react";
import Symbol from "../../../components/shared/Symbol";
import {
  NavButtonContainerStyled,
  NavButtonStyled,
  NavLinkStyled,
  NavStyled,
} from './Styles'


function Navbar({ toggleEditIngredientWindow, toggleDeleteIngredientWindow }) {


  return (
      <NavStyled>
        <NavLinkStyled to="/ingredients">PANADERO</NavLinkStyled>
        <NavButtonContainerStyled>
          <NavButtonStyled  onClick={toggleEditIngredientWindow}>
            <Symbol type={"pencil"} />
          </NavButtonStyled >
          <NavButtonStyled  onClick={toggleDeleteIngredientWindow}>
            <Symbol type={"delete"} />
          </NavButtonStyled >
        </NavButtonContainerStyled>
      </NavStyled>
  );
}

export default Navbar;
