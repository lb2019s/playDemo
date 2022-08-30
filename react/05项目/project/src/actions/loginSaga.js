import {
    //  takeEvery, 
    call, put, take, fork
} from 'redux-saga/effects'
import LoginService from '../service/login'

// watcher 

function* LoginHandle(action) {
    try {
        yield put({
            type: 'REQUEST'
        })
        const res1 = yield call(LoginService.login, action.payload)
        const res2 = yield call(LoginService.getMoreUserInfo, res1)
        yield put({
            type: "LOGIN_SUCCESS",
            payload: {
                ...res2
            }
        })
    } catch (err) {
        yield put({
            type: 'LOGIN_FAILURE',
            payload: {
                ...err
            }
        })
    }

}

// worker saga

function* LoginSaga() {
    yield takeEvery('LOGIN_SAGA', LoginHandle)
}

const takeEvery = (patten, saga, ...args) => fork(function* () {
    while (true) {
        const action = yield take(patten)
        yield fork(saga, action, ...args)
    }
})


export default LoginSaga
