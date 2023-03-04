import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { recipeBookAtom } from "../../../../atom/recipeBookAtom";
import IngredientsAccordion from "./IngredientsAccordion";
import { getIngredientsByCategory } from "../../../../helper/getIngredientsByCategory";

function Ingredients() {
  const recipeBook = useRecoilValue(recipeBookAtom);
  const [ingredientsByCategory, setIngredientsByCategory] = useState();

  useEffect(() => {
    setIngredientsByCategory(getIngredientsByCategory(recipeBook));
  }, [recipeBook]);

  return (
    <>
      <div className="recipes-ingredients">
        <ul className="recipes-ingredients-list">
          {ingredientsByCategory?.map((category, index) => (
            <IngredientsAccordion
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

export default Ingredients;
