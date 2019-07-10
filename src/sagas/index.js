import { all, call } from "redux-saga/effects";
import { fetchPosts } from "./posts"

export default function* rootSaga() {
    yield all([
        call(fetchPosts)
    ])
}