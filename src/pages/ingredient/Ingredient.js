import React, { useEffect, useMemo, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { recipeBookAtom } from "../../atom/recipeBookAtom";
import { getRecipeFromRecipeName } from "../../helper/getRecipeFromRecipeName";
import { useRecoilValue } from "recoil";
import { flattenRecipe } from "../../helper/flattenRecipe";
import { calculateAmounts } from "../../helper/calculateAmounts";
import Symbol from "../../components/shared/Symbol";
import {ContentHeaderStyled, MainCardStyled, PlainCardStyled} from '../../styles/SharedStyles'
import { getIngredientFromIngredientName } from "../../helper/getIngredientFromIngredientName";
import {RecipeListStyled} from '../recipe/Styles'

function Ingredient() {
  const navigate = useNavigate();
  const location = useLocation();
  const recipeBook = useRecoilValue(recipeBookAtom);
  const ingredientName = location.state?.ingredientName;

  // redirect non-existing url's
  useEffect(() => {
    if (!ingredientName) navigate("/recipes", { replace: true });
  }, []);

  // if no recipeName, no output! This can happen when a URL like /recipe/{recipeName} does not exist
  if (!ingredientName) return null;

  const ingredient = getIngredientFromIngredientName(
    ingredientName,
    recipeBook
  );

  return (
    <PlainCardStyled>
      <ContentHeaderStyled>
        {ingredientName}
      </ContentHeaderStyled>
      <RecipeListStyled>
        {/*/!*delete first element with slice because recipe title already printed*!/*/}
        {/*{recipeState.recipe.slice(1).map((recipeItem, index) => (*/}
        {/*  <RecipeItem*/}
        {/*    key={`recipe-item-${index}`}*/}
        {/*    recipeItem={recipeItem}*/}
        {/*    index={index}*/}
        {/*    stepsMode={false}*/}
        {/*    viewMode={recipeState.viewMode}*/}
        {/*    dispatch={dispatch}*/}
        {/*  />*/}
        {/*))}*/}
        {/*<hr />*/}
        {/*/!*totals*!/*/}
        {/*<ul>*/}
        {/*  <RecipeItemTotal*/}
        {/*    name={"total flour"}*/}
        {/*    isRecipe={false}*/}
        {/*    isFlour={true}*/}
        {/*    isLiquid={false}*/}
        {/*    totalLiquidPercentage={null}*/}
        {/*    viewMode={recipeState.viewMode}*/}
        {/*    dispatch={dispatch}*/}
        {/*    weight={recipeState.totalFlourWeight}*/}
        {/*  />*/}
        {/*  <RecipeItemTotal*/}
        {/*    name={"total liquid"}*/}
        {/*    isRecipe={false}*/}
        {/*    isFlour={false}*/}
        {/*    isLiquid={true}*/}
        {/*    totalLiquidPercentage={calculateTotalOveralLiquidPercentage(*/}
        {/*      recipeState.recipe*/}
        {/*    )}*/}
        {/*    viewMode={recipeState.viewMode}*/}
        {/*    dispatch={dispatch}*/}
        {/*    weight={recipeState.totalLiquidWeight}*/}
        {/*  />*/}
        {/*  <RecipeItemTotal*/}
        {/*    name={"total recipe"}*/}
        {/*    isRecipe={true}*/}
        {/*    isFlour={false}*/}
        {/*    isLiquid={false}*/}
        {/*    totalLiquidPercentage={null}*/}
        {/*    viewMode={recipeState.viewMode}*/}
        {/*    dispatch={dispatch}*/}
        {/*    weight={recipeState.recipe[0].weight}*/}
        {/*  />*/}
        {/*  {recipeState.viewMode === VIEWMODE.VIEW_AMOUNTS && (*/}
        {/*    <button*/}
        {/*      onClick={() =>*/}
        {/*        dispatch({ type: ACTIONS.CANCEL_CALCULATE_AMOUNT })*/}
        {/*      }*/}
        {/*    >*/}
        {/*      C*/}
        {/*    </button>*/}
        {/*  )}*/}
        {/*</ul>*/}
      </RecipeListStyled>
    </PlainCardStyled>
  );
}

export default Ingredient;
