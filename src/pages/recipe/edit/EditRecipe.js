import React, { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { flattenRecipe } from "../../../helper/flattenRecipe";
import { recipeBookAtom } from "./../../../atom/recipeBookAtom";
import { ACTIONS, VIEWMODE } from "../../../constants/constants";
import { UnorderedListStyled } from "./Styles";
import FlattenedRecipeItemEditor from "./flattenedRecipeItemEditor/FlattenedRecipeItemEditor";
import Navbar from "./navbar/Navbar";

const reducer = (editRecipeState, action) => {
  switch (action.type) {
    case ACTIONS.HANDLE_SUBMIT:
      break;
      case ACTIONS.CANCEL:
      return { ...editRecipeState, viewMode: VIEWMODE.VIEW_RECIPE };
    case ACTIONS.RESET_STATE:
      return action.payload;
    default:
      return editRecipeState;
  }
};
 
function createInitialState(id, recipeBook) {
  return {
    flattenedRecipe: id ? flattenRecipe(id, recipeBook) : null,
    itemIdOrTotal: null,
    stepsMode: false,
    currentWeight: 0,
    totalFlourWeight: 0,
    totalLiquidWeight: 0,
    viewMode: VIEWMODE.EDIT_RECIPE,
  };
}
function EditRecipe() {
  const navigate = useNavigate();
  const recipeBook = useRecoilValue(recipeBookAtom);

  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      navigate("/recipes", { replace: true });
    } else {
      const newState = createInitialState(id, recipeBook);
      dispatch({ type: ACTIONS.RESET_STATE, payload: newState });
    }
  }, [id, navigate, recipeBook]);

  const initialState = createInitialState(id, recipeBook);
  const [flattenedRecipeState, dispatch] = useReducer(reducer, initialState);

  const flattenedRecipe = id ? flattenRecipe(id, recipeBook) : null;

  console.log(flattenedRecipe);
  return (
    <>
      <Navbar dispatch={dispatch} />
      <UnorderedListStyled>
  {flattenedRecipe
    .slice(1)
    .filter(item => 
      item.depth === 0 || (item.depth === 1 && item.isRecipe === true)
    )
    .map((flattenedRecipeItem) => (
      <FlattenedRecipeItemEditor
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
