// import React, { cloneElement, useState } from 'react'
import React from '../kreact'
import { useState } from '../kreact/react-dom'

function CloneInput(props) {
    return React.cloneElement(<input />, {
        placeholder: 'wahaha',
        ...props
    })
}

export default function CloneElementPage() {
    const [value, setValue] = useState('')
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    return <CloneInput value={value} onChange={handleChange}></CloneInput>
}