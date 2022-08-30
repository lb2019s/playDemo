import React from 'react'
import { connect } from 'react-redux'
import Home from './Home'


function App(props) {
    console.log('props', props)
    return (
        <div>
            <h2>App count {props.count}</h2>
            <button onClick={() => props.dispatch({ type: 'add' })}>click App !</button>
            <Home count={props.count}></Home>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        count: state
    }
}

export default connect(mapStateToProps)(App)