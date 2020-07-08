import * as ActionTypes from "../types";

const initialState = {
  authenticated: false,
  profile: {},
  userId: "",
  userRole: "",
  businessId: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        userId: action.payload.userId,
        userRole: action.payload.userRole,
        businessId: action.payload.businessId,
        authenticated: true,
      };

    case ActionTypes.SET_UNAUTHENTICATED:
      return {
        ...state,
        userId: "",
        userRole: "",
        businessId: "",
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
