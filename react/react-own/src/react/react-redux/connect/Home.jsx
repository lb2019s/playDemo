import React from 'react'
import Child from './Child'

function Home(props) {
    return (
        <div>
            <h2>Home count {props.count}</h2>
            <Child></Child>
        </div>
    )
}

export default Home