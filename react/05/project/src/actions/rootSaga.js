import { all } from "redux-saga/effects";
import LoginSaga from "./loginSaga";

function* RootSaga() {
    yield all([LoginSaga()])
}

export default RootSaga