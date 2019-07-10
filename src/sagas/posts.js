import { call, put, takeLatest, select } from "redux-saga/effects";
import * as ActionTypes from "../actions/types";
import { fetchPostsApi } from "../services/index";

function* fetchPostsSaga(action) {
  const response = yield call(fetchPostsApi, action.payload.type);

  yield put({ type: ActionTypes.UPDATE_POSTS_SUCCEEDED, payload: { posts: response.data, type: action.payload.type} });

  const state = yield select()
}

export function* fetchPosts(action) {
  yield takeLatest(ActionTypes.UPDATE_POSTS_REQUESTED, fetchPostsSaga);
}
