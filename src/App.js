import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {ThemeProvider} from 'styled-components'
import { GlobalStyle } from "./styles/GlobalStyle";
import theme from './styles/Theme'
import Navbar from "./pages/recipe/navbar/Navbar";
import Recipe from "./pages/recipe/Recipe";
import NoPage from "./pages/NoPage";
import RecipeBookApp from "./pages/recipeBookApp/recipeBookApp/RecipeBookApp";
import IngredientNavbar from "./pages/ingredient/navbar/IngredientNavbar";
import Ingredient from "./pages/ingredient/Ingredient";
import { recipeBookAtom } from "./atom/recipeBookAtom";
import { useRecoilState } from "recoil";
import { makeRecipeBook } from "./helper/makeRecipeBook";
import MainNavbar from "./pages/recipeBookApp/navbar/Navbar"; {/* renaming Navbar into MainNavbar */}

const router = createBrowserRouter([
  // Homepage #1, active tab=recipes: /recipes
  {
    path: "/recipes",
    element: <MainNavbar />,
    children: [
      {
        path: "/recipes",
        element: <RecipeBookApp />,
      },
    ],
  },
  // View recipe: /recipe/{recipe_id}
  {
    path: "/recipe/:id",
    element: <Navbar />,
    children: [
      {
        path: "/recipe/:id",
        element: <Recipe />,
      },
    ],
  },
  // View ingredient: /ingredient/{ingredient_id}
  {
    path: "/ingredient/:id",
    element: <IngredientNavbar />,
    children: [
      {
        path: "/ingredient/:id",
        element: <Ingredient />,
      },
    ],
  },

  // Homepage #2, active tab=ingredients: /ingredients
  {
    path: "/ingredients",
    element: <MainNavbar />,
    children: [
      {
        path: "/ingredients",
        element: <RecipeBookApp />,
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
  }, [setRecipeBook]);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
