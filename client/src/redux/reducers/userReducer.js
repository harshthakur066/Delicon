import * as ActionTypes from "../types";

const initialState = {
  authenticated: false,
  profile: {},
  userId: "",
  userRole: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        userId: action.payload.userId,
        userRole: action.payload.userRole,
        authenticated: true,
      };

    case ActionTypes.SET_UNAUTHENTICATED:
      return {
        ...state,
        userId: "",
        userRole: "",
        authenticated: false,
        profile: {},
      };
    case ActionTypes.SET_USER:
      return {
        ...state,
        profile: action.payload,
      };

    default:
      return state;
  }
}
