import React, { } from 'react'
// import { connect } from 'react-redux'
import { bindActionCreators, connect } from '../kReactRedux'

@connect(
    ({ count }) => ({ count }),
    // {
    //     add: () => ({ type: "ADD" })
    // }
    (dispatch) => {
        // const add = () => dispatch({ type: 'ADD' })
        let creators = {
            add: () => ({ type: 'ADD' }),
            sub: () => ({ type: 'SUB' })
        }
        creators = bindActionCreators(creators, dispatch)
        return { dispatch, ...creators }
    }
)
export default class ReduxPage extends React.Component {
    // add = () => {
    //     this.props.dispatch({ type: 'ADD' })
    // }
    dispatchAdd = () => {
        this.props.dispatch({ type: 'ADD' })
    }
    render() {
        // console.log('this.props', this.props)
        const { count, add, sub } = this.props
        return (
            <div>
                <h3>Redux Page</h3>
                <p>{count}</p>
                <button onClick={this.dispatchAdd}>DispatchAdd</button>
                <button onClick={add}>ADD</button>
                <button onClick={sub}>SUB</button>
            </div>
        )
    }
}