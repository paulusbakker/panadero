import React from 'react'
import {GiGrainBundle} from 'react-icons/gi'
import {BsBook, BsDroplet} from 'react-icons/bs'
import {BsCurrencyExchange} from 'react-icons/bs'
import {MdClose} from 'react-icons/md'
import {BsFillPencilFill} from 'react-icons/bs'
import {BiDotsVertical} from 'react-icons/bi'
import {ImCalculator} from 'react-icons/im'



function Symbol({type}) {
    return (
        <>
            {type === 'flour' && <GiGrainBundle className="symbol"/>}
            {type === 'isLiquid' && <BsDroplet className="symbol"/>}
            {type === 'recipe' && <BsBook className="symbol"/>}
            {type === 'money' && <BsCurrencyExchange className="symbol"/>}
            {type === 'calculator' && <ImCalculator className="symbol"/>}
            {type === 'menu' && <BiDotsVertical className="symbol"/>}
            {type === 'closeMenu' && <MdClose className="symbol"/>}
            {type === 'pencil' && <BsFillPencilFill className="symbol"/>}
        </>
    )
}

export default Symbol