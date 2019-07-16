import * as Actions from "./types";

export function login(email, password) {
  return {
    type: Actions.LOGIN_REQUESTED,
    payload: { email, password }
  };
}