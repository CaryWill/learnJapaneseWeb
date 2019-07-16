import * as ActionTypes from "./../actions/types";

export const user = (state = { email: undefined, password: undefined, status: undefined }, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCEEDED:
      const { email, password, status } = action.payload;
      return { password, email, status }
    default:
      return state;
  }
};