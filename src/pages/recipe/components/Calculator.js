import React, {useEffect, useRef, useState} from 'react'
import {ImCalculator} from 'react-icons/im'

function Calculator({index, handleWeight}) {
    const [showCalculatorWindow, setShowCalculatorWindow] = useState(false)
    const [weight, setWeight] = useState(0)
    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        document.addEventListener('click', handleClick)
        return () =>
            document.removeEventListener('click', handleClick)
    },)

    useEffect(() => {
        if (submit) {
            handleSubmit()
            setSubmit(false)
        }
    }, [submit])

    const ref1 = useRef(null)
    const ref2 = useRef(null)

    const handleClick = (e) => {

        if (ref1.current) {
            if (e.target.className === 'backdrop') {
                setShowCalculatorWindow(false)
            }
            e.stopPropagation()
            e.preventDefault()
        }
        if (ref2.current) {
            if (e.target.className === 'backdrop__popup__submit') {
                setSubmit(true)

            }
        }
    }
    const handleChange = (e) => {
        setWeight(e.target.value)
    }

    const handleSubmit = () => {
        setShowCalculatorWindow(false)
        handleWeight({weight, index})
    }

    return (
        <>
            <ImCalculator className="symbol"
                          onClick={
                              (e) => {
                                  setShowCalculatorWindow(!showCalculatorWindow)
                                  e.stopPropagation()
                              }}
            />
            {showCalculatorWindow &&
                <div className="backdrop" ref={ref1}>
                    <div className="backdrop__popup">
                        <p className="backdrop__popup__name">Enter amount</p>
                        <input type="number"
                               id="input"
                               aria-label="input"
                               onChange={handleChange}
                               value={weight}
                        />
                        <button className="backdrop__popup__submit" ref={ref2}>Submit</button>
                    </div>
                </div>}
        </>
    )
}

export default Calculator