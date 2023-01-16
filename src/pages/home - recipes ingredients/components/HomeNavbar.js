import React, {useEffect, useRef, useState} from 'react'
import '../../../styles.css'
import {MdClose} from 'react-icons/md'
import {FiMenu} from 'react-icons/fi'

import {Outlet, Link} from 'react-router-dom'

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
                        <MdClose className="main-nav__button--closed"/>
                    ) : (
                        <FiMenu className="main-nav__button--open"/>
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