import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import theme from "./styles/Theme";
import ViewRecipe from "./pages/recipe/view/ViewRecipe";
import NoPage from "./pages/noPage/NoPage";
import Main from "./pages/main/Main";
import Ingredient from "./pages/ingredient/Ingredient";
import { recipeBookAtom } from "./atom/recipeBookAtom";
import { useRecoilState } from "recoil";
import { makeRecipeBook } from "./helper/makeRecipeBook";
import Navbar from "./pages/main/navbar/Navbar";
import EditRecipe from "./pages/recipe/edit/EditRecipe";

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
