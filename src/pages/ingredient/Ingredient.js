import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { recipeBookAtom } from "../../atom/recipeBookAtom";
import { useRecoilState } from "recoil";
import { getIngredientFromIngredientName } from "../../helper/getIngredientFromIngredientName";
import { IngredientDetailsContainer, ItemHeaderStyled } from "./Styles";
import Navbar from "./navbar/Navbar";

function Ingredient() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [recipeBook, setRecipeBook] = useRecoilState(recipeBookAtom);
  const ingredientName = state ? state.ingredientName || "" : "";

  // redirect non-existing url's
  useEffect(() => {
    if (!ingredientName) navigate("/recipes", { replace: true });
  }, [ingredientName, navigate]);

  // if no recipeName, no output! This can happen when a URL like /recipe/{recipeName} does not exist
  if (!ingredientName) return null;

  const ingredient = getIngredientFromIngredientName(
    ingredientName,
    recipeBook
  );

  const editIngredient = () => {};

  const deleteIngredient = () => {
    setRecipeBook((prevRecipeBook) => {
      const updatedIngredients = new Map(prevRecipeBook.ingredients);
      for (const ingredient of updatedIngredients.values()) {
        if (ingredient.name === ingredientName) {
          ingredient.isArchived = true;
          break;
        }
      }
      return { ...prevRecipeBook, ingredients: updatedIngredients };
    });
    navigate("/ingredients");
  };

  return (
    <>
      <Navbar
        ingredientName={ingredientName}
        deleteIngredient={deleteIngredient}
        editIngredient={editIngredient}
      />
      <IngredientDetailsContainer>
        <ItemHeaderStyled>{ingredientName}</ItemHeaderStyled>
        <ItemHeaderStyled>
          <span>Category:</span>
          <span>
            {recipeBook.ingredientCategories.get(ingredient.category)}
          </span>
        </ItemHeaderStyled>
        <ItemHeaderStyled>
          <span>Price per kilo:</span>
          <span>{ingredient.pricePerKilo}</span>
        </ItemHeaderStyled>
        <ItemHeaderStyled>
          <span>Calories per gram:</span>
          <span>{ingredient.caloriesPerGram}</span>
        </ItemHeaderStyled>
      </IngredientDetailsContainer>
    </>
  );
}

export default Ingredient;
