import React from "react";
import SymbolStyles from "../../../shared/components/SymbolStyles";
import { ACTIONS } from "../../../shared/constants/constants";

import {
  NavButtonContainerStyled,
  NavButtonStyled,
  NavLinkStyled,
  NavStyled,
} from "./EditNavbarStyles";

function EditNavbar({ dispatch }) {
  return (
    <NavStyled>
      <NavLinkStyled to="/recipes">PANADERO</NavLinkStyled>
      <NavButtonContainerStyled>
        <NavButtonStyled
          onClick={() => dispatch({ type: ACTIONS.DELETE_RECIPE })}
        >
          <SymbolStyles type={"delete"} />
        </NavButtonStyled>
        <NavButtonStyled onClick={() => dispatch({ type: ACTIONS.ADD_ITEM })}>
          <SymbolStyles type={"add"} />
        </NavButtonStyled>
      </NavButtonContainerStyled>
    </NavStyled>
  );
}

export default EditNavbar;
