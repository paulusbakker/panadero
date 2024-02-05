import { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { recipeBookAtom } from "../../../atom/recipeBookAtom";
import { ACTIONS, VIEWMODE } from "../../../constants/constants";
import { calculateAmounts } from "../../../helper/calculateAmounts";
import { createInitialState } from "../../../helper/createInitialState";
import Symbol from "../../../shared_components/Symbol";
import {
  DottedListLine,
  ListItemHeaderStyled,
  RecipeValidationListStyled,
} from "./Styles";
import AmountEntryComponent from "./amountEntryComponent/AmountEntryComponent";
import ChoiceModalHandler from "./choiceModalHandler/ChoiceModalHandler";
import ErrorHandlingComponent from "./errorHandlingComponent/ErrorHandlingComponent";
import Navbar from "./navbar/Navbar";
import RecipeCostListItems from "./recipeCostListItems/RecipeCostListItems";
import RecipeTotalsListItems from "./recipeTotalsListItems/RecipeTotalsListItems";
import IngredientsMinusPredoughsListItems from "./ingredientsMinusPredoughsListItems/IngredientsMinusPredoughsListItems";
import FlattenedRecipeListItems from "./flattenedRecipeListItems/FlattenedRecipeListItems";
const reducer = (flattenedRecipeState, action) => {
  console.log("Dispatched action:", action);
  console.log("Current state before update:", flattenedRecipeState);
  switch (action.type) {
    case ACTIONS.HANDLE_SUBMIT:
      if (action.payload.weight === 0) return flattenedRecipeState;

      const [calculatedRecipe, totalFlourWeight, totalLiquidWeight] =
        calculateAmounts(
          flattenedRecipeState.flattenedRecipe,
          action.payload.weight,
          flattenedRecipeState.itemIdOrTotal,
          flattenedRecipeState.stepsMode
        );
      return {
        ...flattenedRecipeState,
        flattenedRecipe: calculatedRecipe,
        totalFlourWeight: totalFlourWeight,
        totalLiquidWeight: totalLiquidWeight,
        viewMode: VIEWMODE.VIEW_AMOUNTS,
      };
    case ACTIONS.CLOSE_ERROR_POPUP:
      return {
        ...flattenedRecipeState,
        isFirstLoad: false,
        itemIdOrTotal: null,
      };
    case ACTIONS.SHOW_CHOICE_MODAL:
      if (flattenedRecipeState.isValidOverallRecipe)
        return {
          ...flattenedRecipeState,
          viewMode: VIEWMODE.VIEW_CHOICE_MODAL,
          itemIdOrTotal: action.payload.itemIdOrTotal,
        };
      else
        return {
          ...flattenedRecipeState,
          viewMode: VIEWMODE.SHOW_ERROR_POPUP,
          itemIdOrTotal: action.payload.itemIdOrTotal,
        };
    case ACTIONS.HANDLE_ITEM_ID_OR_TOTAL:
      if (flattenedRecipeState.isValidOverallRecipe)
        return {
          ...flattenedRecipeState,
          viewMode: VIEWMODE.ENTER_AMOUNTS,
          itemIdOrTotal: action.payload.itemIdOrTotal,
          stepsMode: action.payload.stepsMode,
        };
      else
        return {
          ...flattenedRecipeState,
          viewMode: VIEWMODE.SHOW_ERROR_POPUP,
          itemIdOrTotal: action.payload.itemIdOrTotal,
        };
    case ACTIONS.CANCEL:
      return { ...flattenedRecipeState, viewMode: VIEWMODE.VIEW_RECIPE };
    case ACTIONS.RESET_STATE:
      return action.payload;
    default:
      return flattenedRecipeState;
  }
};

function ViewRecipe() {
  const navigate = useNavigate();
  const recipeBook = useRecoilValue(recipeBookAtom);

  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      navigate("/recipes", { replace: true });
    } else {
      console.log("new");
      const newState = createInitialState(id, recipeBook);
      dispatch({ type: ACTIONS.RESET_STATE, payload: newState });
    }
  }, [id, navigate, recipeBook]);

  const [flattenedRecipeState, dispatch] = useReducer(reducer, {}, () => {
    return createInitialState(id, recipeBook);
  });
  if (!id) return null;

  return (
    <>
      {console.log("Updated state:", flattenedRecipeState)}
      <Navbar id={id} />{" "}
      <ErrorHandlingComponent // checked, no isValid class used
        flattenedRecipeState={flattenedRecipeState}
        dispatch={dispatch}
      />
      <ChoiceModalHandler // checked, no isValid class used
        flattenedRecipeState={flattenedRecipeState}
        dispatch={dispatch}
      />
      <AmountEntryComponent // checked, no isValid class used
        flattenedRecipeState={flattenedRecipeState}
        dispatch={dispatch}
      />{" "}
      <RecipeValidationListStyled
        $isValid={flattenedRecipeState.isValidOverallRecipe}
      >
        <ListItemHeaderStyled
          $IsValid={flattenedRecipeState.isValidOverallRecipe}
        >
          {flattenedRecipeState.flattenedRecipe[0].name}
          <Symbol type={"menu"} />
        </ListItemHeaderStyled>

        {flattenedRecipeState.flattenedRecipe
          .slice(1)
          .map((flattenedRecipeItem) => (
            <FlattenedRecipeListItems
              key={`${flattenedRecipeItem.sequenceNumber}`}
              flattenedRecipeItem={flattenedRecipeItem}
              stepsMode={false}
              viewMode={flattenedRecipeState.viewMode}
              dispatch={dispatch}
            />
          ))}

        <DottedListLine />

        <RecipeTotalsListItems
          flattenedRecipeState={flattenedRecipeState}
          dispatch={dispatch}
        />
        {flattenedRecipeState.viewMode === VIEWMODE.VIEW_AMOUNTS && (
          <button onClick={() => dispatch({ type: ACTIONS.CANCEL })}>C</button>
        )}
        <IngredientsMinusPredoughsListItems
          flattenedRecipeState={flattenedRecipeState}
          dispatch={dispatch}
        />
        <RecipeCostListItems flattenedRecipeState={flattenedRecipeState} />
      </RecipeValidationListStyled>
    </>
  );
}

export default ViewRecipe;
