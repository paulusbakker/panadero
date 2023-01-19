import React, {useEffect, useRef, useState} from 'react'
import '../../../styles.css'
import {Outlet, Link} from 'react-router-dom'
import Symbol from '../../../components/Symbol'

function HomeNavbar() {
    const [hamburgerMenuOpen, toggleHamburgerMenuOpen] = useState(false)

    const ref = useRef(null)

    useEffect(() => {
        document.addEventListener('click', handleClickOnContent, true)
        return () =>
            document.removeEventListener('click', handleClickOnContent, true)
    }, [])

    const handleClickOnContent = () => {
        if (ref.current) toggleHamburgerMenuOpen(false)

    }

    return (
        <>
            <nav className="main-nav">
                <Link className="main-nav__link" onClick={()=>toggleHamburgerMenuOpen(false)} to="/">PANADERO</Link>
                <button className="main-nav__button" onClick={()=>toggleHamburgerMenuOpen(!hamburgerMenuOpen)}>
                    {hamburgerMenuOpen ? (
                        <Symbol type={'closeMenu'} className="main-nav__button--closed"/>
                    ) : (
                        <Symbol type={'menu'} className="main-nav__button--open"/>
                    )}
                </button>
                {hamburgerMenuOpen &&
                    <ul className="main-nav__list">
                        <li className="main-nav__item">
                            ADD RECIPE
                        </li>
                        <li className="main-nav__item">
                            ADD INGREDIENT
                        </li>
                        <li className="main-nav__item">
                            ADD RECIPE CATEGORY
                        </li>
                        <li className="main-nav__item">
                            ADD INGREDIENT
                        </li>
                    </ul>}

            </nav>
            <div ref={ref}>
                <Outlet/>
            </div>
        </>
    )
}

export default HomeNavbar