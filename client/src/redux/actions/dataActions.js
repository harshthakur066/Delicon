import * as ActionTypes from "../types";
import axios from "axios";
import { setErrors, clearErrors } from "./uiActions";

///////////////////////////////////////   FOR BUSINESS OWNER /////////////////////////////////////////////////

//BUSINESS ACTIONS ..............................................

export const getbusinesses = () => (dispatch) => {
  dispatch(clearErrors());
  axios
    .get("/api/v1/businesses")
    .then((res) => {
      dispatch({
        type: ActionTypes.SET_BUSINESSES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const deletebusiness = (businessId) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .delete(`/api/v1/businesses/${businessId}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.DELET_BUSINESSES,
        payload: businessId,
      });
    })
    .then(alert("Business Deleted"))
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const postbusiness = (formdata, setloading) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/v1/businesses/request`, formdata)
    .then((res) => {
      dispatch({
        type: ActionTypes.POST_BUSINESS,
        payload: res.data,
      });
      setloading();
      alert("Submitted");
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const editbusiness = (formdata, setloading, ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .put(`/api/v1/businesses/${ID}`, formdata)
    .then(() => {
      axios
        .put(`/api/v1/businesses/${ID}`, formdata)
        .then((res) => {
          dispatch({
            type: ActionTypes.EDIT_BUSINESS,
            payload: res.data,
          });
          setloading();
          alert("Edited Successfully");
        })
        .catch((err) => {
          if (err.response !== undefined) {
            dispatch(setErrors(err.response.data));
          }
        });
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const getbusiness = (setloading, ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .get(`/api/v1/businesses/${ID}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ActionTypes.GET_BUSINESS,
        payload: res.data,
      });
      setloading();
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

//REQ BUSINESS ACTION ..............................................................

export const getreqbusinesses = () => (dispatch) => {
  dispatch(clearErrors());
  axios
    .get("/api/v1/businesses/request")
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_REQBUSINESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const deletereqbusiness = (businessId) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .delete(`/api/v1/businesses/request/${businessId}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.DELETE_REQBUSINESS,
        payload: businessId,
      });
    })
    .then(alert("Business Deleted"))
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

//Staff Actions .................................................................

export const getstaffs = (businessId, setdone) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .get(`/api/v1/business/staff/profile/${businessId}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ActionTypes.SET_STAFFS,
        payload: res.data,
      });
      setdone();
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const poststaff = (formdata, setDone) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/v1/business/staff/signup`, formdata)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ActionTypes.POST_STAFF,
        payload: res.data,
      });
      setDone();
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const editstaff = (formdata, setDone, ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .put(`/api/v1/business/staff/profile/${ID}`, formdata)
    .then((res) => {
      axios
        .put(`/api/v1/business/staff/profile/${ID}`, formdata)
        .then((res) => {
          console.log(res.data, "HERE MOW");
          dispatch({
            type: ActionTypes.EDIT_STAFF,
            payload: res.data,
          });
          setDone();
        })
        .catch((err) => {
          if (err.response !== undefined) {
            dispatch(setErrors(err.response.data));
          }
        });
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const setnotworking = (Id) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .put(`/api/v1/business/staff/profile/notworking/${Id}`)
    .then((res) => {
      axios
        .put(`/api/v1/business/staff/profile/notworking/${Id}`)
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: ActionTypes.STAFF_NOTWORKING,
            payload: res.data,
          });
          alert("Not Working");
        })
        .catch((err) => {
          if (err.response !== undefined) {
            dispatch(setErrors(err.response.data));
          }
        });
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const setworking = (Id) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .put(`/api/v1/business/staff/profile/working/${Id}`)
    .then((res) => {
      axios
        .put(`/api/v1/business/staff/profile/working/${Id}`)
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: ActionTypes.STAFF_WORKING,
            payload: res.data,
          });
          alert("Working");
        })
        .catch((err) => {
          if (err.response !== undefined) {
            dispatch(setErrors(err.response.data));
          }
        });
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

// Menu Actions

export const getMenuCategories = (ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .get(`/api/v1/menu/categories/${ID}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_MENUCATEGORIES,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const deleteMenuCategory = (ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .delete(`/api/v1/menu/category/${ID}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.DELETE_MENUCATEGORY,
        payload: ID,
      });
    })
    .then(alert("Business Deleted"))
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const postMenuCategory = (formdata, setloading, ID) => (dispatch) => {
  console.log(formdata);
  console.log(ID);
  dispatch(clearErrors());
  axios
    .post(`/api/v1/menu/categories/${ID}`, formdata)
    .then((res) => {
      dispatch({
        type: ActionTypes.POST_MENUCATEGORY,
        payload: res.data,
      });
      console.log(res);
      setloading();
      alert("Submitted");
    })
    .catch((err) => {
      console.log(err);
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const editMenuCategory = (formdata, setloading, ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .put(`/api/v1/menu/category/${ID}`, formdata)
    .then(() => {
      axios
        .put(`/api/v1/menu/category/${ID}`, formdata)
        .then((res) => {
          dispatch({
            type: ActionTypes.EDIT_MENUCATEGORY,
            payload: res.data,
          });
          setloading();
          alert("Edited Successfully");
        })
        .catch((err) => {
          if (err.response !== undefined) {
            dispatch(setErrors(err.response.data));
          }
        });
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const getMenuCategory = (setloading, ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .get(`/api/v1/menu/category/${ID}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ActionTypes.GET_MENUCATEGORY,
        payload: res.data,
      });
      setloading();
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

// Menu ITEMS Actions

export const getMenuItems = (categoryId) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .get(`/api/v1/menu/items/${categoryId}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_MENUITEMS,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const deleteMenuItem = (categoryId, ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .delete(`/api/v1/menu/items/${categoryId}/${ID}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.DELETE_MENUITEM,
        payload: ID,
      });
    })
    .then(alert("Business Deleted"))
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const postMenuItem = (formdata, setloading, categoryId) => (
  dispatch
) => {
  console.log(formdata);
  console.log(categoryId);
  dispatch(clearErrors());
  axios
    .post(`/api/v1/menu/items/${categoryId}`, formdata)
    .then((res) => {
      dispatch({
        type: ActionTypes.POST_MENUITEM,
        payload: res.data,
      });
      console.log(res);
      setloading();
      alert("Submitted");
    })
    .catch((err) => {
      console.log(err);
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const editMenuItem = (formdata, setloading, ID) => (dispatch) => {
  console.log(formdata);
  console.log(ID);
  dispatch(clearErrors());
  axios
    .put(`/api/v1/menu/items/${ID}`, formdata)
    .then(() => {
      axios
        .put(`/api/v1/menu/items/${ID}`, formdata)
        .then((res) => {
          dispatch({
            type: ActionTypes.EDIT_MENUITEM,
            payload: res.data,
          });
          console.log(res.data);
          setloading();
          alert("Edited Successfully");
        })
        .catch((err) => {
          if (err.response !== undefined) {
            dispatch(setErrors(err.response.data));
          }
        });
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const getMenuItem = (setloading, categoryId, ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .get(`/api/v1/menu/items/${categoryId}/${ID}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ActionTypes.GET_MENUITEM,
        payload: res.data,
      });
      setloading();
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

// Service Actions

export const getServiceCategories = (ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .get(`/api/v1/service/categories/${ID}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_SERVICECATEGORIES,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const deleteServiceCategory = (ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .delete(`/api/v1/service/category/${ID}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.DELETE_SERVICECATEGORY,
        payload: ID,
      });
    })
    .then(alert("Business Deleted"))
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const postServiceCategory = (formdata, setloading, ID) => (dispatch) => {
  console.log(formdata);
  console.log(ID);
  dispatch(clearErrors());
  axios
    .post(`/api/v1/service/categories/${ID}`, formdata)
    .then((res) => {
      dispatch({
        type: ActionTypes.POST_SERVICECATEGORY,
        payload: res.data,
      });
      console.log(res);
      setloading();
      alert("Submitted");
    })
    .catch((err) => {
      console.log(err);
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const editServiceCategory = (formdata, setloading, ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .put(`/api/v1/service/category/${ID}`, formdata)
    .then(() => {
      axios
        .put(`/api/v1/service/category/${ID}`, formdata)
        .then((res) => {
          dispatch({
            type: ActionTypes.EDIT_SERVICECATEGORY,
            payload: res.data,
          });
          setloading();
          alert("Edited Successfully");
        })
        .catch((err) => {
          if (err.response !== undefined) {
            dispatch(setErrors(err.response.data));
          }
        });
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

// Service Item Actions

export const getServiceItems = (ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .get(`/api/v1/service/items/${ID}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_SERVICEITEMS,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const deleteServiceItem = (categoryID, ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .delete(`/api/v1/service/items/${categoryID}/${ID}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.DELETE_SERVICEITEM,
        payload: ID,
      });
    })
    .then(alert("Business Deleted"))
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const postServiceItem = (formdata, setloading, ID) => (dispatch) => {
  console.log(formdata);
  console.log(ID);
  dispatch(clearErrors());
  axios
    .post(`/api/v1/service/items/${ID}`, formdata)
    .then((res) => {
      dispatch({
        type: ActionTypes.POST_SERVICEITEM,
        payload: res.data,
      });
      console.log(res);
      setloading();
      alert("Submitted");
    })
    .catch((err) => {
      console.log(err);
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const editServiceItem = (formdata, setloading, ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .put(`/api/v1/service/items/${ID}`, formdata)
    .then(() => {
      axios
        .put(`/api/v1/service/items/${ID}`, formdata)
        .then((res) => {
          dispatch({
            type: ActionTypes.EDIT_SERVICEITEM,
            payload: res.data,
          });
          setloading();
          alert("Edited Successfully");
        })
        .catch((err) => {
          if (err.response !== undefined) {
            dispatch(setErrors(err.response.data));
          }
        });
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

///////////////////////////////////////   FOR STAFF   /////////////////////////////////////////////////

//RESERVATION ACTIONS ...........................................

export const getreservations = () => (dispatch) => {
  dispatch(clearErrors());
  axios
    .get("/api/v1/reservations")
    .then((res) => {
      dispatch({
        type: ActionTypes.SET_RESERVATIONS,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};
export const deletereservation = (reservationId) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .delete(`/api/v1/reservations/${reservationId}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.DELETE_RESERVATIONS,
        payload: reservationId,
      });
    })
    .then(alert("Reservation Deleted"))
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const postreservation = (formdata, hanldeDone) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/v1/reservations`, formdata)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ActionTypes.POST_RESERVATION,
        payload: res.data,
      });
      hanldeDone();
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const editreservation = (formdata, setloading, ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .put(`/api/v1/reservations/${ID}`, formdata)
    .then(() => {
      axios
        .put(`/api/v1/reservations/${ID}`, formdata)
        .then((res) => {
          dispatch({
            type: ActionTypes.EDIT_RESERVATION,
            payload: res.data,
          });
          setloading();
          alert("Edited Successfully");
        })
        .catch((err) => {
          if (err.response !== undefined) {
            dispatch(setErrors(err.response.data));
          }
        });
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

/// Reservation Check Ins/Outs

export const checkInReservation = (ID) => (dispatch) => {
  console.log(ID);
  dispatch(clearErrors());
  axios
    .put(`/api/v1/reservations/${ID}/checkin`)
    .then((res) => {
      dispatch({
        type: ActionTypes.RESERVATION_CHECKIN,
        payload: res.data,
      });
      alert("CheckIn Successfully");
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};
export const checkOutReservation = (ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .put(`/api/v1/reservations/${ID}/checkout`)
    .then((res) => {
      dispatch({
        type: ActionTypes.RESERVATION_CHECKOUT,
        payload: res.data,
      });
      alert("Checkout Successfully");
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

//Valets Actions ................................................

export const getvalets = () => (dispatch) => {
  dispatch(clearErrors());
  axios
    .get("/api/v1/valets")
    .then((res) => {
      dispatch({
        type: ActionTypes.SET_VALETS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};
export const deletevalet = (valetID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .delete(`/api/v1/valets/${valetID}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.DELETE_VALETS,
        payload: valetID,
      });
    })
    .then(alert("Valet Deleted"))
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const postvalets = (formdata, handleDone) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/v1/valets`, formdata)
    .then((res) => {
      dispatch({
        type: ActionTypes.POST_VALETS,
        payload: res.data,
      });
      handleDone();
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const editvalets = (formdata, setloading, ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .put(`/api/v1/valets/${ID}`, formdata)
    .then(() => {
      axios
        .put(`/api/v1/valets/${ID}`, formdata)
        .then((res) => {
          dispatch({
            type: ActionTypes.EDIT_VALET,
            payload: res.data,
          });
          setloading();
          alert("Edited Successfully");
        })
        .catch((err) => {
          if (err.response !== undefined) {
            dispatch(setErrors(err.response.data));
          }
        });
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const valetstimeout = (ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .put(`/api/v1/valets/${ID}/timeout`)
    .then((res) => {
      dispatch({
        type: ActionTypes.VALET_TIMEOUT,
        payload: res.data,
      });

      alert("Edited Successfully");
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

//WalkIN Actions ...............................................................................

export const getwalkins = () => (dispatch) => {
  dispatch(clearErrors());
  axios
    .get("/api/v1/walkin")
    .then((res) => {
      dispatch({
        type: ActionTypes.SET_WALKINS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};
export const deletewalkin = (walkinID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .delete(`/api/v1/walkin/${walkinID}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.DELETE_WALKINS,
        payload: walkinID,
      });
    })
    .then(alert("Walkin Deleted"))
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const postwalkins = (formdata, handleDone) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/v1/walkin`, formdata)
    .then((res) => {
      dispatch({
        type: ActionTypes.POST_WALKINS,
        payload: res.data,
      });
      handleDone();
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const editwalkin = (formdata, setloading, ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .put(`/api/v1/walkin/${ID}`, formdata)
    .then(() => {
      axios
        .put(`/api/v1/walkin/${ID}`, formdata)
        .then((res) => {
          dispatch({
            type: ActionTypes.EDIT_WALKIN,
            payload: res.data,
          });
          setloading();
          alert("Edited Successfully");
        })
        .catch((err) => {
          if (err.response !== undefined) {
            dispatch(setErrors(err.response.data));
          }
        });
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};

export const walkout = (ID) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .put(`/api/v1/walkin/${ID}/walkout`)
    .then((res) => {
      dispatch({
        type: ActionTypes.WALK_OUT,
        payload: res.data,
      });
      alert("Walkout Successfully");
    })
    .catch((err) => {
      if (err.response !== undefined) {
        dispatch(setErrors(err.response.data));
      }
    });
};
