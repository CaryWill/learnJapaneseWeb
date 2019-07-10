import * as ActionTypes from "./../actions/types";

export const posts = (state = { all: [] }, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_POSTS_SUCCEEDED:
      const { type, posts } = action.payload;

      if (type) {
        return { ...state, [type]: posts };
      } else {
        return { ...state, all: posts };
      }

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
