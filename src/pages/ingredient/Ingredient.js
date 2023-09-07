import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Navbar from "./navbar/Navbar";
import { Ingredient as IngredientClass } from "../../classes/Ingredient";
import { recipeBookAtom } from "../../atom/recipeBookAtom";
import { getIngredientFromIngredientName } from "../../helper/getIngredientFromIngredientName";
import {
  BackgroundOverlayStyled,
  IngredientDetailsContainer,
  ItemHeaderStyled,
} from "./Styles";
import { convertToUrlFormat } from "../../helper/convertToUrlFormat";
import DeleteWindow from "./deleteWindow/DeleteWindow";
import EditWindow from "./editWindow/EditWindow";

const Ingredient = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [recipeBook, setRecipeBook] = useRecoilState(recipeBookAtom);
  const [deleteWindow, setDeleteWindow] = useState(false);
  const [editWindow, setEditWindow] = useState(false);
  const ingredientName = state ? state.ingredientName || "" : "";

  useEffect(() => {
    if (!ingredientName) navigate("/recipes", { replace: true });
  }, [ingredientName, navigate]);

  const ingredient = getIngredientFromIngredientName(ingredientName, recipeBook);
  const [editableName, setEditableName] = useState(ingredientName);
  const [selectedCategory, setSelectedCategory] = useState(ingredient.category);
  const [editablePrice, setEditablePrice] = useState(ingredient.pricePerKilo);
  const [editableCalories, setEditableCalories] = useState(ingredient.caloriesPerGram);

  const toggleWindow = (windowSetter) => () => windowSetter(prev => !prev);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) toggleWindow(deleteWindow ? setDeleteWindow : setEditWindow)();
  };
  console.log(recipeBook)

  // higher-order function:
  const updateRecipeBook = (action) => {
    setRecipeBook(prev => {
      const updatedIngredients = new Map(prev.ingredients);
      updatedIngredients.forEach((ingredient, key) => {
        if (ingredient.name === ingredientName) {
          action(ingredient, key, updatedIngredients);
        }
      });
      return { ...prev, ingredients: updatedIngredients };
    });
  };

  const deleteIngredient = () => {
    updateRecipeBook((ingredient) => { ingredient.isArchived = true });
    navigate("/ingredients");
  };
  const submitChanges = () => {
    updateRecipeBook((_, key, updatedIngredients) => {
      const updatedIngredient = new IngredientClass(
          editableName,
          Number(selectedCategory),
          editableCalories,
          editablePrice

      );
      updatedIngredients.set(key, updatedIngredient);
    });
    toggleWindow(setEditWindow)();
    navigate(`/ingredient/${convertToUrlFormat(editableName)}`, { state: { ingredientName: editableName } });
  };

  return (
    <>
      <Navbar
        toggleEditIngredientWindow={toggleWindow(setEditWindow)}
        toggleDeleteIngredientWindow={toggleWindow(setDeleteWindow)}
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
      {deleteWindow && (
          <BackgroundOverlayStyled onClick={handleOverlayClick}>
            <DeleteWindow
                ingredientName={ingredientName}
                closeWindow={toggleWindow(setDeleteWindow)}
                deleteIngredient={deleteIngredient}
            />
          </BackgroundOverlayStyled>
      )}
      {editWindow && (
        <BackgroundOverlayStyled onClick={handleOverlayClick}>
          <EditWindow
            editableName={editableName}
            setEditableName={setEditableName}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            editablePrice={editablePrice}
            setEditablePrice={setEditablePrice}
            editableCalories={editableCalories}
            setEditableCalories={setEditableCalories}
            submitChanges={submitChanges}
            recipeBook={recipeBook}
            closeWindow={() => setEditWindow(false)}
          />
        </BackgroundOverlayStyled>
      )}
    </>
  );
};

export default Ingredient;
