import "./styles.css";
import { recipeBookAtom } from "./atom/recipeBookAtom";
import { useRecoilState } from "recoil";
import { makeRecipeBook } from "./helper/makeRecipeBook";
import React, { useEffect } from "react";
import NavBar from "./pages/home/navbar/NavBar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecipeNavbar from "./pages/recipe/components/RecipeNavbar";
import Recipe from "./pages/recipe/Recipe";
import NoPage from "./pages/NoPage";
import { GlobalStyle } from "./styles/GlobalStyle";
import TabContainer from "./pages/home/TabContainer";

const router = createBrowserRouter([
  // Homepage #1, active tab=recipes: /recipes
  {
    path: "/recipes",
    element: <NavBar />,
    children: [
      {
        path: "/recipes",
        element: <TabContainer />,
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
    element: <NavBar />,
    children: [
      {
        path: "/ingredients",
        element: <TabContainer />,
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
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
