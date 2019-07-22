import { combineReducers } from "redux";

import { currentReadPostId,posts } from "./posts";
import { user } from "./user";

export const rootReducer = combineReducers({ posts, currentReadPostId, user });
