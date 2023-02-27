import "./styles.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RecipeBookNavbar from "./pages/recipebook/components/RecipeBookNavbar";
import RecipeBook from "./pages/recipebook/RecipeBook";
import NoPage from "./pages/NoPage";
import { recipeBookAtom } from "./atom/recipeBookAtom";
import { useRecoilState } from "recoil";
import { makeRecipeBook } from "./helper/makeRecipeBook";
import React, { useEffect } from "react";
import Recipe from "./pages/recipe/Recipe.js";
import RecipeNavbar from "./pages/recipe/components/RecipeNavbar";
import EditRecipe from "./pages/editRecipe/EditRecipe";

function App() {
  const [, setRecipeBook] = useRecoilState(recipeBookAtom);
  useEffect(() => {
    setRecipeBook(makeRecipeBook());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/recipebook" element={<RecipeBookNavbar />}>
          <Route index element={<RecipeBook />} />
        </Route>
        <Route path="/" element={<Navigate replace to="/recipebook" />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/" element={<RecipeNavbar />}>
          <Route path=":id" element={<Recipe />} />
        </Route>
        {/*<Route path="/edit-recipe/:id" element={<EditRecipe />}></Route>*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
