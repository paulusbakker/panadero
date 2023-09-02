import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { recipeBookAtom } from "../../atom/recipeBookAtom";
import { useRecoilValue } from "recoil";
import { getIngredientFromIngredientName } from "../../helper/getIngredientFromIngredientName";
import {
  ContentUlStyled,
  ItemHeaderStyled,
} from "./Styles";

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
      <ContentUlStyled>
        <ItemHeaderStyled>{ingredientName}</ItemHeaderStyled>
        <ItemHeaderStyled>
          <span>Category:</span>
          <span>{recipeBook.ingredientCategories.get(ingredient.category)}</span>
        </ItemHeaderStyled>
        <ItemHeaderStyled>
          <span>Price per kilo:</span>
          <span>{ingredient.pricePerKilo}</span>
        </ItemHeaderStyled>
        <ItemHeaderStyled>
          <span>Calories per gram:</span>
          <span>{ingredient.caloriesPerGram}</span>
        </ItemHeaderStyled>
      </ContentUlStyled>
  );
}

export default Ingredient;
