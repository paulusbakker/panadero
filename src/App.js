import "./styles.css";
import { recipeBookAtom } from "./atom/recipeBookAtom";
import { useRecoilState } from "recoil";
import { makeRecipeBook } from "./helper/makeRecipeBook";
import React, { useEffect } from "react";
import HomeNavBar from "./pages/home/components/HomeNavBar";
import Recipes from "./pages/home/recipes/components/Recipes";
import Ingredients from "./pages/home/ingredients/components/Ingredients";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecipeNavbar from "./pages/recipe/components/RecipeNavbar";
import Recipe from "./pages/recipe/Recipe";
import NoPage from './pages/NoPage'

const router = createBrowserRouter([
  // Homepage #1, active tab=recipes: /recipes
  {
    path: "/recipes",
    element: <HomeNavBar />,
    children: [
      {
        path: "/recipes",
        element: <Recipes />,
      },
    ],
  },
  // View recipe: /recipe/{recipe_id}
  {
    path: "/recipe/:id",
    element: <RecipeNavbar />,
    children: [
      {
        path: "/recipe/:id",
        element: <Recipe />,
      },
    ],
  },
  // Edit recipe: /recipe/{recipe_id}/edit
  // {
  //   path: "/recipe/:id/edit",
  //   element: <EditRecipeNavBar />,
  // },

  // Homepage #2, active tab=ingredients: /ingredients
  {
    path: "/ingredients",
    element: <HomeNavBar />,
    children: [
      {
        path: "/ingredients",
        element: <Ingredients />,
      },
    ],
  },
  {
    path: "*",
    element: <NoPage />,

  },
  // View ingredient: /ingredient/{ingredient_id}
  // {
  //   path: "/ingredient/:id",
  //   element: <RecipeIngredientNavBar />,
  // },
  // {
  //   path: "/ingredient/:id/edit",
  //   element: <EditIngredientNavBar />,
  // },
]);

function App() {
  const [, setRecipeBook] = useRecoilState(recipeBookAtom);
  useEffect(() => {
    setRecipeBook(makeRecipeBook());
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
