import * as Actions from "./types";

export function updatePosts(type) {
  return {
    type: Actions.UPDATE_POSTS_REQUESTED,
    payload: { type }
  };
}
