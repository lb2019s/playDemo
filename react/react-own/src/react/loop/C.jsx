import React, { useState } from 'react'
import A from './A'

function C() {
    const [state, setState] = useState(false)
    return (
        <div>
            <h3>C</h3>
            <button onClick={() => { setState(!state) }}>click me !</button>
            <p>---------------------</p>
            {state ? <A /> : null}
        </div>
    )
}

export default C