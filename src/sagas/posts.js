import { call, put, takeLatest } from "redux-saga/effects";
import * as ActionTypes from "../actions/types";
import { fetchPostsApi, deletePostApi } from "../services/index";

function* fetchPostsSaga(action) {
  const response = yield call(fetchPostsApi, action.payload.type);

  yield put({
    type: ActionTypes.UPDATE_POSTS_SUCCEEDED,
    payload: { posts: response.data, type: action.payload.type }
  });
}

export function* fetchPosts(action) {
  yield takeLatest(ActionTypes.UPDATE_POSTS_REQUESTED, fetchPostsSaga);
}

// delete post
function* deletePostSaga(action) {
  console.log(action,"ac")
  const response = yield call(deletePostApi, action.payload.id);

  yield put({
    type: ActionTypes.DELETE_POST_SUCCEEDED,
    payload: { posts: response.data }
  });
}

export function* deletePost(action) {
  yield takeLatest(ActionTypes.DELETE_POST_REQUEST, deletePostSaga);
}
