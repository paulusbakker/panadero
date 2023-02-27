import React, { useEffect, useReducer } from "react";
import { useRecoilValue } from "recoil";
import { recipeBookAtom } from "../../atom/recipeBookAtom";
import "../../styles.css";
import RecipesAccordion from "./components/RecipesAccordion";
import IngredientsAccordion from "./components/IngredientsAccordion";
import { getRecipesByCategory } from "../../helper/getRecipesByCategory";
import { getIngredientsByCategory } from "../../helper/getIngredientsByCategory";

const initialState = {
    showRecipes: true,
    recipesByCategory: null,
    ingredientsByCategory: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "TOGGLE_SHOW_RECIPES":
            return {
                ...state,
                showRecipes: true,
            };
        case "TOGGLE_SHOW_INGREDIENTS":
            return {
                ...state,
                showRecipes: false,
            };
        case "SET_RECIPES_BY_CATEGORY":
            return {
                ...state,
                recipesByCategory: action.payload,
            };
        case "SET_INGREDIENTS_BY_CATEGORY":
            return {
                ...state,
                ingredientsByCategory: action.payload,
            };
        default:
            return state;
    }
}

function RecipeBook() {
    const recipeBook = useRecoilValue(recipeBookAtom);
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const recipesByCategory = getRecipesByCategory(recipeBook);
        const ingredientsByCategory = getIngredientsByCategory(recipeBook);
        dispatch({ type: "SET_RECIPES_BY_CATEGORY", payload: recipesByCategory });
        dispatch({
            type: "SET_INGREDIENTS_BY_CATEGORY",
            payload: ingredientsByCategory,
        });
    }, [recipeBook]);

    const toggleShowRecipes = () => {
        dispatch({ type: "TOGGLE_SHOW_RECIPES" });
    };

    const toggleShowIngredients = () => {
        dispatch({ type: "TOGGLE_SHOW_INGREDIENTS" });
    };

    return (
        <>
            <div className="tabs">
                <nav
                    className={state.showRecipes ? "tabs__item --active" : "tabs__item"}
                    onClick={toggleShowRecipes}
                >
                    RECIPES
                </nav>
                <nav
                    className={!state.showRecipes ? "tabs__item --active" : "tabs__item"}
                    onClick={toggleShowIngredients}
                >
                    INGREDIENTS
                </nav>
            </div>
            <div className="recipes-ingredients">
                {state.showRecipes && (
                    <ul className="recipes-ingredients-list">
                        {state.recipesByCategory?.map((category, index) => (
                            <RecipesAccordion
                                key={index}
                                category={category}
                                recipeBook={recipeBook}
                            />
                        ))}
                    </ul>
                )}
                {!state.showRecipes && (
                    <ul className="recipes-ingredients-list">
                        {state.ingredientsByCategory?.map((category, index) => (
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

export default RecipeBook;
