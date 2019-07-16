import { call, put, takeLatest } from "redux-saga/effects";
import * as ActionTypes from "../actions/types";
import { loginApi } from "../services/index";

function* loginSaga(action) {
  const { email, password } = action.payload;
  const response = yield call(loginApi, email, password);

  if (response.data.includes("success")) {
    yield put({
      type: ActionTypes.LOGIN_SUCCEEDED,
      payload: { status: response.data, email, password }
    });
    // TODO: cache account info for auto-login

  } else {
    yield put({
      type: ActionTypes.LOGIN_FAILED,
      payload: { status: response.data, email: null, password: null }
    });
  }
}

export function* login(action) {
  yield takeLatest(ActionTypes.LOGIN_REQUESTED, loginSaga);
}
