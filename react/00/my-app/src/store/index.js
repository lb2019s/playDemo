import { createStore } from 'redux'

const reducer = (state = 0, action) => {
    // console.log('dispatn', state, action)
    switch (action.type) {
        case 'ADD':
            return state + 1
        case 'DEL':
            return state - 1
        default:
            return state
    }
}

const store = createStore(reducer)

export default store