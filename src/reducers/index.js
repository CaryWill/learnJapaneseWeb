import { combineReducers } from "redux";
import { posts, currentReadPostId } from "./posts";
import { user } from "./user";

export const rootReducer = combineReducers({ posts, currentReadPostId, user });
