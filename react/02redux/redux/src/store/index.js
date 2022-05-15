// import { applyMiddleware, createStore } from 'redux'
import isPromise from 'is-promise'
import { createStore, applyMiddleware } from '../kredux'
// import thunk from 'redux-thunk'
// import logger from 'redux-logger'
// import promise from 'redux-promise'

function reducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'SUB':
            return state - 1;
        default:
            return 0
    }
}

const store = createStore(reducer, applyMiddleware(promise, thunk, logger))
export default store


function logger({ dispatch, getState }) {
    return next => {
        // console.log('logger')
        return action => {
            // console.log('logger -> ')
            console.log("**********************")

            console.log('action type ', action.type)
            console.log('preState', getState())
            const result = next(action)
            console.log('nextState', getState())

            console.log("**********************")

            return result
        }
    }


}

function thunk({ dispatch, getState }) {
    return next => {
        // console.log('thunk')
        return action => {
            // console.log('thunk->')
            if (typeof action === 'function') {
                return action(dispatch, getState)
            }

            return next(action)
        }
    }

}

function promise({ dispatch, getState }) {
    return next => action => {
        // console.log('dispatch', dispatch)
        isPromise(action) ? action.then(dispatch) : next(action)
    }
}