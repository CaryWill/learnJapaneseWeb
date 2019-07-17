import * as ActionTypes from "./../actions/types";

export const posts = (state = { all: [] }, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_POSTS_SUCCEEDED:
    case ActionTypes.DELETE_POST_SUCCEEDED:
      const { posts } = action.payload;
      return { ...state, all: posts };
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
