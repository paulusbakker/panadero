import React, { useEffect, useReducer } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { recipeBookAtom } from "../../../atom/recipeBookAtom";
import { getRecipeFromRecipeName } from "../../../helper/getRecipeFromRecipeName";
import { useRecoilValue } from "recoil";
import { flattenRecipe } from "../../../helper/flattenRecipe";
import { calculateAmounts } from "../../../helper/calculateAmounts";
import RecipeItem from "./recipeItem/RecipeItem";
import Symbol from "../../../components/shared/Symbol";
import EnterAmount from "./enterAmounts/EnterAmount";
import RecipeItemTotal from "./recipeItemTotal/RecipeItemTotal";
import RecipeItemCost from "./recipeItemCost/RecipeItemCost";
import { calculateTotalOverallLiquidPercentage } from "../../../helper/calculateTotalOverallLiquidPercentage";
import { findRecipesMissingIngredients } from "../../../helper/findRecipesMissingIngredients";
import {
  CenteredListItemStyled,
  UnorderedListStyled,
  DottedLine,
  ItemHeaderStyled,
} from "./Styles";
import Navbar from "./navbar/Navbar";

export const ACTIONS = {
  CALCULATE_AMOUNTS: "calculate_amounts",
  HANDLE_SUBMIT: "handle_submit",
  HANDLE_RECIPE_INDEX: "handle_recipe_item_index",
  CANCEL_CALCULATE_AMOUNT: "cancel_calculate_amount",
};
export const VIEWMODE = {
  VIEW_RECIPE: "view_recipe",
  VIEW_AMOUNTS: "view_amounts",
  ENTER_AMOUNTS: "enter_amounts",
};
const reducer = (recipeState, action) => {
  switch (action.type) {
    case ACTIONS.HANDLE_SUBMIT:
      // do nothing when 0 is entered by the user
      if (action.payload.weight === 0) return recipeState;

      const [calculatedRecipe, totalFLourWeight, totalLiquidWeight] =
        calculateAmounts(
          recipeState.recipe,
          action.payload.weight,
          recipeState.index,
          recipeState.stepsMode
        );
      return {
        ...recipeState,
        recipe: calculatedRecipe,
        totalFlourWeight: totalFLourWeight,
        totalLiquidWeight: totalLiquidWeight,
        viewMode: VIEWMODE.VIEW_AMOUNTS,
      };
    case ACTIONS.HANDLE_RECIPE_INDEX:
      return {
        ...recipeState,
        viewMode: VIEWMODE.ENTER_AMOUNTS,
        index: action.payload.index,
        stepsMode: action.payload.stepsMode,
      };
    case ACTIONS.CANCEL_CALCULATE_AMOUNT:
      return { ...recipeState, viewMode: VIEWMODE.VIEW_RECIPE };
    default:
      return recipeState;
  }
};

function ViewRecipe() {
  const navigate = useNavigate();
  const recipeBook = useRecoilValue(recipeBookAtom);
  console.log(recipeBook);

  const { id } = useParams(); // probably using id and not for example recipeId because it can be an ingredientId as well
  // redirect non-existing url's
  console.log(id)
  useEffect(() => {
    if (!id) navigate("/recipes", { replace: true });
  }, [id, navigate]);

  const initialState = {
    recipe: id ? flattenRecipe(id, recipeBook) : null,
    index: null,
    stepsMode: false,
    currentWeight: 0,
    totalFlourWeight: 0,
    totalLiquidWeight: 0,
    viewMode: VIEWMODE.VIEW_RECIPE,
  };
  const [recipeState, dispatch] = useReducer(reducer, initialState);

  const faultyRecipes = findRecipesMissingIngredients(
    id,
    recipeBook
  );
  console.log(faultyRecipes);
  // if no id, no output! This can happen when a URL like /recipe/{id} does not exist
  if (!id) return null;

  return (
    <>
      <Navbar id={id} />
      <UnorderedListStyled>
        {recipeState.viewMode === VIEWMODE.ENTER_AMOUNTS && (
          <EnterAmount
            name={
              isNaN(recipeState.index) // index might be filled with for example 'Total flour'
                ? recipeState.index
                : recipeState.recipe[Math.abs(recipeState.index) + 1].name
            }
            dispatch={dispatch}
          />
        )}
        <ItemHeaderStyled>
          {recipeState.recipe[0].name}
          <Symbol type={"menu"} />
        </ItemHeaderStyled>
        {recipeState.recipe.slice(1).map((recipeItem, index) => (
          <RecipeItem
            key={`recipe-item-${index}`}
            recipeItem={recipeItem}
            index={index}
            stepsMode={false}
            viewMode={recipeState.viewMode}
            dispatch={dispatch}
          />
        ))}
        <DottedLine />

        {/*totals*/}
        <RecipeItemTotal
          name={"total flour"}
          isRecipe={false}
          isFlour={true}
          isLiquid={false}
          totalLiquidPercentage={null}
          viewMode={recipeState.viewMode}
          dispatch={dispatch}
          weight={recipeState.totalFlourWeight}
        />
        <RecipeItemTotal
          name={"total liquid"}
          isRecipe={false}
          isFlour={false}
          isLiquid={true}
          totalLiquidPercentage={calculateTotalOverallLiquidPercentage(
            recipeState.recipe
          )}
          viewMode={recipeState.viewMode}
          dispatch={dispatch}
          weight={recipeState.totalLiquidWeight}
        />
        <RecipeItemTotal
          name={"total recipe"}
          isRecipe={true}
          isFlour={false}
          isLiquid={false}
          totalLiquidPercentage={null}
          viewMode={recipeState.viewMode}
          dispatch={dispatch}
          weight={recipeState.recipe[0].weight}
        />
        {recipeState.viewMode === VIEWMODE.VIEW_AMOUNTS && (
          <button
            onClick={() => dispatch({ type: ACTIONS.CANCEL_CALCULATE_AMOUNT })}
          >
            C
          </button>
        )}
      </UnorderedListStyled>

      {/*StepsMode: ingredients minus predoughs*/}
      <UnorderedListStyled>
        {recipeState.recipe.some((recipeItem) => recipeItem.depth !== 0) && (
          <>
            <CenteredListItemStyled>
              Ingredients minus predoughs
            </CenteredListItemStyled>
            {recipeState.recipe.slice(1).map((recipeItem, index) => {
              return (
                <RecipeItem
                  key={`recipe-item-${index}`}
                  recipeItem={recipeItem}
                  index={index}
                  stepsMode={true}
                  viewMode={recipeState.viewMode}
                  dispatch={dispatch}
                />
              );
            })}
          </>
        )}
      </UnorderedListStyled>

      {/*costs*/}
      <UnorderedListStyled>
        {recipeState.viewMode === VIEWMODE.VIEW_AMOUNTS && (
          <>
            <CenteredListItemStyled>Costs</CenteredListItemStyled>
            {recipeState.recipe
              .slice(1)
              .map(
                (recipeItem, index) =>
                  recipeItem.depth === 0 && (
                    <RecipeItemCost
                      key={`recipe-item-${index}`}
                      recipeItem={recipeItem}
                      totalRecipe={false}
                    />
                  )
              )}
            <hr />
            <RecipeItemCost
              recipeItem={recipeState.recipe[0]}
              totalRecipe={true}
            />
          </>
        )}
      </UnorderedListStyled>
    </>
  );
}

export default ViewRecipe;
