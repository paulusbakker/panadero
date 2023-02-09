import React, {useState} from 'react'
import {MdClose} from 'react-icons/md'
import {Outlet, Link, useLocation} from 'react-router-dom'
import Symbol from '../../components/Symbol'

function RecipeNavbar() {
    const location = useLocation()

    return (<>
        <nav className="main-nav">
            <Link className="main-nav__link" to="/"><span className="main-nav__recipe-name"><Symbol
                type="bread"/>{location.state.recipeName}</span></Link>
            <ul className="main-nav-right">
                <li ><Symbol type="delete"/></li>
                <li><Symbol type="add"/></li>
            </ul>
        </nav>
        <div>
            {location.state.recipeName}
        </div>
    </>)
}

export default RecipeNavbar
