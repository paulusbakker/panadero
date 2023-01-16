import './styles.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomeNavbar from './pages/home - recipes ingredients/components/HomeNavbar'
import RecipeBook from './pages/home - recipes ingredients/RecipeBook'
import NoPage from './pages/NoPage'
import AddRecipe from './pages/AddRecipe'
import AddIngredient from './pages/AddIngredient'
import AddRecipeCategory from './pages/AddRecipeCategory'
import AddIngredientCategory from './pages/AddIngredientCategory'
import {recipeBookAtom} from './atom/recipeBookAtom'
import {useRecoilState} from 'recoil'
import {makeRecipeBook} from './helper/makeRecipeBook'
import React, {useEffect} from 'react'
import Recipe from './pages/recipe/Recipe.js'
import RecipeNavbar from './pages/recipe/components/RecipeNavbar.js'

function App() {

    const [, setRecipeBook] = useRecoilState(recipeBookAtom)
    useEffect(() => {
            setRecipeBook(makeRecipeBook())
        },
        [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={(<HomeNavbar/>)}>
                    <Route index element={<RecipeBook/>}/>
                    {/*<Route path="add_recipe" element={<AddRecipe/>}/>*/}
                    {/*<Route path="recipe" element={<Recipe/>}/>*/}
                    {/*<Route path="add_ingredient" element={<AddIngredient/>}/>*/}
                    {/*<Route path="add_recipe_category" element={<AddRecipeCategory/>}/>*/}
                    {/*<Route path="add_ingredient_category" element={<AddIngredientCategory/>}/>*/}
                    <Route path="*" element={<NoPage/>}/>
                </Route>
                <Route path="/recipe" element={(<RecipeNavbar/>)}>
                    <Route index element={<Recipe/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App


