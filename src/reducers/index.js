import { combineReducers } from "redux";
import { posts, currentReadPostId } from "./posts";

export const rootReducer = combineReducers({ posts, currentReadPostId });
