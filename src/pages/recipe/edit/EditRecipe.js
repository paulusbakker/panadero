import React, { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { flattenRecipe } from "../../../helper/flattenRecipe";
import { recipeBookAtom } from "./../../../atom/recipeBookAtom";
import Navbar from "./navbar/Navbar";
import { UnorderedListStyled } from "./Styles";
import FlattenedRecipeItem from "./flattenedRecipeItem/FlattenedRecipeItem";

export const ACTIONS = {
  DELETE_RECIPE: "delete_recipe",
  ADD_ITEM: "add_item",
};
export const VIEWMODE = {
  VIEW_RECIPE: "view_recipe",
};

const reducer = (flattenedRecipeState, action) => {
  switch (action.type) {
    case ACTIONS.HANDLE_SUBMIT:

    default:
      return flattenedRecipeState;
  }
};
function EditRecipe() {
  const navigate = useNavigate();
  const recipeBook = useRecoilValue(recipeBookAtom);

  const { id } = useParams();
  useEffect(() => {
    if (!id) navigate("/recipes", { replace: true });
  }, [id, navigate]);

  const initialState = {
    flattenedRecipe: id ? flattenRecipe(id, recipeBook) : null,
    itemId: null,
    viewMode: VIEWMODE.VIEW_RECIPE,
  };
  const [flattenedRecipeState, dispatch] = useReducer(reducer, initialState);
  const [deleteRecipePopup, toggleDeleteRecipePopup] = useState(false);
  const [addRecipeMode, toggleAddRecipeMode] = useState(false);


  const flattenedRecipe = id ? flattenRecipe(id, recipeBook) : null;

  console.log(flattenedRecipe);
  return (
    <>
      <Navbar
      dispatch{dispatch}
        toggleDeleteRecipePopup={togglePopupOrMode(toggleDeleteRecipePopup)}
        toggleAddRecipeMode={togglePopupOrMode(toggleAddRecipeMode)}
      />
      <UnorderedListStyled>
        {flattenedRecipe.slice(1).map((flattenedRecipeItem) => (
          <FlattenedRecipeItem
            key={`${flattenedRecipeItem.sequenceNumber}`}
            flattenedRecipeItem={flattenedRecipeItem}
            stepsMode={false}
            viewMode={flattenedRecipeState.viewMode}
            dispatch={dispatch}
          />
        ))}
      </UnorderedListStyled>
    </>
  );
}

export default EditRecipe;
