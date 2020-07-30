import React, { Component } from "react";

import { connect } from "react-redux";
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { postOrder } from "../../redux/actions/dataActions";
import { Link } from "react-router-dom";

// order Summery

const styles = {
  bodycard: {
    margin: 5,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#FFFFFF",
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
    color: "blue",
    cursor: "pointer",
  },
  delete: {
    float: "right",
    color: "red",
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
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});

const mapDispatchToProps = {
  postOrder,
};

class OrderSummery extends Component {
  state = {
    btnload: false,
    errors: {},
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.UI.errors) {
      this.setState({
        errors: newProps.UI.errors,
        btnload: false,
      });
    }
  }

  handleDone = () => {
    this.setState({
      btnload: false,
    });
    this.props.history.push("/orders");
  };

  handlesubmit = () => {
    this.setState({
      btnload: true,
    });
    const data = this.props.data.staff.order;
    data.createdAt = new Date().toISOString();
    this.props.postOrder(
      this.props.user.businessId,
      data,
      this.handleDone
    );
  };

  render() {
    const { classes } = this.props;

    const markup = this.props.data.staff.order.MenuItems.map((food, index) => (
      <div key={index} className="col-6 sm-12 xs-12 mb-4 text-center">
        <Card className={classes.bodycard}>
          <CardContent>
            <Typography style={{ fontSize: "1.05rem" }}>
              Name - {food.name} <br></br>
              Details - {food.details} <br></br>
              Quantity - {food.quantity}
            </Typography>
            <br className={classes.breaker} />
            <br className={classes.breaker} />
          </CardContent>
        </Card>
      </div>
    ));

    const markup2 = this.props.data.staff.order.services.map((food, index) => (
      <div key={index} className="col-6 sm-12 xs-12 mb-4 text-center">
        <Card className={classes.bodycard}>
          <CardContent>
            <Typography style={{ fontSize: "1.05rem" }}>
              Name - {food.name} <br></br>
              Details - {food.details} <br></br>
              Quantity - {food.quantity}
            </Typography>
            <br className={classes.breaker} />
          </CardContent>
        </Card>
      </div>
    ));

    return (
      <div className="container" style={{ marginTop: 90 }}>
        <h1 className="text-center mt-4"> Order Summary </h1>
        <div>
          <Button
            className=" mb-4 float-left"
            variant="contained"
            style={{ textDecoration: "none" }}
            component={Link}
            to="/order/categories"
          >
            Add More
          </Button>
          <Button
            className=" mb-4 float-right p-2"
            style={{ textDecoration: "none" }}
            variant="contained"
            onClick={this.handlesubmit}
            disabled={this.state.btnload}
          >
            Confirm order
            {this.state.btnload && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
        </div>
        <p style={{ fontSize: "2rem" }} className="text-center mt-3">
          MenuItems
        </p>
        <div className="row mt-4">{markup}</div>

        <p style={{ fontSize: "2rem" }} className="text-center mt-4">
          Services
        </p>
        <div className="row mt-4">{markup2}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(OrderSummery));
