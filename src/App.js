import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ThemeProvider } from "styled-components";
import { recipeBookAtom } from "./atom/recipeBookAtom";
import { makeRecipeBook } from "./helper/makeRecipeBook";
import Ingredient from "./pages/ingredient/Ingredient";
import Main from "./pages/main/Main";
import Navbar from "./pages/main/navbar/Navbar";
import NoPage from "./pages/noPage/NoPage";
import EditRecipe from "./pages/recipe/edit/EditRecipe";
import ViewRecipe from "./pages/recipe/view/ViewRecipe";
import { GlobalStyle } from "./global_style & theme/GlobalStyle";
import theme from "./global_style & theme/Theme";

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
