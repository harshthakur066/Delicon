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
      var newowner1 = state.owner;
      newowner1.businesses = state.owner.businesses.filter(
        (business) => business._id !== action.payload
      );
      return {
        ...state,
        owner: newowner1,
      };
    case ActionTypes.EDIT_BUSINESS:
      var newowner2 = state.owner;
      newowner2.businesses = state.owner.businesses.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        owner: newowner2,
      };
    case ActionTypes.EDIT_RESERVATION:
      var newstaff1 = state.staff;
      newstaff1.reservations = state.staff.reservations.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        staff: newstaff1,
      };
    case ActionTypes.EDIT_VALET:
      var newstaff2 = state.staff;
      newstaff2.valets = state.staff.valets.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        staff: newstaff2,
      };
    case ActionTypes.EDIT_WALKIN:
      var newstaff3 = state.staff;
      newstaff3.walkins = state.staff.walkins.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        staff: newstaff3,
      };
    case ActionTypes.SET_STAFFS:
      var newOwner = state.owner;
      newOwner.staffs = action.payload;
      return {
        ...state,
        owner: newOwner,
      };
    case ActionTypes.SET_RESERVATIONS:
      var newStaff = state.staff;
      newStaff.reservations = action.payload;
      return {
        ...state,
        staff: newStaff,
      };
    case ActionTypes.DELETE_RESERVATIONS:
      var newStaff4 = state.staff;
      newStaff4.reservations = state.staff.reservations.filter(
        (reservation) => reservation._id !== action.payload
      );
      return {
        ...state,
        staff: newStaff4,
      };
    case ActionTypes.POST_STAFF:
      var newOwner3 = state.owner;
      newOwner3.staffs.push(action.payload);
      return {
        ...state,
        owner: newOwner3,
      };
    case ActionTypes.EDIT_STAFF:
      var newowner4 = state.owner;
      newowner4.staffs = state.owner.staffs.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        owner: newowner4,
      };
    case ActionTypes.STAFF_NOTWORKING:
      var newowner5 = state.owner;
      newowner5.staffs = state.owner.staffs.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        owner: newowner5,
      };
    case ActionTypes.STAFF_WORKING:
      var newowner6 = state.owner;
      newowner6.staffs = state.owner.staffs.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        owner: newowner6,
      };
    case ActionTypes.SET_VALETS:
      var newStaff5 = state.staff;
      newStaff5.valets = action.payload;
      return {
        ...state,
        staff: newStaff5,
      };
    case ActionTypes.DELETE_VALETS:
      var newStaff6 = state.staff;
      newStaff6.valets = state.staff.valets.filter(
        (valet) => valet._id !== action.payload
      );
      return {
        ...state,
        staff: newStaff6,
      };
    case ActionTypes.GET_BUSINESS:
      var newOwner7 = state.owner;
      newOwner7.business = action.payload;
      return {
        ...state,
        owner: newOwner7,
      };
    case ActionTypes.SET_WALKINS:
      var newStaff7 = state.staff;
      newStaff7.walkins = action.payload;
      return {
        ...state,
        staff: newStaff7,
      };
    case ActionTypes.DELETE_WALKINS:
      var newStaff8 = state.staff;
      newStaff8.walkins = state.staff.walkins.filter(
        (walkin) => walkin._id !== action.payload
      );
      return {
        ...state,
        staff: newStaff8,
      };
    case ActionTypes.POST_WALKINS:
      var newStaff9 = state.staff;
      newStaff9.walkins.push(action.payload);
      return {
        ...state,
        staff: newStaff9,
      };
    case ActionTypes.POST_VALETS:
      var newStaff10 = state.staff;
      newStaff10.valets.push(action.payload);
      return {
        ...state,
        staff: newStaff10,
      };
    case ActionTypes.POST_RESERVATION:
      var newStaff11 = state.staff;
      newStaff11.reservations.push(action.payload);
      return {
        ...state,
        staff: newStaff11,
      };
    case ActionTypes.POST_BUSINESS:
      var newOwner8 = state.owner;
      newOwner8.reqbusinesses.push(action.payload);
      return {
        ...state,
        owner: newOwner8,
      };
    case ActionTypes.GET_REQBUSINESS:
      var newOwner9 = state.owner;
      newOwner9.reqbusinesses = action.payload;
      return {
        ...state,
        owner: newOwner9,
      };
    case ActionTypes.DELETE_REQBUSINESS:
      var newOwner10 = state.owner;
      newOwner10.reqbusinesses = state.owner.reqbusinesses.filter(
        (business) => business._id !== action.payload
      );
      return {
        ...state,
        owner: newOwner10,
      };
    case ActionTypes.RESERVATION_CHECKIN:
      var checkin = state.staff;
      checkin.reservations = state.staff.reservations.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        staff: checkin,
      };
    case ActionTypes.RESERVATION_CHECKOUT:
      var checkout = state.staff;
      checkout.reservations = state.staff.reservations.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        staff: checkout,
      };
    case ActionTypes.WALK_OUT:
      var walkout = state.staff;
      walkout.walkins = state.staff.walkins.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        staff: walkout,
      };
    case ActionTypes.VALET_TIMEOUT:
      var timeout = state.staff;
      timeout.valets = state.staff.valets.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        staff: timeout,
      };

    // MENU REDUCERS

    case ActionTypes.GET_MENUCATEGORIES:
      return {
        ...state,
        owner: { ...state.owner, menu: action.payload },
      };

    case ActionTypes.DELETE_MENUCATEGORY:
      var menu1 = state.owner;
      menu1.menu = state.owner.menu.filter(
        (business) => business._id !== action.payload
      );
      return {
        ...state,
        owner: menu1,
      };
    case ActionTypes.EDIT_MENUCATEGORY:
      var menu2 = state.owner;
      menu2.menu = state.owner.menu.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        owner: menu2,
      };
    case ActionTypes.POST_MENUCATEGORY:
      var menu4 = state.owner;
      menu4.menu.push(action.payload);
      return {
        ...state,
        owner: menu4,
      };

    // SERVICE REDUCERS

    case ActionTypes.GET_SERVICECATEGORIES:
      return {
        ...state,
        owner: { ...state.owner, service: action.payload },
      };

    case ActionTypes.DELETE_SERVICECATEGORY:
      var service1 = state.owner;
      service1.service = state.owner.service.filter(
        (business) => business._id !== action.payload
      );
      return {
        ...state,
        owner: service1,
      };
    case ActionTypes.EDIT_SERVICECATEGORY:
      var service2 = state.owner;
      service2.service = state.owner.service.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        owner: service2,
      };
    case ActionTypes.POST_SERVICECATEGORY:
      var service4 = state.owner;
      service4.service.push(action.payload);
      return {
        ...state,
        owner: service4,
      };

    // Service Item

    case ActionTypes.GET_SERVICEITEMS:
      return {
        ...state,
        owner: { ...state.owner, serviceItem: action.payload },
      };

    case ActionTypes.DELETE_SERVICEITEM:
      var serviceItem1 = state.owner;
      serviceItem1.serviceItem = state.owner.serviceItem.filter(
        (business) => business._id !== action.payload
      );
      return {
        ...state,
        owner: serviceItem1,
      };
    case ActionTypes.EDIT_SERVICEITEM:
      var serviceItem2 = state.owner;
      serviceItem2.serviceItem = state.owner.serviceItem.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        owner: serviceItem2,
      };
    case ActionTypes.POST_SERVICEITEM:
      var serviceItem4 = state.owner;
      serviceItem4.serviceItem.push(action.payload);
      return {
        ...state,
        owner: serviceItem4,
      };

    // MENU ITEMS

    case ActionTypes.GET_MENUITEMS:
      return {
        ...state,
        owner: { ...state.owner, item: action.payload },
      };

    case ActionTypes.DELETE_MENUITEM:
      var item1 = state.owner;
      item1.item = state.owner.item.filter(
        (business) => business._id !== action.payload
      );
      return {
        ...state,
        owner: item1,
      };
    case ActionTypes.EDIT_MENUITEM:
      var item2 = state.owner;
      item2.item = state.owner.item.map((busi) =>
        busi._id === action.payload._id ? action.payload : busi
      );
      return {
        ...state,
        owner: item2,
      };
    case ActionTypes.POST_MENUITEM:
      var item4 = state.owner;
      item4.item.push(action.payload);
      return {
        ...state,
        owner: item4,
      };

    default:
      return state;
  }
}
