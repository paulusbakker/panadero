import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryTitle from "../../components/CategoryTitle";
import { urlify } from "../../../../helper/urlify";

function RecipesAccordion({ category, recipeBook }) {
  const [isOpen, setIsOpen] = useState(false);

  //voorkom 'verschuiving' van openstaande categorie wanneer een categorie veranderd wordt van naam
  useEffect(() => {
    setIsOpen(false);
  }, [recipeBook]);

  return (
    <li
      className="recipes-ingredients-list__item"
      onClick={() => setIsOpen(!isOpen)}
    >
      <CategoryTitle
        categoryName={category.categoryName}
        categoryLength={category.recipesInCategory.length}
        isRecipe={true}
      />
      {isOpen && (
        <ul className="recipes-ingredients-list__item__list">
          {category.recipesInCategory.map((recipeName, index) => (
            <Link
              key={index}
              to={`/recipe/${urlify(recipeName)}`}
              state={{ recipeName: recipeName }}
            >
              <li
                className="recipes-ingredients-list__item__list__item"
                key={index}
              >
                {recipeName}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </li>
  );
}

export default RecipesAccordion;