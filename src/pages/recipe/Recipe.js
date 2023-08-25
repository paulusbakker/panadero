import React, { useEffect, useMemo, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { recipeBookAtom } from "../../atom/recipeBookAtom";
import { getRecipeFromRecipeName } from "../../helper/getRecipeFromRecipeName";
import { useRecoilValue } from "recoil";
import { flattenRecipe } from "../../helper/flattenRecipe";
import { calculateAmounts } from "../../helper/calculateAmounts";
import RecipeItem from "./components/RecipeItem";
import Symbol from "../../components/shared/Symbol";
import EnterAmount from "./components/EnterAmount";
import RecipeItemTotal from "./components/RecipeItemTotal";
import RecipeItemCost from "./components/RecipeItemCost";
import { calculateTotalOveralLiquidPercentage } from "../../helper/calculateTotalOveralLiquidPercentage";
import { findRecipesMissingIngredients } from "../../helper/findRecipesMissingIngredients";
import { RecipeListStyled, CenteredListItem } from "./Styles";
import {ContentHeaderStyled, MainCardStyled} from '../../styles/SharedStyles'

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

function Recipe() {
  const navigate = useNavigate();
  const location = useLocation();
  const recipeBook = useRecoilValue(recipeBookAtom);
  const recipeName = location.state?.recipeName;

  // redirect non-existing url's
  useEffect(() => {
    if (!recipeName) navigate("/recipes", { replace: true });
  }, []);

  const initialState = useMemo(
    () => ({
      recipe: recipeName
        ? flattenRecipe(
            getRecipeFromRecipeName(recipeName, recipeBook),
            recipeBook
          )
        : null,
      index: null,
      stepsMode: false,
      currentWeight: 0,
      totalFlourWeight: 0,
      totalLiquidWeight: 0,
      viewMode: VIEWMODE.VIEW_RECIPE,
    }),
    [recipeName, recipeBook]
  );
  const [recipeState, dispatch] = useReducer(reducer, initialState);

  const faultyRecipes = findRecipesMissingIngredients(
    getRecipeFromRecipeName(recipeName, recipeBook),
    recipeBook
  );
  console.log(faultyRecipes);
  // if no recipeName, no output! This can happen when a URL like /recipe/{recipeName} does not exist
  if (!recipeName) return null;

  return (
    <>
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
      <MainCardStyled>
        <ContentHeaderStyled>
          {recipeState.recipe[0].name}
          <Symbol type={"menu"} />
        </ContentHeaderStyled>
        <RecipeListStyled>
          {/*delete first element with slice because recipe title already printed*/}
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
          <hr />
          {/*totals*/}
          <ul>
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
              totalLiquidPercentage={calculateTotalOveralLiquidPercentage(
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
                onClick={() =>
                  dispatch({ type: ACTIONS.CANCEL_CALCULATE_AMOUNT })
                }
              >
                C
              </button>
            )}
          </ul>
        </RecipeListStyled>
      </MainCardStyled>

      {/*StepsMode: ingredients minus predoughs*/}
      {recipeState.recipe.some((recipeItem) => recipeItem.depth !== 0) && (
        <MainCardStyled>
          <RecipeListStyled>
            <CenteredListItem>Ingredients minus predoughs</CenteredListItem>
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
          </RecipeListStyled>
        </MainCardStyled>
      )}
      {/*costs*/}
      {recipeState.viewMode === VIEWMODE.VIEW_AMOUNTS && (
        <MainCardStyled>
          <RecipeListStyled>
            <CenteredListItem>Costs</CenteredListItem>
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
          </RecipeListStyled>
        </MainCardStyled>
      )}
    </>
  );
}

export default Recipe;
