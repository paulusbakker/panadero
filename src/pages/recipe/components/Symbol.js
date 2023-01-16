import React from 'react'
import {GiGrainBundle} from 'react-icons/gi'
import {BsBook, BsDroplet} from 'react-icons/bs'
import {GrMoney} from 'react-icons/gr'

function Symbol({type}) {
    return (
        <>
            {type==='flour' && <GiGrainBundle className="symbol"/>}
            {type==='isLiquid' && <BsDroplet className="symbol"/>}
            {type==='recipe' && <BsBook className="symbol"/>}
            {type==='coins' && <GrMoney className="symbol"/>}
        </>
    )
}

export default Symbol