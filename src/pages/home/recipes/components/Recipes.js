import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { recipeBookAtom } from "../../../../atom/recipeBookAtom";
import RecipesAccordion from "./RecipesAccordion";
import { getRecipesByCategory } from "../../../../helper/getRecipesByCategory";

function Recipes() {
  const recipeBook = useRecoilValue(recipeBookAtom);
  const [recipesByCategory, setRecipesByCategory] = useState();

  useEffect(() => {
    setRecipesByCategory(getRecipesByCategory(recipeBook));
  }, [recipeBook]);

  return (
    <>
      <div className="recipes-ingredients">
        <ul className="recipes-ingredients-list">
          {recipesByCategory?.map((category, index) => (
            <RecipesAccordion
              key={index}
              category={category}
              recipeBook={recipeBook}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default Recipes;
