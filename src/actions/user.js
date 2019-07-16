import * as Actions from "./types";

export function login(email, password, onSuccess, onFail) {
  return {
    type: Actions.LOGIN_REQUESTED,
    payload: { email, password, onSuccess, onFail }
  };
}