import React, { } from 'react'
import store from '../store'

export default class ReduxPage extends React.Component {
    componentDidMount() {
        this.unListen = store.subscribe(() => {
            this.forceUpdate()
        })
    }
    componentWillUnmount() {
        this.unListen()
    }
    add = () => {
        store.dispatch({ type: 'ADD' })
    }
    asyncAdd = () => {
        store.dispatch((dispatch) => {
            setTimeout(() => {
                dispatch({ type: 'ADD' })
            }, 1000)
        })
    }
    promiseSub = () => {
        store.dispatch(
            Promise.resolve({ type: 'SUB' })
        )
    }
    render() {
        return (
            <div>
                <h3>Redux Page</h3>
                <p>{store.getState()}</p>
                <button onClick={this.add}>ADD</button>
                <button onClick={this.asyncAdd}>Async ADD</button>
                <button onClick={this.promiseSub}>Promise ADD</button>
            </div>
        )
    }
}