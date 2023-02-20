import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { recipeBookAtom } from "../../atom/recipeBookAtom";
import "../../styles.css";
import RecipesAccordion from "./components/RecipesAccordion";
import IngredientsAccordion from "./components/IngredientsAccordion";
import { getRecipesByCategory } from "../../helper/getRecipesByCategory";
import { getIngredientsByCategory } from "../../helper/getIngredientsByCategory";

function RecipeBook() {
  const recipeBook = useRecoilValue(recipeBookAtom);
  const [showRecipes, toggleShowRecipes] = useState(true);
  const [recipesByCategory, setRecipesByCategory] = useState();
  const [ingredientsByCategory, setIngredientsByCategory] = useState();

  useEffect(() => {
    setRecipesByCategory(getRecipesByCategory(recipeBook));
    setIngredientsByCategory(getIngredientsByCategory(recipeBook));
  }, [recipeBook]);

  return (
    <>
      <div className="tabs">
        <nav
          className={showRecipes ? "tabs__item --active" : "tabs__item"}
          onClick={() => toggleShowRecipes(true)}
        >
          RECIPES
        </nav>
        <nav
          className={!showRecipes ? "tabs__item --active" : "tabs__item"}
          onClick={() => toggleShowRecipes(false)}
        >
          INGREDIENTS
        </nav>
      </div>
      <div className="recipes-ingredients">
        {showRecipes && (
          <ul className="recipes-ingredients-list">
            {recipesByCategory?.map((category, index) => (
              <RecipesAccordion
                key={index}
                category={category}
                recipeBook={recipeBook}
              />
            ))}
          </ul>
        )}
        {!showRecipes && (
          <ul className="recipes-ingredients-list">
            {ingredientsByCategory?.map((category, index) => (
              <IngredientsAccordion
                key={index}
                category={category}
                recipeBook={recipeBook}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default RecipeBook
