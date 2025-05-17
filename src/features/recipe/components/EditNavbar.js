import React from "react";
import Symbol from "../../../../shared_components/Symbol";
import { ACTIONS } from "../../../../constants/constants";

import {
  NavButtonContainerStyled,
  NavButtonStyled,
  NavLinkStyled,
  NavStyled,
} from "./Styles";

function EditNavbar({ dispatch }) {
  return (
    <NavStyled>
      <NavLinkStyled to="/recipes">PANADERO</NavLinkStyled>
      <NavButtonContainerStyled>
        <NavButtonStyled
          onClick={() => dispatch({ type: ACTIONS.DELETE_RECIPE })}
        >
          <Symbol type={"delete"} />
        </NavButtonStyled>
        <NavButtonStyled onClick={() => dispatch({ type: ACTIONS.ADD_ITEM })}>
          <Symbol type={"add"} />
        </NavButtonStyled>
      </NavButtonContainerStyled>
    </NavStyled>
  );
}

export default EditNavbar;
