import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ThemeProvider } from "styled-components";
import { recipeBookAtom } from "../state/recipeBookAtom";
import { makeRecipeBook } from "../helper/makeRecipeBook";
import Ingredient from "../features/ingredient/components/Ingredient";
import Main from "../features/main/components/Main";
import Navbar from "../features/main/components/Navbar";
import NoPage from "../features/noPage/NoPage";
import EditRecipe from "../features/recipe/EditRecipe";
import ViewRecipe from "../features/recipe/ViewRecipe";
import { GlobalStyle } from "../shared/styles/GlobalStyle";
import theme from "../shared/styles/Theme";

const router = createBrowserRouter([
  // Homepage #1, active tab=recipes: /recipes
  {
    path: "/recipes",
    element: <Navbar />,
    children: [
      {
        path: "/recipes",
        element: <Main />,
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
        element: <Main />,
      },
    ],
  },
  {
    path: "/recipe/edit/:id",
    element: <EditRecipe />,
  },
  {
    path: "/recipe/view/:id",
    element: <ViewRecipe />,
  },
  {
    path: "/ingredient/view/:id",
    element: <Ingredient />,
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
