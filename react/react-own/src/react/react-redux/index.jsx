import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import ConnectApp from './connect/App'

function App() {
    return (
        <Provider store={store}><ConnectApp /></Provider>
    )
}
export default App