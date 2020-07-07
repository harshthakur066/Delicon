import React, { Component } from "react";
import { connect } from "react-redux";
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Backdrop,
  Button,
} from "@material-ui/core";
import {
  getallres,
  getallwalk,
  selectcustomer,
} from "../../redux/actions/dataActions";

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
  getallres,
  getallwalk,
  selectcustomer,
};

class orderCustomer extends Component {
  state = {
    loading: true,
    errors: {},
  };

  componentDidMount() {
    this.props.getallres(this.props.user.profile.businessId);
    this.props.getallwalk(this.props.user.profile.businessId);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (
      newProps.data.staff.allwalk !== undefined &&
      newProps.data.staff.allres !== undefined
    ) {
      this.setState({
        loading: false,
      });
    }
    if (newProps.UI.errors) {
      this.setState({
        errors: newProps.UI.errors,
        loading: false,
      });
    }
  }

  clickMe = (customerId, name) => {
    const { selectcustomer, history } = this.props;
    try {
      const obj = { customerId, name, staff: this.props.user.profile.name };
      console.log(obj);
      selectcustomer(obj);
      history.push("/order/categories");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const loading = this.state.loading;

    const { classes } = this.props;

    const markup1 = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.staff.allwalk.map((walkin, index) =>
        walkin.walkIn !== undefined && walkin.walkOut === undefined ? (
          <div key={index} className="col-12 mb-4">
            <Card className={classes.bodycard}>
              <CardContent>
                <Typography style={{ fontSize: "1.05rem" }}>
                  Name - {walkin.name}{" "}
                  <div className={classes.fr}>Seats -{" " + walkin.seats}</div>{" "}
                  <div> Mobile No. - {walkin.mobno}</div>{" "}
                  <div> Email - {walkin.email}</div>{" "}
                  <div> Address - {walkin.address}</div>{" "}
                  <br className={classes.breaker} />
                  <div>
                    Check-in at - {new Date(walkin.walkIn).toLocaleString()}
                  </div>
                </Typography>
                <br className={classes.breaker} />
                <div className="text-center">
                  <Button
                    style={{ color: "#616161" }}
                    onClick={() => this.clickMe(walkin._id, walkin.name)}
                    variant="contained"
                    size="small"
                  >
                    Order
                  </Button>
                </div>
                <br className={classes.breaker} />
              </CardContent>
            </Card>
          </div>
        ) : null
      )
    );

    const markup2 = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.staff.allres.map((reservation, index) =>
        reservation.checkOut === undefined &&
        reservation.checkIn !== undefined ? (
          <div key={index} className="col-12 mb-4">
            <Card className={classes.bodycard}>
              <CardContent>
                <Typography style={{ fontSize: "1.05rem" }}>
                  Name - {reservation.name}{" "}
                  <div className={classes.fr}>Seats - {reservation.seats}</div>{" "}
                </Typography>
                <Typography style={{ fontSize: "1.05rem" }}>
                  Email - {reservation.email}{" "}
                </Typography>

                <Typography style={{ fontSize: "1.05rem" }}>
                  Mobile No. - {reservation.mobno}
                  <div>Address - {reservation.address}</div>
                </Typography>
                <br className={classes.breaker} />
                <Typography style={{ fontSize: "1.05rem" }}>
                  <div>
                    Check-in at -{" "}
                    {new Date(reservation.checkIn).toLocaleString()}
                  </div>
                </Typography>
                <div className="text-center mt-2 ">
                  <Button
                    style={{ color: "#616161" }}
                    onClick={() =>
                      this.clickMe(reservation._id, reservation.name)
                    }
                    variant="contained"
                    size="small"
                  >
                    Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null
      )
    );

    return (
      <div className="container" style={{ marginTop: 90 }}>
        <p style={{ fontSize: "2rem" }} className="text-center mt-4">
          Customers Checked-in
        </p>
        <div className="row mt-4">{markup1}</div>
        <div className="row mt-4">{markup2}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(orderCustomer));
