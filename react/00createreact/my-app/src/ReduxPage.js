import react from 'react'
import store from './store'

class ReduxPage extends react.Component {
    constructor() {
        super()
    }
    render() {
        store.subscribe(() => {
            this.forceUpdate()
        })
        return (
            <div>
                <h2>Redux</h2>
                <p>counter {store.getState()}</p>
                <button onClick={() => store.dispatch({ type: 'ADD' })}>阿牛</button>
            </div>
        )
    }
}

export default ReduxPage