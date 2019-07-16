import { call, put, takeLatest } from "redux-saga/effects";
import * as ActionTypes from "../actions/types";
import { loginApi } from "../services/index";

function* loginSaga(action) {
  const { email, password, onSuccess, onFail } = action.payload;
  const response = yield call(loginApi, email, password);

  if (response.data.includes("success")) {
    yield put({
      type: ActionTypes.LOGIN_SUCCEEDED,
      payload: { status: response.data, email, password }
    });
    onSuccess();
    // TODO: cache account info for auto-login
    // TODO: log out

  } else {
    yield put({
      type: ActionTypes.LOGIN_FAILED,
      payload: { status: response.data, email: null, password: null }
    });
    onFail();
  }
}

export function* login(action) {
  yield takeLatest(ActionTypes.LOGIN_REQUESTED, loginSaga);
}
