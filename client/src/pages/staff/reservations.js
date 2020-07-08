import React, { Component } from "react";
import { connect } from "react-redux";
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  TextField,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";

import {
  getreservations,
  deletereservation,
  postreservation,
  editreservation,
  checkInReservation,
  checkOutReservation,
} from "../../redux/actions/dataActions";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});

const mapDispatchToProps = {
  getreservations,
  deletereservation,
  postreservation,
  editreservation,
  checkInReservation,
  checkOutReservation,
};

const styles = {
  bodycard: {
    margin: 2,
    marginBottom: "2rem",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#FFFFFF", //card-bg-color
    boxShadow: "1px 2px 4px 1px grey",
    "&:hover": {
      transition: "(0.4s)",
      boxShadow: "1px 6px 8px 2px grey",
    },
  },
  edit: {
    float: "left",
    color: "blue",
    cursor: "pointer",
  },
  fr: {
    float: "right",
    "@media (min-width: 320px) and (max-width: 480px)": {
      float: "none",
    },
  },
  breaker: {
    marginTop: 1,
    marginBottom: 1,
  },
  delete: {
    float: "right",
    color: "red",
    cursor: "pointer",
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
    top: "13%",
    left: "10%",
    right: "10%",
    bottom: "5%",
    backgroundColor: "white",
    borderRadius: "30px",
    border: "0px",
    width: "auto",
    outline: "none",
    overflowY: "scroll",
  },
}; // Styles here

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

class Reservations extends Component {
  state = {
    modalmode: "",
    _id: "",
    name: "",
    email: "",
    mobno: "",
    address: "",
    seats: "",
    checkIn: "",
    checkOut: "",
    loading: true,
    btnload: false,
    postmodal: false,
    value: 0,
  };

  componentDidMount() {
    this.props.getreservations();
    document.body.style.backgroundColor = "#F0F2FE";
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data.staff.reservations !== undefined) {
      this.setState({
        loading: false,
      });
    }
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
        loading: false,
        btnload: false,
      });
    }
  }

  handlePost = () => {
    this.setState({
      modalmode: "Post",
      postmodal: true,
      name: "",
      email: "",
      address: "",
      mobno: "",
      seats: "",
      ownerId: "",
      businessId: "",
    });
  };

  handleClose = () => {
    this.setState({
      postmodal: false,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      btnload: true,
      errors: {},
    });
    const userData = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      mobno: this.state.mobno,
      seats: this.state.seats,
      ownerId: this.props.user.profile.ownerId,
      businessId: this.props.user.businessId,
      checkIn: this.state.checkIn,
      checkOut: this.state.checkOut,
    };
    if (this.state.modalmode === "Post") {
      this.props.postreservation(userData, this.handleDone);
    } else {
      this.props.editreservation(userData, this.handleDone, this.state._id);
    }
  };

  handleDone = () => {
    this.setState({
      btnload: false,
      postmodal: false,
    });
  };

  /////

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  editbusiness = (business) => {
    console.log(business);

    this.setState({
      name: business.name,
      email: business.email,
      address: business.address,
      mobno: business.mobno,
      seats: business.seats,
      ownerId: this.props.user.profile.ownerId,
      businessId: this.props.user.businessId,
      modalmode: "Edit",
      _id: business._id,
      postmodal: true,
    });
  };
  handleMe = (event, newValue) => {
    this.setState({
      value: newValue,
    });
  };

  openbusiness = (business) => {
    console.log(business);
    this.setState({
      name: business.name,
      email: business.email,
      address: business.address,
      mobno: business.mobno,
      seats: business.seats,
      checkIn: business.checkIn,
      checkOut: business.checkOut,
      ownerId: this.props.user.profile.ownerId,
      businessId: this.props.user.businessId,
      modalmode: "Open",
      _id: business._id,
      postmodal: true,
    });
    console.log(this.state.modalmode);
  };

  render() {
    const loading = this.state.loading;
    const btnload = this.state.btnload;
    const modalmode = this.state.modalmode;
    console.log(modalmode);

    const {
      classes,
      deletereservation,
      checkInReservation,
      checkOutReservation,
    } = this.props;

    console.log(this.state.value);
    console.log(this.props.data.staff.reservations);
    // Tab 1
    const markup1 = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.staff.reservations.map((reservation, index) =>
        reservation.checkIn !== undefined ? null : (
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
                {/* <div className="text-center mt-1 ">
              <Button
              style={{color:"#616161"}} 
              onClick={() => this.openbusiness(reservation)}
               variant="contained"
               size="small"
              >
              Details
             </Button>
          </div>
        */}
                <div className="text-center mt-2 ">
                  <Button
                    style={{ color: "#616161" }}
                    onClick={() => checkInReservation(reservation._id)}
                    variant="contained"
                    size="small"
                  >
                    CheckIn
                  </Button>
                </div>
              </CardContent>

              <Button
                onClick={() => this.editbusiness(reservation)}
                className={classes.edit}
              >
                Edit
              </Button>
              <Button
                onClick={() => deletereservation(reservation._id)}
                className={classes.delete}
              >
                Delete
              </Button>
            </Card>
          </div>
        )
      )
    );

    // Tab2
    const markup2 = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.staff.reservations.map((reservation, index) =>
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
                    CheckIn at -{" "}
                    {new Date(reservation.checkIn).toLocaleString()}
                  </div>
                </Typography>

                {/* <div className="text-center mt-1 ">
              <Button
              style={{color:"#616161"}} 
              onClick={() => this.openbusiness(reservation)}
               variant="contained"
               size="small"
              >
              Details
             </Button>
          </div> */}

                <div className="text-center mt-2 ">
                  <Button
                    style={{ color: "#616161" }}
                    onClick={() => checkOutReservation(reservation._id)}
                    variant="contained"
                    size="small"
                  >
                    CheckOut
                  </Button>
                </div>
              </CardContent>

              <Button
                onClick={() => this.editbusiness(reservation)}
                className={classes.edit}
              >
                Edit
              </Button>
              <Button
                onClick={() => deletereservation(reservation._id)}
                className={classes.delete}
              >
                Delete
              </Button>
            </Card>
          </div>
        ) : null
      )
    );
    // Tab 3
    const markup3 = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.staff.reservations.map((reservation, index) =>
        reservation.checkOut !== undefined &&
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
                    CheckIn at -{" "}
                    {new Date(reservation.checkIn).toLocaleString()}
                  </div>
                  <div>
                    CheckOut at -{" "}
                    {new Date(reservation.checkOut).toLocaleString()}
                  </div>
                </Typography>
                <br></br>
                {/* <div className="text-center mt-1 ">
              <Button
              style={{color:"#616161"}} 
              onClick={() => this.openbusiness(reservation)}
               variant="contained"
               size="small"
              >
              Details
             </Button>
          </div> */}
              </CardContent>
              <Button
                onClick={() => deletereservation(reservation._id)}
                className={classes.delete}
              >
                Edit
              </Button>
              <Button
                onClick={() => this.editbusiness(reservation)}
                className={classes.edit}
              >
                Delete
              </Button>
            </Card>
          </div>
        ) : null
      )
    );

    return (
      <div className="container" style={{ marginTop: 90 }}>
        <p style={{ fontSize: "2rem" }} className="text-center mt-4">
          Reservations
        </p>

        {/* Tabs */}
        <div className="row mt-4">
          <div className={classes.root}>
            <AppBar style={{ backgroundColor: "#3f51b5" }} position="static">
              <Tabs
                style={{}}
                TabIndicatorProps={{ style: { background: "#FFFFFF" } }}
                value={this.state.value}
                onChange={this.handleMe}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab
                  style={{ fontSize: ".8rem" }}
                  label="Pending"
                  {...a11yProps(0)}
                />
                <Tab
                  style={{ fontSize: ".8rem" }}
                  label="CheckIns"
                  {...a11yProps(1)}
                />
                <Tab
                  style={{ fontSize: ".8rem" }}
                  label="CheckOuts"
                  {...a11yProps(2)}
                />
              </Tabs>
            </AppBar>
          </div>
        </div>

        {/* add */}
        <div className="row mt-4">
          <div className="col-12">
            {loading ? null : (
              <Button
                className=" mb-4 float-right"
                variant="contained"
                onClick={this.handlePost}
              >
                Add Reservation
              </Button>
            )}
          </div>
        </div>
        {/* add */}

        <TabPanel value={this.state.value} index={0}>
          <div className="row mt-4">{markup1}</div>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <div className="row mt-4">{markup2}</div>
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          <div className="row mt-4">{markup3}</div>
        </TabPanel>

        {/*Tabs*/}

        <Modal
          open={this.state.postmodal}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.modlebox}>
            <div
              className="container"
              style={{ padding: "20px 25px", textAlign: "center" }}
            >
              {modalmode === "Post" ? (
                <Typography
                  style={{ fontSize: "1.5rem" }}
                  className={classes.pageTitle}
                >
                  Add a Reservation
                </Typography>
              ) : modalmode === "Edit" ? (
                <Typography
                  style={{ fontSize: "1.5rem" }}
                  className={classes.pageTitle}
                >
                  Edit a Reservation
                </Typography>
              ) : modalmode === "Open" ? (
                <Typography
                  style={{ fontSize: "1.5rem" }}
                  className={classes.pageTitle}
                >
                  Your Reservation
                </Typography>
              ) : null}
              {modalmode === "Open" ? (
                <>
                  <Typography variant="h6" className="mt-2 ">
                    Name - {this.state.name}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Mobile No. - {this.state.mobno}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Email - {this.state.email}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Address - {this.state.address}
                  </Typography>
                  <Typography style={{ fontSize: "1.5rem" }} className="mt-2 ">
                    Seats - {this.state.seats}
                  </Typography>
                </>
              ) : (
                <form onSubmit={this.handleSubmit}>
                  <TextField
                    name="name"
                    type="name"
                    label="Name.."
                    className={classes.TextField}
                    value={this.state.name}
                    onChange={this.handleChange}
                    fullWidth
                    required={true}
                  />
                  <TextField
                    name="mobno"
                    type="mobno"
                    label="Mobile Number.."
                    className={classes.TextField}
                    value={this.state.mobno}
                    onChange={this.handleChange}
                    fullWidth
                    required={true}
                  />
                  <TextField
                    name="address"
                    type="address"
                    label="Address.."
                    className={classes.TextField}
                    value={this.state.address}
                    onChange={this.handleChange}
                    fullWidth
                    required={true}
                  />
                  <TextField
                    name="email"
                    type="email"
                    label="Email.."
                    className={classes.TextField}
                    value={this.state.email}
                    onChange={this.handleChange}
                    fullWidth
                    required={true}
                  />
                  <TextField
                    name="seats"
                    type="text"
                    label="No. of Seats.."
                    className={classes.TextField}
                    value={this.state.seats}
                    onChange={this.handleChange}
                    fullWidth
                    required={true}
                  />
                  {this.state.errors ? <p>{this.state.errors.error}</p> : null}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={btnload}
                    className={classes.button}
                  >
                    Submit
                    {btnload && (
                      <CircularProgress
                        size={30}
                        className={classes.progress}
                      />
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Modal>
      </div>
    ); //Render Data here
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Reservations));
