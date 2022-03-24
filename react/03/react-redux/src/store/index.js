import { combineReducers, createStore } from 'redux'
// import isPromise from 'is-promise'
// import { createStore, applyMiddleware } from '../kredux'
// import thunk from 'redux-thunk'
// import logger from 'redux-logger'
// import promise from 'redux-promise'

function counterReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'SUB':
            return state - 1;
        default:
            return 0
    }
}

const store = createStore(combineReducers({ count: counterReducer }))
export default store
export {
    counterReducer
}