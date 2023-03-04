import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryTitle from "../../components/CategoryTitle";
import { urlify } from "../../../../helper/urlify";

function IngredientsAccordion({ category, recipeBook }) {
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
        categoryLength={category.ingredientsInCategory.length}
        isRecipe={false}
      />
      {isOpen && (
        <ul className="recipes-ingredients-list__item__list">
          {category.ingredientsInCategory.map((ingredient, index) => (
            <Link
              key={index}
              to={`/ingredients/${urlify(ingredient)}`}
              state={{ recipe: ingredient }}
            >
              <li
                className="recipes-ingredients-list__item__list__item"
                key={index}
              >
                {ingredient}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </li>
  );
}

export default IngredientsAccordion;
