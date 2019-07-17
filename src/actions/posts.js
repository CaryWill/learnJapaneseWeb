import * as Actions from "./types";

export function updatePosts(type) {
  return {
    type: Actions.UPDATE_POSTS_REQUESTED,
    payload: { type }
  };
}

export function updateCurrentReadPostId(id) {
    return {
        type: Actions.UPDATE_CURRENT_READ_POST_ID,
        payload: { id }
    }
}