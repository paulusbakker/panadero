import './styles.css'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import RecipeBookNavbar from './pages/recipebook/components/RecipeBookNavbar'
import RecipeBook from './pages/recipebook/RecipeBook'
import NoPage from './pages/NoPage'
import EditRecipe from './pages/editRecipe/EditRecipe'
import {recipeBookAtom} from './atom/recipeBookAtom'
import {useRecoilState} from 'recoil'
import {makeRecipeBook} from './helper/makeRecipeBook'
import React, {useEffect} from 'react'
import Recipe from './pages/recipe/Recipe.js'
import RecipeNavbar from './pages/recipe/components/RecipeNavbar.js'
import EditRecipeNavbar from './pages/editRecipe/EditRecipeNavbar'

function App() {

    const [, setRecipeBook] = useRecoilState(recipeBookAtom)
    useEffect(() => {
        setRecipeBook(makeRecipeBook())
    }, [])


    return (<BrowserRouter>
        <Routes>
            <Route path="/recipebook" element={<RecipeBookNavbar/>}>
                <Route index element={<RecipeBook/>}/>
            </Route>
            <Route path="/" element={<Navigate replace to="/recipebook"/>}/>
            <Route path="*" element={<NoPage/>}/>
            <Route path="/view-recipe/" element={<RecipeNavbar/>}>
                <Route path=":id" element={<Recipe/>}/>
            </Route>
            <Route path="/edit-recipe/" element={<EditRecipeNavbar/>}>
                <Route path=":id" element={<EditRecipe/>}/>
            </Route>
        </Routes>
    </BrowserRouter>)
}

export default App


