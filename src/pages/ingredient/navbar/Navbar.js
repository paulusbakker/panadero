import React, { useState } from "react";
import Symbol from "../../../components/shared/Symbol";
import {
  BackgroundOverlayStyled,
  NavButtonContainerStyled,
  NavButtonStyled,
  NavLinkStyled,
  NavStyled,
  PopupStyled
} from './Styles'


function Navbar({ ingredientName, deleteIngredient, editIngredient }) {
  const [deleteWindow, toggleDeleteWindow] = useState(false);
  const [editWindow, toggleEditWindow] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleDeleteWindow(false);
    }
  };

  return (
    <>
      {deleteWindow && (
        <BackgroundOverlayStyled onClick={handleOverlayClick}>
          <PopupStyled>
            <p>Delete ingredient:</p>
            Are you sure you want to delete the following ingredient?
            <hr />
            <b>{ingredientName}</b>
            <hr />
            Existing recipes will be unaffected.
            <div>
              <button onClick={() => toggleDeleteWindow(false)}>Cancel</button>
              <button onClick={deleteIngredient}>Delete</button>
            </div>
          </PopupStyled>
        </BackgroundOverlayStyled>
      )}
      <NavStyled>
        <NavLinkStyled to="/recipes">PANADERO</NavLinkStyled>
        <NavButtonContainerStyled>
          <NavButtonStyled  onClick={() => toggleEditWindow(true)}>
            <Symbol type={"pencil"} />
          </NavButtonStyled >
          <NavButtonStyled  onClick={() => toggleDeleteWindow(true)}>
            <Symbol type={"delete"} />
          </NavButtonStyled >
        </NavButtonContainerStyled>
      </NavStyled>
    </>
  );
}

export default Navbar;
