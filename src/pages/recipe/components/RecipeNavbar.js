import React, {useState} from 'react'
import {MdClose} from 'react-icons/md'
import {Outlet, Link} from 'react-router-dom'
import Symbol from '../../../components/Symbol'

function RecipeNavbar() {
    const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false)
    const handleToggle = () => {
        setHamburgerMenuOpen(!hamburgerMenuOpen)
    }
    const closeMenu = () => {
        setHamburgerMenuOpen(false)
    }
    return (
        <>
            <nav className="main-nav">
                <Link className="main-nav__link" onClick={() => closeMenu()} to="/">PANADERO</Link>
                {/*<span className="main-nav__recipe-name">Recipe: {location.state.recipe}</span>*/}
                <ul className="main-nav-right">
                    {!hamburgerMenuOpen && <li>
                        <Symbol type={'pencil'} className="main-nav__button"/>
                    </li>}
                    <li>
                        <button className="main-nav__button" onClick={handleToggle}>
                            {hamburgerMenuOpen ? (
                                <MdClose className="main-nav__button--closed"/>
                            ) : (
                                <Symbol type={'menu'} className="main-nav__button--open"/>
                            )}
                        </button>
                    </li>
                </ul>
                {hamburgerMenuOpen &&
                    <ul className="main-nav__list">
                        <li className="main-nav__item">
                            <Link onClick={() => closeMenu()} to="save as">SAVE AS</Link>
                        </li>
                        <li className="main-nav__item">
                            <Link onClick={() => closeMenu()} to="export">EXPORT</Link>
                        </li>
                        <li className="main-nav__item">
                            <Link onClick={() => closeMenu()} to="expense_report">EXPENSE REPORT</Link>
                        </li>
                        <li className="main-nav__item">
                            <Link onClick={() => closeMenu()} to="calorie_report">CALORIE REPORT</Link>
                        </li>
                    </ul>}
            </nav>
            <div onClick={closeMenu}>
                <Outlet/>
            </div>
        </>
    )
}

export default RecipeNavbar