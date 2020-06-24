import * as ActionTypes from "../types";

const initialState = {
  owner: {},
  staff: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_BUSINESSES:
      return {
        ...state,
        owner: { businesses: action.payload, ...state.owner },
      };
    case ActionTypes.DELET_BUSINESSES:
      return {
        ...state,
        owner: {
          businesses: state.owner.businesses.filter(
            (business) => business._id !== action.payload
          ),
        },
      };
    case ActionTypes.EDIT_BUSINESS:
      var newbusinesses = state.owner.businesses.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        owner: {
          businesses: newbusinesses,
        },
      };
    case ActionTypes.EDIT_RESERVATION:
      var newres = state.staff.reservations.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        staff: {
          reservations: newres,
        },
      };
    case ActionTypes.EDIT_VALET:
      var newval = state.staff.valets.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        staff: {
          valets: newval,
        },
      };
    case ActionTypes.EDIT_WALKIN:
      var newwalk = state.staff.walkins.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        staff: {
          walkins: newwalk,
        },
      };
    case ActionTypes.SET_STAFFS:
      const newOwner = state.owner;
      newOwner.staffs = action.payload;
      return {
        ...state,
        owner: newOwner,
      };

    case ActionTypes.SET_RESERVATIONS:
      return {
        ...state,
        staff: { reservations: action.payload, ...state.staff },
      };
    case ActionTypes.DELETE_RESERVATIONS:
      return {
        ...state,
        staff: {
          reservations: state.staff.reservations.filter(
            (reservation) => reservation._id !== action.payload
          ),
        },
      };

    case ActionTypes.SET_VALETS:
      return {
        ...state,
        staff: { valets: action.payload, ...state.staff },
      };
    case ActionTypes.DELETE_VALETS:
      return {
        ...state,
        staff: {
          valets: state.staff.valets.filter(
            (valet) => valet._id !== action.payload
          ),
        },
      };

    case ActionTypes.SET_WALKINS:
      return {
        ...state,
        staff: { walkins: action.payload, ...state.staff },
      };
    case ActionTypes.DELETE_WALKINS:
      return {
        ...state,
        staff: {
          walkins: state.staff.walkins.filter(
            (walkin) => walkin._id !== action.payload
          ),
        },
      };
    case ActionTypes.POST_WALKINS:
      return {
        ...state,
        staff: {
          walkins: state.staff.walkins.push(action.payload),
          ...state.staff,
        },
      };
    case ActionTypes.POST_VALETS:
      return {
        ...state,
        staff: {
          valets: state.staff.valets.push(action.payload),
          ...state.staff,
        },
      };
    case ActionTypes.POST_RESERVATION:
      return {
        ...state,
        staff: {
          reservations: state.staff.reservations.push(action.payload),
          ...state.staff,
        },
      };
    case ActionTypes.POST_BUSINESS:
      return {
        ...state,
        owner: {
          businesses: state.owner.businesses.push(action.payload),
          ...state.owner,
        },
      };
    default:
      return state;
  }
}
