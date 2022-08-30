import { createStore } from 'redux'

const reducer = function (state, action) {
    switch (action.type) {
        case 'add': {
            return state + 1
        }
        default: return 0
    }
}

const store = createStore(reducer)

export default store