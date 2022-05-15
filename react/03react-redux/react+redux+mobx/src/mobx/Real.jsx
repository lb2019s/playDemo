import React from 'react'
import { makeObservable, action, observable } from 'mobx'
import { observer } from 'mobx-react'

class State {
    constructor() {
        makeObservable(this, {
            value: observable,
            onChange: action.bound
        })
    }
    value = 0
    onChange = () => {
        this.value++
    }
}

class Mobx extends React.Component {
    state = new State()
    render() {
        return (
            <button onClick={this.state.onChange}>点击 {this.state.value}</button>
        )
    }
}

export default observer(Mobx)