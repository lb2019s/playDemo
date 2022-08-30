import React from 'react'
import Home from './Home'
import Context from './context'

function App() {
    return (
        <div>
            <Context.Provider value={{ name: 'jarry', age: 19 }}>
                <Home></Home>
            </Context.Provider>
        </div>
    )
}

export default App