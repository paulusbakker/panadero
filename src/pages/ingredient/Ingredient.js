import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Navbar from "./navbar/Navbar";
import DeletePopup from "./deletePopup/DeletePopup";
import EditPopup from "./editPopup/EditPopup";
import {
  BackgroundOverlayStyled,
  IngredientDetailsContainer,
  ItemHeaderStyled,
} from "./Styles";
import { Ingredient as IngredientClass } from "../../classes/Ingredient";
import { recipeBookAtom } from "../../atom/recipeBookAtom";
import { nanoid } from "nanoid";

const Ingredient = ({ isNew: propIsNew, toggleAddIngredientMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipeBook, setRecipeBook] = useRecoilState(recipeBookAtom);
  const isNew = propIsNew !== undefined;
  const [deletePopup, setDeletePopup] = useState(false);
  const [editPopup, setEditPopup] = useState(isNew);

  const ingredientName = isNew ? "" : recipeBook.ingredients.get(id).name;
  const ingredient = isNew
    ? IngredientClass.createNew()
    : recipeBook.ingredients.get(id);
  console.log(ingredient);

  const sortedCategories = useMemo(
    () => getSortedCategories(recipeBook.ingredientCategories),
    [recipeBook.ingredientCategories]
  );
  const defaultCategory = isNew
    ? sortedCategories[0]
      ? sortedCategories[0][0]
      : 0
    : 0;

  const [editableName, setEditableName] = useState(ingredientName);
  const [selectedCategory, setSelectedCategory] = useState(
    isNew ? defaultCategory : ingredient.category
  );
  const [editablePrice, setEditablePrice] = useState(
    ingredient ? ingredient.pricePerKilo : 0
  );
  const [editableCalories, setEditableCalories] = useState(
    ingredient ? ingredient.caloriesPerGram : 0
  );

  const navigateIfIngredientMissing = () => {
    if (!ingredientName && !isNew) {
      navigate("/recipes", { replace: true });
    }
  };

  useEffect(navigateIfIngredientMissing, [ingredientName, navigate, isNew]);

  const togglePopup = (PopupSetter) => () => PopupSetter((prev) => !prev);

  const handleEditOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      togglePopup(setEditPopup)();
      if (isNew) toggleAddIngredientMode(false);
    }
  };

  const handleDeleteOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      togglePopup(setDeletePopup)();
    }
  };

  const updateRecipeBook = (updatedIngredient) => {
    setRecipeBook((prev) => {
      const updatedIngredients = new Map(prev.ingredients);
      const newId = isNew ? nanoid() : id;
      updatedIngredients.set(newId, updatedIngredient);

      return { ...prev, ingredients: updatedIngredients };
    });
  };

  const deleteIngredient = () => {
    setRecipeBook((prev) => {
      const updatedIngredients = new Map(prev.ingredients);
      const ingredient = updatedIngredients.get(id);

      if (ingredient) {
        ingredient.isArchived = true;
        updatedIngredients.set(id, ingredient);
      }

      return { ...prev, ingredients: updatedIngredients };
    });
    navigate("/ingredients");
  };

  const submitChanges = () => {
    const updatedIngredient = new IngredientClass(
      editableName,
      selectedCategory,
      Number(editableCalories),
      Number(editablePrice)
    );
    updateRecipeBook(updatedIngredient);

    if (!isNew) {
      togglePopup(setEditPopup)();
      navigate(`/ingredient/${id}`, {});
      return;
    }

    toggleAddIngredientMode(false);
  };

  return (
    <>
      {!isNew && (
        <>
          <Navbar
            toggleEditIngredientWindow={togglePopup(setEditPopup)}
            toggleDeleteIngredientWindow={togglePopup(setDeletePopup)}
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
      )}
      {deletePopup && (
        <BackgroundOverlayStyled onClick={handleDeleteOverlayClick}>
          <DeletePopup
            ingredientName={ingredientName}
            closeWindow={togglePopup(setDeletePopup)}
            deleteIngredient={deleteIngredient}
          />
        </BackgroundOverlayStyled>
      )}
      {editPopup && (
        <BackgroundOverlayStyled onClick={handleEditOverlayClick}>
          <EditPopup
            editableName={editableName}
            setEditableName={setEditableName}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            editablePrice={editablePrice}
            setEditablePrice={setEditablePrice}
            editableCalories={editableCalories}
            setEditableCalories={setEditableCalories}
            submitChanges={submitChanges}
            sortedCategories={sortedCategories}
            closeWindow={() =>
              isNew ? toggleAddIngredientMode(false) : setEditPopup(false)
            }
          />
        </BackgroundOverlayStyled>
      )}
    </>
  );
};

const getSortedCategories = (ingredientCategories) => {
  return Array.from(ingredientCategories.entries()).sort((a, b) =>
    a[1].localeCompare(b[1])
  );
};
export default Ingredient;
