import { call, put, takeLatest } from "redux-saga/effects";
import * as ActionTypes from "../actions/types";
import { fetchPostsApi } from "../services/index";

function* fetchPostsSaga(action) {
  const response = yield call(fetchPostsApi, action.payload.type);

  yield put({ type: ActionTypes.UPDATE_POSTS_SUCCEEDED, payload: { posts: response.data, type: action.payload.type} });
}

export function* fetchPosts(action) {
  yield takeLatest(ActionTypes.UPDATE_POSTS_REQUESTED, fetchPostsSaga);
}
