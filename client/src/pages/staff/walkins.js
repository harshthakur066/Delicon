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
  getwalkins,
  deletewalkin,
  postwalkins,
  editwalkin,
  walkout,
} from "../../redux/actions/dataActions";

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
import Validate from './../../utils/Validate';

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
    color: "white",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    marginRight: "5px",
    marginBottom: "1rem",
    "&:hover": {
      backgroundColor: "#2196F3",
    },
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
    top: "15%",
    left: "18%",
    right: "18%",
    bottom: "5%",
    backgroundColor: "white",
    borderRadius: "20px",
    border: "0px",
    width: "auto",
    outline: "none",
    overflowY: "scroll",
  },
  gender: {
    marginTop: ".4rem",
  },
  details: {
    color:"#37474F",
    backgroundColor: "#BDBDBD",
    marginLeft: "15px",
    "@media (min-width: 320px) and (max-width: 480px)": {
      marginLeft: "5px",
    },
  }
};

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
        <Box p={2}>
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

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});

const mapDispatchToProps = {
  getwalkins,
  deletewalkin,
  postwalkins,
  editwalkin,
  walkout,
};

class Walkins extends Component {
  state = {
    modalmode: null,
    _id: "",
    name: "",
    email: "",
    mobno: "",
    address: "",
    seats: "",
    specialEvent: "",
    gender: "",
    visitingAs: "",
    know: "",
    dob: "",
    walkIn: "",
    walkOut: "",
    value: 0, // used in Tabs
    btnload: false,
    loading: true,
    postmodal: false,
    errors: {}
  };

  handleMe = (event, newValue) => {
    //used in Tabs
    this.setState({
      value: newValue,
    });
  };

  componentDidMount() {
    this.props.getwalkins();
    document.body.style.backgroundColor = "#F0F2FE";
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.data.staff.walkins !== undefined) {
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

  handlePost = () => {
    this.setState({
      modalmode: "Post",
      postmodal: true,
      name: "",
      email: "",
      address: "",
      mobno: "",
      ownerId: "",
      businessId: "",
      seats: "",
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
    const datenow = new Date().toISOString();
    const userData = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      mobno: this.state.mobno,
      seats: this.state.seats,
      specialEvent: this.state.specialEvent,
      gender: this.state.gender,
      visitingAs: this.state.visitingAs,
      know: this.state.know,
      dob: this.state.dob,
      ownerId: this.props.user.profile.ownerId,
      businessId: this.props.user.businessId,
      walkIn: datenow
    };
    if (this.state.modalmode === "Post") {
      this.props.postwalkins(userData, this.handleDone);
    } else {
      this.props.editwalkin(userData, this.handleDone, this.state._id);
    }
  };

  handleDone = () => {
    this.setState({
      btnload: false,
      postmodal: false,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleBlur = e => {
    const { name, value } = e.target;
    const error = { ...Validate(name, value) };
    this.setState({
      errors: { ...this.state.errors, ...error }
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
      gender: business.gender,
      visitingAs: business.visitingAs,
      know: business.know,
      dob: business.dob,
      ownerId: this.props.user.profile.ownerId,
      businessId: this.props.user.businessId,
      modalmode: "Edit",
      _id: business._id,
      postmodal: true,
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
      gender: business.gender,
      visitingAs: business.visitingAs,
      know: business.know,
      dob: business.dob,
      ownerId: this.props.user.profile.ownerId,
      businessId: this.props.user.businessId,
      modalmode: "Open",
      _id: business._id,
      postmodal: true,
    });
  };

  render() {
    const loading = this.state.loading;
    const btnload = this.state.btnload;
    const modalmode = this.state.modalmode;

    console.log(this.props.data.staff.walkins)

    const { classes, deletewalkin, walkout } = this.props; //WithStyles Material Thing

    //Tab 1
    const markup1 = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
        this.props.data.staff.walkins.map((walkin, index) =>
          walkin.walkIn !== undefined && walkin.walkOut === undefined ? (
            <div key={index} className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-6 mb-4">
              <Card className={classes.bodycard}>
                <CardContent>
                  <Typography style={{ fontSize: "1.05rem" }}>

                    Name - {walkin.name}{" "}
                    <div className={classes.fr}>Seats -{" " + walkin.seats}</div>{" "}

                    </Typography>
                    <Typography style={{ fontSize: "0.75rem" }}>

                    <div> Mobile No. - {walkin.mobno}</div>{" "}
                    <div> Email - {walkin.email}</div>{" "}

                    <br className={classes.breaker} />
                    <div>
                      {" "}
                    Walkin Time - {new Date(walkin.walkIn).toLocaleString()}
                    </div>
                  </Typography>

                  <br className={classes.breaker} />


                  <div className="text-center">
                    <Button
                      className={classes.details}
                      onClick={() => this.openbusiness(walkin)}
                      variant="contained"
                      size="small"
                    >
                      Details
                        </Button>
                    <Button
                      className={classes.details}
                      onClick={() => walkout(walkin._id)}
                      variant="contained"
                      size="small"
                    >
                      WalkOut
                  </Button>
                  </div>
                </CardContent>
                <Button style = {{width:"70px"}}
                  variant="contained"
                  onClick={() => this.editbusiness(walkin)}
                  className={classes.edit}
                >
                  Edit
              </Button>
                <Button style = {{width:"70px"}}
                  variant="contained"
                  onClick={() => deletewalkin(walkin._id)}
                  className={classes.delete}
                >
                  Delete
              </Button>
              </Card>
            </div>
          ) : null
        )
      );

    // Tab 2
    const markup2 = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
        this.props.data.staff.walkins.map((walkin, index) =>
          walkin.walkIn !== undefined && walkin.walkOut !== undefined ? (
            <div key={index} className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-6 mb-4">
              <Card className={classes.bodycard}>
                <CardContent>
                  
                  <Typography style={{ fontSize: "1.05rem" }}>
                    Name - {walkin.name}{" "}
                    <div className={classes.fr}>Seats -{" " + walkin.seats}</div>{" "}

                    </Typography>

                    <Typography style={{ fontSize: "0.85rem" }}>
                    <br className={classes.breaker} />
                    <div> Mobile No. - {walkin.mobno}</div>{" "}
                    <div> Email - {walkin.email}</div>{" "}
                    <br className={classes.breaker} />
                    <div>
                      {" "}
                    Walkin Time - {new Date(walkin.walkIn).toLocaleString()}
                    </div>
                    <div>
                      {" "}
                    Walkout Time - {new Date(walkin.walkOut).toLocaleString()}
                    </div>
                  </Typography>

                  <div className="text-center mt-2 ">
                    <Button
                    className={classes.details}
                      onClick={() => this.openbusiness(walkin)}
                      variant="contained"
                      size="small"
                    >
                      Details
            </Button>
                  </div>
                </CardContent>
                <Button style = {{width:"70px"}}
                  variant="contained"
                  onClick={() => this.editbusiness(walkin)}
                  className={classes.edit}
                >
                  Edit
              </Button>
                <Button style = {{width:"70px"}}
                  variant="contained"
                  onClick={() => deletewalkin(walkin._id)}
                  className={classes.delete}
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


        {/* ADD */}
        <div className="row mt-4">
          <div className="col-12">
            {loading ? null : (
              <span>
                <span style={{ fontSize: "2rem" }} className="text-center mt-4">
                  Walkins
             </span>
                <Button
                  className="mb-4 float-right"
                  variant="contained"
                  onClick={this.handlePost}
                >
                  Add Walkin
              </Button>
              </span>
            )}
          </div>
        </div>
        {/* ADD */}
        {/* TABS */}

        <div className="row mt-4">
          <div className={classes.root}>
            <AppBar style={{ backgroundColor: "#3f51b5" }} position="static">
              <Tabs
                TabIndicatorProps={{ style: { background: "#FFFFFF" } }}
                value={this.state.value}
                onChange={this.handleMe}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab
                  style={{ fontSize: ".8rem" }}
                  label="WalkIn"
                  {...a11yProps(0)}
                />
                <Tab
                  style={{ fontSize: ".8rem" }}
                  label="WalkOut"
                  {...a11yProps(1)}
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

        {/* Tabs end */}

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
                  Add a New Walkin
                </Typography>
              ) : modalmode === "Edit" ? (
                <Typography
                  style={{ fontSize: "1.5rem", textAlign: "center" }}
                  className={classes.pageTitle}
                >
                  Edit a Walkin
                </Typography>
              ) : modalmode === "Open" ? (
                <Typography
                  style={{ fontSize: "1.5rem", textAlign: "center" }}
                  className={classes.pageTitle}
                >
                  Your Walkin
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
                    Pincode - {this.state.address}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Seats - {this.state.seats}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    gender - {this.state.gender || "?"}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Date of Birth - {this.state.dob || "?"}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Special Event - {this.state.specialEvent || "?"}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    How did you get to know about us? - {this.state.know || "?"}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Visiting As - {this.state.visitingAs || "?"}
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
                      <RadioGroup name="gender" value={this.state.gender} onChange={this.handleChange}  style ={{display:"block"}}>
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
                    <br></br>
                    <br></br>

                    <div className={classes.gender} >
                      <FormLabel style={{ fontSize: "1rem", marginTop: "10px", width: "fitContent" }} component="legend">How did you get to know about us ?</FormLabel>
                      <br></br>
                      <RadioGroup name="know" value={this.state.know} onChange={this.handleChange} style ={{display:"block"}}>
                        <FormControlLabel value="Newspaper" control={<Radio />} label="Newspaper" />
                        <FormControlLabel value="Friends" control={<Radio />} label="Friends" />
                        <FormControlLabel value="Online Promotion" control={<Radio />} label="Online Promotion" />
                        <FormControlLabel value={""} control={<Radio />} label="Others" />
                        {this.state.know !== "Online Promotion" && this.state.know !== "Newspaper" && this.state.know !== "Friends"
                          ? <TextField
                            id={"know"}
                            type="text"
                            label="Please specify"
                            onChange={this.handleChange}
                            name={"know"}
                            value={this.state.know}
                          />
                          :
                          null
                        }
                      </RadioGroup>
                    </div>
                    <br></br>

                    <br></br>



                    <TextField
                      style={{ float: "left" }}
                      name="dob"
                      id="date"
                      label="Date of Birth"
                      type="date"
                      defaultValue={this.state.dob}
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
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Walkins));
