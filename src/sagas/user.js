import { call, put, takeLatest } from "redux-saga/effects";

import * as ActionTypes from "../actions/types";
import { loginApi } from "../services/index";

function* loginSaga(action) {
  const {
    email,
    password,
    onSuccess = () => {},
    onFail = () => {}
  } = action.payload;
  const response = yield call(loginApi, email, password);

  if (response.data.includes("success")) {
    yield put({
      type: ActionTypes.LOGIN_SUCCEEDED,
      payload: { status: response.data, email, password }
    });
    onSuccess();
    // save to local storage for auto login
    localStorage.setItem("account", email);
    localStorage.setItem("password", password);
  } else {
    yield put({
      type: ActionTypes.LOGIN_FAILED,
      payload: { status: response.data }
    });
    onFail();
    // remove account info from local storage to prevent auto login
    localStorage.removeItem("account")
    localStorage.removeItem("password")
  }
}

export function* login(action) {
  yield takeLatest(ActionTypes.LOGIN_REQUESTED, loginSaga);
}
