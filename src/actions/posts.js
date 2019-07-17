import * as ActionTypes from "./types";

export function updatePosts(type) {
  return {
    type: ActionTypes.UPDATE_POSTS_REQUESTED,
    payload: { type }
  };
}

export function updateCurrentReadPostId(id) {
    return {
        type: ActionTypes.UPDATE_CURRENT_READ_POST_ID,
        payload: { id }
    }
}

export function deletePost(id) {
  return {
    type: ActionTypes.DELETE_POST_REQUEST,
    payload: { id } 
  }
}