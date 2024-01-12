import React, { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { flattenRecipe } from "../../../helper/flattenRecipe";
import { recipeBookAtom } from "./../../../atom/recipeBookAtom";
import Navbar from "./navbar/Navbar";
import { UnorderedListStyled } from "./Styles";
import FlattenedRecipeItemEditor from "./flattenedRecipeItemEditor/FlattenedRecipeItemEditor";

export const ACTIONS = {
  DELETE_RECIPE: "delete_recipe",
  ADD_ITEM: "add_item",
};
export const VIEWMODE = {
  VIEW_RECIPE: "view_recipe",
};

const reducer = (editRecipeState, action) => {
  switch (action.type) {
    case ACTIONS.HANDLE_SUBMIT:
      break;
    default:
      return editRecipeState;
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
  const [editRecipeState, dispatch] = useReducer(reducer, initialState);

  const flattenedRecipe = id ? flattenRecipe(id, recipeBook) : null;

  console.log(flattenedRecipe);
  return (
    <>
      <Navbar dispatch={dispatch} />
      <UnorderedListStyled>
        {flattenedRecipe.slice(1).map((flattenedRecipeItem) => (
          <FlattenedRecipeItemEditor
            key={`${flattenedRecipeItem.sequenceNumber}`}
            flattenedRecipeItem={flattenedRecipeItem}
            stepsMode={false}
            viewMode={editRecipeState.viewMode}
            dispatch={dispatch}
          />
        ))}
      </UnorderedListStyled>
    </>
  );
}

export default EditRecipe;
