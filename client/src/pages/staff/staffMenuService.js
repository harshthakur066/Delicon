import React, { Component } from "react";

import { connect } from "react-redux";
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import {
  getStaffMenuCategories,
  getStaffServiceCategories,
} from "../../redux/actions/dataActions";
import { Link } from "react-router-dom";

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
  getStaffMenuCategories,
  getStaffServiceCategories,
};

class staffMenuService extends Component {
  state = {
    modalmode: null,
    _id: "",
    name: "",
    details: "",
    btnload: false,
    loading: true,
    postmodal: false,
  };

  componentDidMount() {
    console.log(this.props.user);
    this.props.getStaffMenuCategories(this.props.user.profile.businessId);
    this.props.getStaffServiceCategories(this.props.user.profile.businessId);
    document.body.style.backgroundColor = "#F0F2FE";
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (
      newProps.data.staff.menu !== undefined &&
      newProps.data.staff.service !== undefined
    ) {
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

    const { classes } = this.props;

    const markup = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.staff.menu.map((food, index) => (
        <div key={index} className="col-6 sm-12 xs-12 mb-4 text-center">
          <Card className={classes.bodycard}>
            <CardContent>
              <Typography style={{ fontSize: "1.05rem" }}>
                {food.name} <br></br>
                {food.details}
              </Typography>
              <Button
                component={Link}
                variant="contained"
                color="inherit"
                size="small"
                to={`/order/menuitems`}
              >
                Items
              </Button>
              <br className={classes.breaker} />
              <br className={classes.breaker} />
            </CardContent>
          </Card>
        </div>
      ))
    );

    const markup2 = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.staff.service.map((food, index) => (
        <div key={index} className="col-6 sm-12 xs-12 mb-4 text-center">
          <Card className={classes.bodycard}>
            <CardContent>
              <Typography style={{ fontSize: "1.05rem" }}>
                {food.name} <br></br>
                {food.details}
              </Typography>
              <Button
                component={Link}
                variant="contained"
                size="small"
                color="inherit"
                to={`/order/serviceitem`}
                className="mt-3"
              >
                ITEMS
              </Button>
              <br className={classes.breaker} />
            </CardContent>
          </Card>
        </div>
      ))
    );

    return (
      <div className="container" style={{ marginTop: 90 }}>
        <p style={{ fontSize: "2rem" }} className="text-center mt-4">
          Menu
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
)(withStyles(styles)(staffMenuService));
