import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { loginReducer } from './loginRuducer'
// import loginSaga from '../actions/loginSaga'
import RootSaga from '../actions/rootSaga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    combineReducers({ user: loginReducer }),
    applyMiddleware(thunk, sagaMiddleware)
)

sagaMiddleware.run(RootSaga)

export default store