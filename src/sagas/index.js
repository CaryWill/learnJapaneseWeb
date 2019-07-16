import { all, call } from "redux-saga/effects";
import { fetchPosts } from "./posts"
import { login } from "./user"

export default function* rootSaga() {
    yield all([
        call(fetchPosts),
        call(login)
    ])
}