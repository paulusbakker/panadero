import React, { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { recipeBookAtom } from "../../../atom/recipeBookAtom";
import Symbol from "../../../components/shared/Symbol";
import { calculateAmounts } from "../../../helper/calculateAmounts";
import { calculateTotalOverallLiquidPercentage } from "../../../helper/calculateTotalOverallLiquidPercentage";
import { flattenRecipe } from "../../../helper/flattenRecipe";
import {
  CenteredListItemStyled,
  DottedLine,
  ItemHeaderStyled,
  UnorderedListStyled,
} from "./Styles";
import ChoiceModal from "./choiceModal/ChoiceModal";
import EnterAmount from "./enterAmounts/EnterAmount";
import FlattenedRecipeItemViewer from "./flattenedRecipeItemViewer/FlattenedRecipeItemViewer";
import Navbar from "./navbar/Navbar";
import RecipeItemCost from "./recipeItemCost/RecipeItemCost";
import RecipeItemTotal from "./recipeItemTotal/RecipeItemTotal";

export const ACTIONS = {
  RESET_STATE: "reset_state",
  SHOW_CHOICE_MODAL: "show_choice_modal",
  CALCULATE_AMOUNTS: "calculate_amounts",
  HANDLE_SUBMIT: "handle_submit",
  HANDLE_ITEM_ID_OR_TOTAL: "handle_item_id_or_total",
  CANCEL: "cancel",
};
export const VIEWMODE = {
  VIEW_RECIPE: "view_recipe",
  VIEW_AMOUNTS: "view_amounts",
  VIEW_CHOICE_MODAL: "view_choice_modal",
  ENTER_AMOUNTS: "enter_amounts",
};

export const ITEM_NAMES = {
  TOTAL_FLOUR: "total flour",
  TOTAL_LIQUID: "total liquid",
  TOTAL_RECIPE: "total recipe",
};

const reducer = (viewRecipeState, action) => {
  switch (action.type) {
    case ACTIONS.HANDLE_SUBMIT:
      if (action.payload.weight === 0) return viewRecipeState;

      const [calculatedRecipe, totalFlourWeight, totalLiquidWeight] =
        calculateAmounts(
          viewRecipeState.flattenedRecipe,
          action.payload.weight,
          viewRecipeState.itemIdOrTotal,
          viewRecipeState.stepsMode
        );
      return {
        ...viewRecipeState,
        flattenedRecipe: calculatedRecipe,
        totalFlourWeight: totalFlourWeight,
        totalLiquidWeight: totalLiquidWeight,
        viewMode: VIEWMODE.VIEW_AMOUNTS,
      };
    case ACTIONS.SHOW_CHOICE_MODAL:
      return {
        ...viewRecipeState,
        viewMode: VIEWMODE.VIEW_CHOICE_MODAL,
        itemIdOrTotal: action.payload.itemIdOrTotal,
      };
    case ACTIONS.HANDLE_ITEM_ID_OR_TOTAL:
      return {
        ...viewRecipeState,
        viewMode: VIEWMODE.ENTER_AMOUNTS,
        itemIdOrTotal: action.payload.itemIdOrTotal,
        stepsMode: action.payload.stepsMode,
      };
    case ACTIONS.CANCEL:
      return { ...viewRecipeState, viewMode: VIEWMODE.VIEW_RECIPE };
    case ACTIONS.RESET_STATE:
      return action.payload;
    default:
      return viewRecipeState;
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
    viewMode: VIEWMODE.VIEW_RECIPE,
  };
}


function ViewRecipe() {
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

  if (!id) return null;
  console.log(recipeBook.recipes.get(id));
  console.log(flattenedRecipeState.flattenedRecipe);

  return (
    <>
      <Navbar id={id} />
      <UnorderedListStyled>
        {flattenedRecipeState.viewMode === VIEWMODE.VIEW_CHOICE_MODAL && (
          <ChoiceModal
            recipeId={
              flattenedRecipeState.flattenedRecipe[
                flattenedRecipeState.itemIdOrTotal
              ].id
            }
            sequenceNumber={
              flattenedRecipeState.flattenedRecipe[
                flattenedRecipeState.itemIdOrTotal
              ].sequenceNumber
            }
            stepsMode={flattenedRecipeState.stepsMode}
            dispatch={dispatch}
          />
        )}
        {flattenedRecipeState.viewMode === VIEWMODE.ENTER_AMOUNTS && (
          <EnterAmount
            name={
              ["total flour", "total liquid", "total recipe"].includes(
                flattenedRecipeState.itemIdOrTotal
              )
                ? flattenedRecipeState.itemIdOrTotal
                : flattenedRecipeState.flattenedRecipe[
                    flattenedRecipeState.itemIdOrTotal
                  ].name
            }
            dispatch={dispatch}
          />
        )}

        <ItemHeaderStyled>
          {flattenedRecipeState.flattenedRecipe[0].name}
          <Symbol type={"menu"} />
        </ItemHeaderStyled>
        {flattenedRecipeState.flattenedRecipe
          .slice(1)
          .map((flattenedRecipeItem) => (
            <FlattenedRecipeItemViewer
              key={`${flattenedRecipeItem.sequenceNumber}`}
              flattenedRecipeItem={flattenedRecipeItem}
              stepsMode={false}
              viewMode={flattenedRecipeState.viewMode}
              dispatch={dispatch}
            />
          ))}

        <DottedLine />

        {/*totals*/}
        <RecipeItemTotal
          name={ITEM_NAMES.TOTAL_FLOUR}
          isRecipe={false}
          isFlour={true}
          isLiquid={false}
          totalLiquidPercentage={null}
          viewMode={flattenedRecipeState.viewMode}
          dispatch={dispatch}
          weight={flattenedRecipeState.totalFlourWeight}
        />
        <RecipeItemTotal
          name={ITEM_NAMES.TOTAL_LIQUID}
          isRecipe={false}
          isFlour={false}
          isLiquid={true}
          totalLiquidPercentage={calculateTotalOverallLiquidPercentage(
            flattenedRecipeState.flattenedRecipe
          )}
          viewMode={flattenedRecipeState.viewMode}
          dispatch={dispatch}
          weight={flattenedRecipeState.totalLiquidWeight}
        />
        <RecipeItemTotal
          name={ITEM_NAMES.TOTAL_RECIPE}
          isRecipe={true}
          isFlour={false}
          isLiquid={false}
          totalLiquidPercentage={null}
          viewMode={flattenedRecipeState.viewMode}
          dispatch={dispatch}
          weight={flattenedRecipeState.flattenedRecipe[0].weight}
        />
        {flattenedRecipeState.viewMode === VIEWMODE.VIEW_AMOUNTS && (
          <button
            onClick={() => dispatch({ type: ACTIONS.CANCEL })}
          >
            C
          </button>
        )}
      </UnorderedListStyled>

      {/* StepsMode: ingredients minus predoughs */}
      <UnorderedListStyled>
        {flattenedRecipeState.flattenedRecipe.some(
          (flattenedRecipeItem) => flattenedRecipeItem.depth !== 0
        ) && (
          <>
            <CenteredListItemStyled>
              Ingredients minus predoughs
            </CenteredListItemStyled>
            {flattenedRecipeState.flattenedRecipe
              .slice(1)
              .map((flattenedRecipeItem) => (
                <FlattenedRecipeItemViewer
                  key={`${flattenedRecipeItem.sequenceNumber}`}
                  flattenedRecipeItem={flattenedRecipeItem}
                  stepsMode={true}
                  viewMode={flattenedRecipeState.viewMode}
                  dispatch={dispatch}
                />
              ))}
          </>
        )}
      </UnorderedListStyled>

      {/* Costs */}
      <UnorderedListStyled>
        {flattenedRecipeState.viewMode === VIEWMODE.VIEW_AMOUNTS && (
          <>
            <CenteredListItemStyled>Costs</CenteredListItemStyled>
            {flattenedRecipeState.flattenedRecipe
              .slice(1)
              .map(
                (flattenedRecipeItem) =>
                  flattenedRecipeItem.depth === 0 && (
                    <RecipeItemCost
                      key={`${flattenedRecipeItem.sequenceNumber}-${flattenedRecipeItem.id}`}
                      flattenedRecipeItem={flattenedRecipeItem}
                      totalRecipe={false}
                    />
                  )
              )}

            <hr />
            <RecipeItemCost
              flattenedRecipeItem={flattenedRecipeState.flattenedRecipe[0]}
              totalRecipe={true}
            />
          </>
        )}
      </UnorderedListStyled>
    </>
  );
}

export default ViewRecipe;
