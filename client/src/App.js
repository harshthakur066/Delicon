import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

import { Provider } from "react-redux";
import store from "./redux/store";
import * as ActionTypes from "./redux/types";

import login from "./pages/login";
import businesses from "./pages/owner/businesses";
import reservations from "./pages/staff/reservations";
import valets from "./pages/staff/valets";
import walkins from "./pages/staff/walkins";
import staffs from "./pages/owner/staffs";
import ownerDash from "./pages/owner/ownerDashboard";
import staffDash from "./pages/staff/staffDashboard";
import BusinessDetails from "./pages/owner/businessDetails";
import reqbusiness from "./pages/owner/reqbusiness";
import menu from "./pages/owner/menu";
import menuItems from "./pages/owner/menuItems";
import service from "./pages/owner/service";
import serviceItem from "./pages/owner/serviceItem";
import staffMenuService from "./pages/staff/staffMenuService";
import orders from "./pages/staff/orders";
import orderSummery from "./pages/staff/orderSummery";
import billMain from "./pages/staff/billMain";
import billList from "./pages/staff/billList";
import feedBack from "./pages/owner/feedBack";
import feedBackForm from "./pages/staff/feedBackForm";
import feedbackList from "./pages/owner/feedbackslist";
import resAnalytics from "./pages/owner/reservationAnalytics";
import valetAnalytics from "./pages/owner/valetAnalytics";
import walkinAnalytics from "./pages/owner/walkinAnalytics";
import menuAnalytics from "./pages/owner/menuAnalytics";
import serviceAnalytics from "./pages/owner/serviceAnalytics";
import ordersAnalytics from "./pages/owner/ordersAnalytics";
import billAnalytics from "./pages/owner/billAnalytics";

import {
  getUserOwnerData,
  getUserStaffData,
} from "./redux/actions/userActions";

import { createMuiTheme } from "@material-ui/core/styles";

import Navbar from "./components/Navbar";
import ErrorBoundry from "./components/errorBoundry/errorBoundry";
import { ThemeProvider } from "styled-components";
import orderCustomer from "./pages/staff/orderCustomer";
import staffMenuItems from "./pages/staff/staffMenuItems";
import staffServiceItems from "./pages/staff/staffServiceItems";

// Main backend to frontend url
axios.defaults.baseURL = "https://deliconreservation.herokuapp.com";

// For JWT to store in localstorage
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  store.dispatch({
    type: ActionTypes.SET_AUTHENTICATED,
    payload: decodedToken,
  });
  axios.defaults.headers.common["Authorization"] = token;
  if (decodedToken.userRole === "Owner") {
    store.dispatch(getUserOwnerData());
  } else {
    store.dispatch(getUserStaffData());
  }
}

// Added redux and react-router-dom
function App() {
  const theme = createMuiTheme();
  var decodedToken = "";
  if (localStorage.FBIdToken === undefined) {
    decodedToken = "new";
  } else {
    const token = localStorage.FBIdToken;
    decodedToken = jwtDecode(token);
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <ErrorBoundry>
            <div id="sider">
              <Switch>
                {decodedToken.userRole === "Owner" ? (
                  <Route path="/" exact>
                    <Redirect to="/ownerDash" />
                  </Route>
                ) : decodedToken.userRole === "Staff" ? (
                  <Route path="/" exact>
                    <Redirect to="/staffDash" />
                  </Route>
                ) : (
                  <Route path="/" exact>
                    <Redirect to="/login" />
                  </Route>
                )}

                <Route exact path="/login" component={login} />
                <Route exact path="/businesses" component={businesses} />
                <Route exact path="/reqbusinesses" component={reqbusiness} />
                <Route
                  exact
                  path="/businesses/:busiId"
                  component={BusinessDetails}
                />
                <Route exact path="/reservations" component={reservations} />
                <Route exact path="/valets" component={valets} />
                <Route exact path="/walkins" component={walkins} />
                <Route exact path="/staffs/:businessid" component={staffs} />
                <Route exact path="/menu/:businessid" component={menu} />
                <Route
                  exact
                  path="/menu/:businessid/:id"
                  component={menuItems}
                />
                <Route exact path="/service/:businessid" component={service} />
                <Route
                  exact
                  path="/serviceitem/:serviceid"
                  component={serviceItem}
                />
                <Route exact path="/orders" component={orders} />
                <Route exact path="/order/summary" component={orderSummery} />
                <Route
                  exact
                  path="/order/categories"
                  component={staffMenuService}
                />
                <Route
                  exact
                  path="/order/menuitems/:menuId"
                  component={staffMenuItems}
                />
                <Route
                  exact
                  path="/order/serviceitems/:serviceId"
                  component={staffServiceItems}
                />
                <Route exact path="/ownerDash" component={ownerDash} />
                <Route exact path="/staffDash" component={staffDash} />
                <Route
                  exact
                  path="/order/customers"
                  component={orderCustomer}
                />
                <Route exact path="/bills" component={billList} />
                <Route exact path="/bill/:orderId" component={billMain} />
                <Route
                  exact
                  path="/feedbackform/:businessId/:orderId"
                  component={feedBackForm}
                />

                <Route
                  exact
                  path="/feedback/:businessId"
                  component={feedBack}
                />
                <Route
                  exact
                  path="/feedbacklist/:businessId"
                  component={feedbackList}
                />
                <Route
                  exact
                  path="/analytics/reservations/:busiId"
                  component={resAnalytics}
                />
                <Route
                  exact
                  path="/analytics/valets/:busiId"
                  component={valetAnalytics}
                />
                <Route
                  exact
                  path="/analytics/walkins/:busiId"
                  component={walkinAnalytics}
                />
                <Route
                  exact
                  path="/analytics/menu/:busiId"
                  component={menuAnalytics}
                />
                <Route
                  exact
                  path="/analytics/service/:busiId"
                  component={serviceAnalytics}
                />
                <Route
                  exact
                  path="/analytics/orders/:busiId"
                  component={ordersAnalytics}
                />
                <Route
                  exact
                  path="/analytics/bill/:busiId"
                  component={billAnalytics}
                />
              </Switch>
            </div>
          </ErrorBoundry>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
