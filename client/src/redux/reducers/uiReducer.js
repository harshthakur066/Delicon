import * as ActionTypes from "../types";

const initialState = {
  errors: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case ActionTypes.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
}
