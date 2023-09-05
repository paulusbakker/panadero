import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import theme from "./styles/Theme";
import Recipe from "./pages/recipe/Recipe";
import NoPage from "./pages/recipeBookApp/noPage/NoPage";
import RecipeBookApp from "./pages/recipeBookApp/RecipeBookApp";
import Ingredient from "./pages/ingredient/Ingredient";
import { recipeBookAtom } from "./atom/recipeBookAtom";
import { useRecoilState } from "recoil";
import { makeRecipeBook } from "./helper/makeRecipeBook";
import Navbar from "./pages/recipeBookApp/navbar/Navbar";

const router = createBrowserRouter([
  // Homepage #1, active tab=recipes: /recipes
  {
    path: "/recipes",
    element: <Navbar />,
    children: [
      {
        path: "/recipes",
        element: <RecipeBookApp />,
      },
    ],
  },
  // Homepage #2, active tab=ingredients: /ingredients
  {
    path: "/ingredients",
    element: <Navbar />,
    children: [
      {
        path: "/ingredients",
        element: <RecipeBookApp />,
      },
    ],
  },
  // View recipe: /recipe/{recipe_id}
  {
    path: "/recipe/:id",
    element: <Recipe />,
    // children: [
    //   {
    //     path: "/recipe/:id",
    //     element: <Recipe />,
    //   },
    // ],
  },
  // View ingredient: /ingredient/{ingredient_id}
  {
    path: "/ingredient/:id",
    element: <Ingredient />,
    // children: [
    //   {
    //     path: "/ingredient/:id",
    //     element: <Ingredient />,
    //   },
    // ],
  },
  {
    path: "*",
    element: <NoPage />,
  },
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
