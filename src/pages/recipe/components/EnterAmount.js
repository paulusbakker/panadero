import React, {useState} from 'react'

function EnterAmount({handleSubmit}) {
    const [weight, setWeight] = useState(0)

    // useEffect(() => {
    //     if (submit) {
    //         handleSubmit()
    //         setSubmit(false)
    //     }
    // }, [submit])



    // const handleClick = (e) => {
    //
    //     if (ref1.current) {
    //         if (e.target.className === 'backdrop') {
    //             setShowCalculatorWindow(false)
    //         }
    //         e.stopPropagation()
    //         e.preventDefault()
    //     }
    //     if (ref2.current) {
    //         if (e.target.className === 'backdrop__popup__submit') {
    //             setSubmit(true)
    //
    //         }
    //     }
    // }
    const handleChange = (e) => {
        setWeight(e.target.value)
    }

       return (
        <>
                <div className="backdrop">
                    <div className="backdrop__popup">
                        <p className="backdrop__popup__name">Enter amount</p>
                        <input type="number"
                               id="input"
                               aria-label="input"
                               onChange={handleChange}
                               value={weight}
                        />
                        <button onClick={()=>handleSubmit(weight)} className="backdrop__popup__submit" >Submit</button>
                    </div>
                </div>}
        </>
    )
}

export default EnterAmount