import * as ActionTypes from "../types";
import axios from "axios";
import { clearErrors, setErrors } from "./uiActions";
import jwtDecode from "jwt-decode";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("/api/v1/signin", {
      email: userData.email,
      password: userData.password,
    })
    .then((res) => {
      setAuthorizationHeader(res.data.token, dispatch, history);
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const setAuthenticated = (data) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_AUTHENTICATED, payload: data });
};

export const setAuthorizationHeader = (token, dispatch, history) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
  const decodedToken = jwtDecode(token);
  dispatch(setAuthenticated(decodedToken));
  if (decodedToken.userRole === "Owner") {
    dispatch(getUserOwnerData());
    history.push("/ownerDash");
  } else {
    dispatch(getUserStaffData());
    history.push("/staffDash");
  }
};

export const logOutUser = () => (dispatch) => {
  localStorage.removeItem(`FBIdToken`);
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: ActionTypes.SET_UNAUTHENTICATED });
};

export const getUserStaffData = () => (dispatch) => {
  dispatch(clearErrors);
  axios
    .get("/api/v1/staff/profile")
    .then((res) => {
      dispatch({
        type: ActionTypes.SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(setErrors(err.response.data));
    });
};

export const getUserOwnerData = () => (dispatch) => {   // ISSUE in backend here
  dispatch(clearErrors);
  axios
    .get("/api/v1/businessowner/profile")
    .then((res) => {
      dispatch({
        type: ActionTypes.SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};
