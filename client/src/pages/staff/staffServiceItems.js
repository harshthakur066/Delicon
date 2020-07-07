import React, { Component } from "react";
import { useHistory, Link } from "react-router-dom";

import { connect } from "react-redux";
import {
  withStyles,
  // Card,
  // CardContent,
  // Typography,
  Button,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import {
  getStaffServiceItems,
  selectserviceitem,
  removeserviceitem,
} from "../../redux/actions/dataActions";

import Itemcard from "../../components/ItemCard";

const styles = {};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});

const mapDispatchToProps = {
  getStaffServiceItems,
  selectserviceitem,
  removeserviceitem,
};

function BackButton() {
  let history = useHistory();
  return (
    <Button
      className=" mb-4 float-left"
      variant="contained"
      style={{ textDecoration: "none" }}
      onClick={() => history.goBack()}
    >
      BACK
    </Button>
  );
}
function PlaceOrder() {
  return (
    <Button
      className=" mb-4 float-right p-2"
      component={Link}
      style={{ textDecoration: "none" }}
      variant="contained"
      color="inherit"
      size="small"
      to={`/order/summary`}
    >
      Place Order
    </Button>
  );
}

class staffServiceItems extends Component {
  state = {
    modalmode: null,
    _id: "",
    name: "",
    details: "",
    price: "",
    btnload: false,
    loading: true,
    postmodal: false,
  };

  componentDidMount() {
    console.log(this.props.match.params.serviceId);
    this.props.getStaffServiceItems(this.props.match.params.serviceId);
    document.body.style.backgroundColor = "#F0F2FE";
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data.staff.staffServiceItems !== undefined) {
      this.setState({
        loading: false,
      });
    }
    if (newProps.UI.errors) {
      this.setState({
        errors: newProps.UI.errors,
        loading: false,
        btnload: false,
      });
    }
  }

  render() {
    const loading = this.state.loading;

    const { classes, selectserviceitem, removeserviceitem } = this.props;

    const markup = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.staff.staffServiceItems.map((food, index) => (
        <Itemcard
          food={food}
          index={index}
          selectserviceitem={selectserviceitem}
          removeserviceitem={removeserviceitem}
        />
      ))
    );

    return (
      <div className="container" style={{ marginTop: 90 }}>
        <p style={{ fontSize: "2rem" }} className="text-center mt-4">
          Service Items
        </p>
        {/* ADD */}
        <div className="row mt-4">
          <div className="col-12">
            {loading ? null : (
              <div>
                <BackButton />
                <PlaceOrder />
              </div>
            )}
          </div>
        </div>
        <div className="row mt-4">{markup}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(staffServiceItems));
