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

import Validate from "../../utils/Validate"

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';

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
    width: "inherit",
    height: "inherit",
    "&:hover": {
      transition: "(0.4s)",
      boxShadow: "1px 6px 8px 2px grey",
    },
  },
  edit: {
    float: "left",
    color: "white",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    marginRight: "5px",
    marginBottom: "1rem",
    "&:hover": {
      backgroundColor: "#2196F3",
    },
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
    color: "white",
    cursor: "pointer",
    backgroundColor: "#f44336",
    marginBottom: "1rem",
    "&:hover": {
      backgroundColor: "#f44336",
    },
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

  gender: {
    marginTop: ".4rem",
  },

  details: {
    color: "#616161",
    marginLeft: "15px",
    marginTop: "15px",
    "@media (min-width: 320px) and (max-width: 480px)": {
      marginLeft: "5px",
    },
  }
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
    specialEvent: "",
    dateOfBirth: "",
    gender: "",
    modeOfBooking: "",
    visitingAs: "",
    checkIn: "",
    checkOut: "",
    loading: true,
    btnload: false,
    postmodal: false,
    value: 0,
    errors: {}
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
      mobno: "",
      address: "",
      seats: "",
      specialEvent: "",
      dateOfBirth: "",
      gender: "",
      modeOfBooking: "",
      visitingAs: "",
      ownerId: "",
      businessId: "",
      other: false
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
      mobno: this.state.mobno,
      seats: this.state.seats,
      address: this.state.address,
      specialEvent: this.state.specialEvent,
      dateOfBirth: this.state.dateOfBirth,
      gender: this.state.gender,
      modeOfBooking: this.state.modeOfBooking,
      visitingAs: this.state.visitingAs,
      ownerId: this.props.user.profile.ownerId,
      businessId: this.props.user.businessId,
      checkIn: this.state.checkIn,
      checkOut: this.state.checkOut,
      createdAt: new Date().toISOString(),
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

    this.setState({
      name: business.name,
      email: business.email,
      address: business.address,
      mobno: business.mobno,
      seats: business.seats,
      specialEvent: business.specialEvent,
      dateOfBirth: business.dateOfBirth,
      gender: business.gender,
      modeOfBooking: business.modeOfBooking,
      visitingAs: business.visitingAs,
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
    this.setState({
      name: business.name,
      email: business.email,
      address: business.address,
      mobno: business.mobno,
      seats: business.seats,

      specialEvent: business.specialEvent,
      dateOfBirth: business.dateOfBirth,
      gender: business.gender,
      modeOfBooking: business.modeOfBooking,
      visitingAs: business.visitingAs,

      checkIn: business.checkIn,
      checkOut: business.checkOut,
      ownerId: this.props.user.profile.ownerId,
      businessId: this.props.user.businessId,
      modalmode: "Open",
      _id: business._id,
      postmodal: true,
    });
  };


  handleBlur = e => {
    console.log("handleBlur")
    const { name, value } = e.target;
    const error = { ...Validate(name, value) };
    this.setState({
      errors: { ...this.state.errors, ...error }
    });

    console.log(this.state.errors)

  };

  render() {

    const loading = this.state.loading;
    const btnload = this.state.btnload;
    const modalmode = this.state.modalmode;

    const {
      classes,
      deletereservation,
      checkInReservation,
      checkOutReservation,
    } = this.props;

    // Tab 1
    const markup1 = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
        this.props.data.staff.reservations.map((reservation, index) =>
          reservation.checkIn !== undefined ? null : (
            <div key={index} className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-6 mb-4">
              <Card className={classes.bodycard}>
                <CardContent>
                  <Typography style={{ fontSize: "1.05rem", marginTop: "5px" }}>
                    Name - {reservation.name}{" "}
                    <div className={classes.fr}>Seats - {reservation.seats}</div>{" "}
                  </Typography>
                  <Typography style={{ fontSize: "1.05rem", marginTop: "5px" }}>
                    Email - {reservation.email}{" "}
                  </Typography>
                  <Typography style={{ fontSize: "1.05rem", marginTop: "5px" }}>
                    Mobile No. - {reservation.mobno}
                  </Typography>

                  <div className="text-center">
                    <Button
                      style={{ color: "#616161", marginTop: "15px" }}
                      onClick={() => this.openbusiness(reservation)}
                      variant="contained"
                      size="small"
                    >
                      Details
             </Button>


                    <Button
                      className={classes.details}
                      onClick={() => checkInReservation(reservation._id)}
                      variant="contained"
                      size="small"
                    >
                      CheckIn
                  </Button>
                  </div>


                </CardContent>

                <Button
                  variant="contained"
                  onClick={() => this.editbusiness(reservation)}
                  className={classes.edit}
                >
                  Edit
              </Button>
                <Button
                  variant="contained"
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
              <div key={index} className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-6 mb-4">
                <Card className={classes.bodycard}>
                  <CardContent>
                    <Typography style={{ fontSize: "1.05rem", marginTop: "5px" }}>
                      Name - {reservation.name}{" "}
                      <div className={classes.fr}>Seats - {reservation.seats}</div>{" "}
                    </Typography>
                    <Typography style={{ fontSize: "1.05rem", marginTop: "5px" }}>
                      Email - {reservation.email}{" "}
                    </Typography>

                    <Typography style={{ fontSize: "1.05rem", marginTop: "5px" }}>
                      Mobile No. - {reservation.mobno}
                    </Typography>




                    <br className={classes.breaker} />
                    <Typography style={{ fontSize: "1.05rem" }}>
                      <div>
                        CheckIn at -{" "}
                        {new Date(reservation.checkIn).toLocaleString()}
                      </div>
                    </Typography>

                    <div className="text-center">
                      <Button
                        style={{ color: "#616161", marginTop: "15px" }}
                        onClick={() => this.openbusiness(reservation)}
                        variant="contained"
                        size="small"
                      >
                        Details
             </Button>
                      <Button
                        className={classes.details}
                        onClick={() => checkOutReservation(reservation._id)}
                        variant="contained"
                        size="small"
                      >
                        CheckOut
                  </Button>
                    </div>



                  </CardContent>

                  <Button
                    variant="contained"
                    onClick={() => this.editbusiness(reservation)}
                    className={classes.edit}
                  >
                    Edit
              </Button>
                  <Button
                    variant="contained"
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
              <div key={index} className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-6 mb-4">
                <Card className={classes.bodycard}>
                  <CardContent>
                    <Typography style={{ fontSize: "1.05rem", marginTop: "5px" }}>
                      Name - {reservation.name}{" "}
                      <div className={classes.fr}>Seats - {reservation.seats}</div>{" "}
                    </Typography>
                    <Typography style={{ fontSize: "1.05rem", marginTop: "5px" }}>
                      Email - {reservation.email}{" "}
                    </Typography>
                    <Typography style={{ fontSize: "1.05rem", marginTop: "5px" }}>
                      Mobile No. - {reservation.mobno}
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
                    <div className="text-center mt-1 ">
                      <Button
                        style={{ color: "#616161" }}
                        onClick={() => this.openbusiness(reservation)}
                        variant="contained"
                        size="small"
                      >
                        Details
             </Button>
                    </div>
                  </CardContent>
                  <Button
                    variant="contained"
                    onClick={() => deletereservation(reservation._id)}
                    className={classes.delete}
                  >
                    Delete
              </Button>
                  <Button
                    variant="contained"
                    onClick={() => this.editbusiness(reservation)}
                    className={classes.edit}
                  >
                    Edit
              </Button>
                </Card>
              </div>
            ) : null
        )
      );

    return (
      <div className="container" style={{ marginTop: 90 }}>
        {/* add */}
        <div className="row mt-4">
          <div className="col-12">

            {loading ? null : (
              <span>
                <span style={{ fontSize: "2rem" }} className="text-left mt-4">
                  Reservations
            </span>
                <Button
                  className=" mb-4 float-right"
                  variant="contained"
                  onClick={this.handlePost}
                >
                  Add Reservation
              </Button>
              </span>
            )}
          </div>
        </div>
        {/* add */}

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
              style={{ padding: "20px 25px" }}
            >
              {modalmode === "Post" ? (
                <Typography
                  style={{ fontSize: "1.5rem", textAlign: "center" }}
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
                  style={{ fontSize: "1.5rem", textAlign: "center" }}
                  className={classes.pageTitle}
                >
                  Your Reservation
                </Typography>
              ) : null}
              {modalmode === "Open" ? (
                <>
                  <Typography style={{ fontSize: "1.05rem", marginTop: "10px" }}>
                    Name - {this.state.name}
                  </Typography>
                  <Typography style={{ fontSize: "1.05rem", marginTop: "10px" }}>
                    Mobile No. - {this.state.mobno}
                  </Typography>
                  <Typography style={{ fontSize: "1.05rem", marginTop: "10px" }}>
                    Email - {this.state.email}
                  </Typography>
                  <Typography style={{ fontSize: "1.05rem", marginTop: "10px" }}>
                    Pincode - {this.state.address}
                  </Typography>
                  <Typography style={{ fontSize: "1.05rem", marginTop: "10px" }}>
                    Seats - {this.state.seats}
                  </Typography>
                  <Typography style={{ fontSize: "1.05rem", marginTop: "10px" }}>
                    Gender - {this.state.gender || "?"}{" "}
                  </Typography>
                  <Typography style={{ fontSize: "1.05rem", marginTop: "10px" }}>
                    Date of Birth - {this.state.dateOfBirth || "?"}{" "}
                  </Typography>
                  <Typography style={{ fontSize: "1.05rem", marginTop: "10px" }}>
                    Special Event - {this.state.specialEvent || "?"}{" "}
                  </Typography>
                  <Typography style={{ fontSize: "1.05rem", marginTop: "10px" }}>
                    Mode of Booking - {this.state.modeOfBooking || "?"}{" "}
                  </Typography>
                  <Typography style={{ fontSize: "1.05rem", marginTop: "10px" }}>
                    Visiting As - {this.state.visitingAs || "?"}{" "}
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
                      onBlur={this.handleBlur}
                      onChange={this.handleChange}
                      fullWidth
                      required={true}
                    />
                    {this.state.errors.errors !== undefined ?
                      <div style={{ color: "red", textAlign: "center" }}>{this.state.errors.errors.name}</div>
                      : null}
                    <TextField
                      name="mobno"
                      type="number"
                      label="Mobile Number.."
                      className={classes.TextField}
                      value={this.state.mobno}
                      onBlur={this.handleBlur}
                      onChange={this.handleChange}
                      fullWidth
                      required={true}

                    />
                    {this.state.errors.errors !== undefined ?
                      <div style={{ color: "red", textAlign: "center" }}>{this.state.errors.errors.mobno}</div>
                      : null}
                    <TextField
                      name="address"
                      type="text"
                      label="Pincode.."
                      className={classes.TextField}
                      value={this.state.address}
                      onChange={this.handleChange}
                      fullWidth
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
                    <div>

                      <div className={classes.gender} >
                        <FormLabel style={{ fontSize: "1rem", marginTop: "10px", width: "fitContent" }} component="legend">Mode of Booking</FormLabel>


                        <br></br>
                        <RadioGroup name="modeOfBooking" value={this.state.modeOfBooking} onChange={this.handleChange}>
                          <FormControlLabel value="online" control={<Radio />} label="Online" />
                          <FormControlLabel value="phone" control={<Radio />} label="Phone" />
                          <FormControlLabel value={""} control={<Radio />} label="Others" />
                          {this.state.modeOfBooking !== "online" && this.state.modeOfBooking !== "phone"
                            ? <TextField
                              id={"modeOfBooking"}
                              type="text"
                              label="Please specify"
                              onChange={this.handleChange}
                              name={"modeOfBooking"}
                              value={this.state.modeOfBooking}
                            />
                            :
                            null
                          }
                        </RadioGroup>
                      </div>
                    </div>

                    <TextField
                      name="seats"
                      type="number"
                      label="No. of Seats.."
                      className={classes.TextField}
                      value={this.state.seats}
                      onChange={this.handleChange}
                      fullWidth
                      required={true}
                    />



                    <div style={{ marginLeft: "10px" }} className={classes.gender} >
                      <FormLabel style={{ fontSize: "1rem", marginTop: "10px" }} component="legend">Gender</FormLabel>

                      <RadioGroup name="gender" value={this.state.gender} onChange={this.handleChange}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                      </RadioGroup>
                    </div>

                    <TextField
                      name="specialEvent"
                      type="text"
                      label="Special Event.."
                      className={classes.TextField}
                      value={this.state.specialEvent}
                      onChange={this.handleChange}
                      fullWidth
                    />

                    <TextField
                      style={{ float: "left" }}
                      name="dateOfBirth"
                      id="date"
                      label="Date of Birth"
                      type="date"
                      defaultValue={this.state.dateOfBirth}
                      onChange={this.handleChange}

                      className={classes.TextField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />


                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                    <br></br>

                    <InputLabel id="demo-simple-select-label">Visiting As?</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      name="visitingAs"
                      type="text"
                      id="demo-simple-select"
                      value={this.state.visitingAs}
                      onChange={this.handleChange}
                      fullWidth
                    >
                      <MenuItem value={"Family"}>Family</MenuItem>
                      <MenuItem value={"Friend"}>Friend</MenuItem>
                      <MenuItem value={"Couples"}>Couples</MenuItem>
                    </Select>
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
