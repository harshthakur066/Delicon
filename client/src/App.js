import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

import { Provider } from "react-redux";
import store from "./redux/store";
import * as ActionTypes from "./redux/types";
// import { getUserData } from "./redux/actions/userActions";

import home from "./pages/home";
import login from "./pages/login";
import businesses from "./pages/owner/businesses";
import reservations from "./pages/staff/reservations";
import valets from "./pages/staff/valets";
import walkins from "./pages/staff/walkins";
import staffs from "./pages/owner/staffs";
import ownerDash from "./pages/owner/ownerDashboard";
import staffDash from "./pages/staff/staffDashboard";
import busiDetails from "./pages/owner/businessDetails";
import reqbusiness from "./pages/owner/reqbusiness";
// import signup from "./pages/signup";

import { createMuiTheme } from "@material-ui/core/styles";

import Navbar from "./components/Navbar";
import ErrorBoundry from "./components/errorBoundry/errorBoundry";
import { ThemeProvider } from "styled-components";

axios.defaults.baseURL = "https://deliconreservation.herokuapp.com";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  store.dispatch({
    type: ActionTypes.SET_AUTHENTICATED,
    payload: decodedToken,
  });
  axios.defaults.headers.common["Authorization"] = token;
  // store.dispatch(getUserData());
}

function App() {
  const theme = createMuiTheme();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <ErrorBoundry>
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/businesses" component={businesses} />
              <Route exact path="/reqbusinesses" component={reqbusiness} />
              <Route exact path="/businesses/:busiId" component={busiDetails} />
              <Route exact path="/reservations" component={reservations} />
              <Route exact path="/valets" component={valets} />
              <Route exact path="/walkins" component={walkins} />
              <Route exact path="/staffs/:businessid" component={staffs} />
              <Route exact path="/ownerDash" component={ownerDash} />
              <Route exact path="/staffDash" component={staffDash} />
            </Switch>
          </ErrorBoundry>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
