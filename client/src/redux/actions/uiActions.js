import * as ActionTypes from "../types";

export const setErrors = (data) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_ERRORS, payload: data });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: ActionTypes.CLEAR_ERRORS });
};
