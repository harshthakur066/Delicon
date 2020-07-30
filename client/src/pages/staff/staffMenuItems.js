import React, { Component } from "react";
import { useHistory, Link } from "react-router-dom";

import { connect } from "react-redux";
import {
  withStyles,
  Button,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import {
  getStaffMenuItems,
  selectmenuitem,
  removemenuitem,
} from "../../redux/actions/dataActions";

import Itemcard from "../../components/ItemCard";

// Selection of menu item by customers

const styles = {
  bodycard: {
    margin: 5,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#FFFFFF", //card-bg-color
    boxShadow: "1px 2px 4px 1px grey",
    "&:hover": {
      transition: "(0.4s)",
      boxShadow: "1px 6px 8px 2px grey",
    },
  },
  fr: {
    float: "right",
    "@media (min-width: 320px) and (max-width: 480px)": {
      float: "none",
    },
  },
  breaker: {
    marginTop: 5,
    marginBottom: 5,
  },
  edit: {
    float: "left",
    // color: "blue",
    cursor: "pointer",
  },
  delete: {
    float: "right",
    // color: "red",
    cursor: "pointer",
    marginBottom: "1.05rem",
  },
  root: {
    margin: "auto",
    textAlign: "center",
    flexGrow: 0,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  pageTitle: {
    margin: "20px auto 20px auto",
  },
  TextField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
  progress: {
    position: "absolute",
  },
  modlebox: {
    position: "fixed",
    top: "15%",
    left: "10%",
    right: "10%",
    bottom: "5%",
    backgroundColor: "white",
    borderRadius: "20px",
    border: "0px",
    width: "auto",
    outline: "none",
    overflowY: "scroll",
  },
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});

const mapDispatchToProps = {
  getStaffMenuItems,
  selectmenuitem,
  removemenuitem,
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

function PlaceOrder({ items }) {
  return (
    <Button
      className=" mb-4 float-right p-2"
      component={Link}
      style={{ textDecoration: "none" }}
      variant="contained"
      color="inherit"
      size="small"
      disabled={items > 0 ? false : true}
      to={`/order/summary`}
    >
      Place Order
    </Button>
  );
}

class staffMenuItems extends Component {
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
    this.props.getStaffMenuItems(this.props.match.params.menuId);
    document.body.style.backgroundColor = "#F0F2FE";
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data.staff.staffMenuItems !== undefined) {
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

    const { classes, selectmenuitem, removemenuitem } = this.props;

    const markup = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.staff.staffMenuItems.map((food, index) => (
        <Itemcard
          food={food}
          index={index}
          selectserviceitem={selectmenuitem}
          removeserviceitem={removemenuitem}
        />
      ))
    );

    return (
      <div className="container" style={{ marginTop: 90 }}>
        <p style={{ fontSize: "2rem" }} className="text-center mt-4">
          Menu Items
        </p>
        {/* ADD */}
        <div className="row mt-4">
          <div className="col-12">
            {loading ? null : (
              <div>
                <BackButton />
                <PlaceOrder items={this.props.data.staff.order.itemCount} />
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
)(withStyles(styles)(staffMenuItems));
