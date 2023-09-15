import React from "react";
import Symbol from '../../../../components/shared/Symbol'
import {
  NavButtonContainerStyled,
  NavButtonStyled,
  NavLinkStyled,
  NavStyled,
} from './Styles'


function Navbar({ toggleDeleteRecipePopup, toggleAddRecipeMode}) {


  return (
      <NavStyled>
        <NavLinkStyled to="/recipes">PANADERO</NavLinkStyled>
        <NavButtonContainerStyled>
          <NavButtonStyled  onClick={toggleDeleteRecipePopup}>
            <Symbol type={"delete"} />
          </NavButtonStyled >
          <NavButtonStyled  onClick={toggleAddRecipeMode}>
            <Symbol type={"add"} />
          </NavButtonStyled >
        </NavButtonContainerStyled>
      </NavStyled>
  );
}

export default Navbar;
