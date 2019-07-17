import * as ActionTypes from "./../actions/types";

export const posts = (state = { all: [] }, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_POSTS_SUCCEEDED:
    case ActionTypes.DELETE_POST_SUCCEEDED:
      const { posts } = action.payload;
      const sortedPosts = posts.sort(function(a, b) {
        // latest post comes first
        return new Date(b.date) - new Date(a.date);
      });
      return { ...state, all: sortedPosts };
    default:
      return state;
  }
};

export const currentReadPostId = (state = "", action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_CURRENT_READ_POST_ID:
      const { id } = action.payload;
      return id;
    default:
      return state;
  }
};
