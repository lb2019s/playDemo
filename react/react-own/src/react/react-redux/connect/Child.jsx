import React from 'react'
import { connect } from 'react-redux'

function Child(props) {
    return (
        <>
            <h3>Child count {props.count}</h3>
            <button onClick={() => { props.dispatch({ type: 'add' }) }}>click me!</button>
        </>
    )
}

function mapStateToProps(state) {
    return {
        count: state
    }
}

export default connect(mapStateToProps)(Child)