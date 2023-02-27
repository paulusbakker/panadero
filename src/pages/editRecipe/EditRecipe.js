import React from "react";
import { Link, useLocation } from "react-router-dom";
import Symbol from "../../components/Symbol";
import RecipeItem from '../recipe/components/RecipeItem'

function EditRecipe() {
  const location = useLocation();

  return (
    <>
      <nav className="main-nav">
        <Link className="main-nav__link" to="/">
          <span className="main-nav__recipe-left">
            <Symbol type="bread" />
            {location.state.recipeName}
          </span>
        </Link>
        <ul className="main-nav-right">
          <li>
            <Symbol type="delete" />
          </li>
          <li>
            <Symbol type="add" />
          </li>
        </ul>
      </nav>
      <div>{location.state.recipeName}</div>
      {/*<ul className="recipe-list">*/}
      {/*  /!*delete first element with slice because recipe title already printed*!/*/}
      {/*  {flattenedRecipe.slice(1).map((recipeItem, index) => (*/}
      {/*      <RecipeItem*/}
      {/*          key={`recipe-item-${index}`}*/}
      {/*          recipeItem={recipeItem}*/}
      {/*          index={index}*/}
      {/*          showInclusive={true}*/}
      {/*          showAmounts={showAmounts}*/}
      {/*          handleRecipeItemIndex={handleRecipeItemIndex}*/}
      {/*      />*/}
      {/*  ))}*/}
      {/*</ul>*/}
    </>
  );
}

export default EditRecipe;
