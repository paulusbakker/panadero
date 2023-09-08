import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Navbar from "./navbar/Navbar";
import DeleteWindow from "./deleteWindow/DeleteWindow";
import EditWindow from "./editWindow/EditWindow";
import {
  BackgroundOverlayStyled,
  IngredientDetailsContainer,
  ItemHeaderStyled,
} from "./Styles";
import { Ingredient as IngredientClass } from "../../classes/Ingredient";
import { recipeBookAtom } from "../../atom/recipeBookAtom";
import { getIngredientFromIngredientName } from "../../helper/getIngredientFromIngredientName";
import { convertToUrlFormat } from "../../helper/convertToUrlFormat";

const Ingredient = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [recipeBook, setRecipeBook] = useRecoilState(recipeBookAtom);
  const [isNew, setIsNew] = useState(state?.isNew || false);
  const [deleteWindow, setDeleteWindow] = useState(false);
  const [editWindow, setEditWindow] = useState(state?.isNew);
  const createNewIngredient = (
    name = "",
    category = 0,
    caloriesPerGram = 0,
    pricePerKilo = 0
  ) => new IngredientClass(name, category, caloriesPerGram, pricePerKilo);
  const ingredientName = state ? state.ingredientName || "" : "";
  const ingredient = isNew
    ? createNewIngredient()
    : getIngredientFromIngredientName(ingredientName, recipeBook);

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

  useEffect(() => {
    if (!ingredientName && !isNew) {
      navigate("/recipes", { replace: true });
    }
  }, [ingredientName, navigate, isNew]);

  const toggleWindow = (windowSetter) => () => windowSetter((prev) => !prev);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      if (isNew) {
        navigate(-1);
        return;
      }
      toggleWindow(deleteWindow ? setDeleteWindow : setEditWindow)();
    }
  };

  const updateRecipeBook = (updatedIngredient) => {
    setRecipeBook((prev) => {
      const updatedIngredients = new Map(prev.ingredients);

      if (isNew) {
        const maxKey = Math.max(...Array.from(updatedIngredients.keys()));
        updatedIngredients.set(maxKey + 1, updatedIngredient);
      } else {
        updatedIngredients.forEach((ingredient, key) => {
          if (ingredient.name === ingredientName) {
            updatedIngredients.set(key, updatedIngredient);
          }
        });
      }

      return { ...prev, ingredients: updatedIngredients };
    });
  };

  const deleteIngredient = () => {
    updateRecipeBook((updatedIngredients) => {
      updatedIngredients.forEach((ingredient) => {
        if (ingredient.name === ingredientName) {
          ingredient.isArchived = true;
        }
      });
    });
    navigate("/ingredients");
  };

  const submitChanges = () => {
    const updatedIngredient = createNewIngredient(
      editableName,
      Number(selectedCategory),
      Number(editableCalories),
      Number(editablePrice)
    );
    updateRecipeBook(updatedIngredient);
    toggleWindow(setEditWindow)();
    navigate(`/ingredient/${convertToUrlFormat(editableName)}`, {
      state: { ingredientName: editableName },
    });
    setIsNew(false);
  };

  return (
    <>
      <Navbar
        toggleEditIngredientWindow={toggleWindow(setEditWindow)}
        toggleDeleteIngredientWindow={toggleWindow(setDeleteWindow)}
      />
      {!isNew && (
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
      )}
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
            sortedCategories={sortedCategories}
            closeWindow={() => (isNew ? navigate(-1) : setEditWindow(false))}
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
