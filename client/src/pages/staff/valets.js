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
  getvalets,
  deletevalet,
  postvalets,
  editvalets,
  valetstimeout,
} from "../../redux/actions/dataActions";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

const styles = {
  bodycard: {
    margin: 5,
    marginBottom: "2rem",
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#FFFFFF", //card-bg-color
    boxShadow: "1px 2px 4px 1px grey",
    "&:hover": {
      transition: "(0.4s)",
      boxShadow: "1px 6px 8px 2px grey",
    },
  },
  edit: {
    float: "left",
    color: "white",
    cursor: "pointer",
    backgroundColor:"#2196F3",
    marginRight:"5px",
    marginBottom:"1rem",
    "&:hover": {
      backgroundColor:"#2196F3",
    },
  },
  fr: {
    float: "right",
  },
  breaker: {
    marginTop: 5,
    marginBottom: 5,
  },
  delete: {
    float: "right",
    color: "white",
    cursor: "pointer",
    backgroundColor:"#f44336",
    marginBottom:"1rem",
    "&:hover": {
      backgroundColor:"#f44336",
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
    left: "10%",
    right: "10%",
    bottom: "15%",
    backgroundColor: "white",
    borderRadius: "30px",
    border: "0px",
    width: "auto",
    outline: "none",
  },
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
  getvalets,
  deletevalet,
  postvalets,
  editvalets,
  valetstimeout,
};

class Valets extends Component {
  state = {
    modalmode: "",
    _id: "",
    carNumber: "",
    ownerName: "",
    driverName: "",
    value: 0,
    timeIn: "",
    timeOut: "",
    loading: true,
    btnload: false,
    postmodal: false,
  };

  handleMe = (event, newValue) => {
    //used in Tabs
    this.setState({
      value: newValue,
    });
  };

  componentDidMount() {
    this.props.getvalets();
    document.body.style.backgroundColor = "#F0F2FE";
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data.staff.valets !== undefined) {
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
      carNumber: "",
      ownerName: "",
      driverName: "",
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
      carNumber: this.state.carNumber,
      ownerName: this.state.ownerName,
      driverName: this.state.driverName,
      ownerId: this.props.user.profile.ownerId,
      businessId: this.props.user.businessId,
    };
    if (this.state.modalmode === "Post") {
      this.props.postvalets(userData, this.handleDone);
    } else {
      this.props.editvalets(userData, this.handleDone, this.state._id);
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

  editbusiness = (business) => {
    this.setState({
      carNumber: business.carNumber,
      ownerName: business.ownerName,
      driverName: business.driverName,
      ownerId: this.props.user.profile.ownerId,
      businessId: this.props.user.businessId,
      modalmode: "Edit",
      postmodal: true,
      _id: business._id,
    });
  };

  openbusiness = (business) => {
    this.setState({
      carNumber: business.carNumber,
      ownerName: business.ownerName,
      driverName: business.driverName,
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

    const { classes, deletevalet, valetstimeout } = this.props; //WithStyles Material Thing

    const markup1 = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.staff.valets.map((vallet, index) =>
        vallet.timeIn !== undefined && vallet.timeOut === undefined ? (
          <div key={index} className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-6 mb-4">
            <Card className={classes.bodycard}>
              <CardContent>
                <Typography style={{ fontSize: "1.05rem" }}>
                  Name - {vallet.ownerName}{" "}
                  <div>Car No - {vallet.carNumber}</div>{" "}
                </Typography>
                <Typography style={{ fontSize: "1.05rem" }}>
                  Driver Name - {vallet.driverName}{" "}
                </Typography>
                <br className={classes.breaker} />

                <Typography style={{ fontSize: "1.05rem" }}>
                  Time In - {new Date(vallet.timeIn).toLocaleString()}{" "}
                </Typography>

                <div className="text-center mt-2 ">
                  {/* <Button
                style = {{color:"#616161"}}
                onClick={() => this.openbusiness(vallet)}
                variant="contained"
                size="small"
              >
                Details
              </Button> */}
                </div>
                <div className="text-center mt-2 ">
                  <Button
                    style={{ color: "#616161" }}
                    onClick={() => valetstimeout(vallet._id)}
                    variant="contained"
                    size="small"
                  >
                    TimeOut
                  </Button>
                </div>
                <Button
                 variant="contained"
                  onClick={() => this.editbusiness(vallet)}
                  className={classes.edit}
                >
                  Edit
                </Button>
                <Button
                 variant="contained"
                  onClick={() => deletevalet(vallet._id)}
                  className={classes.delete}
                >
                  Delete
                </Button>
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
      this.props.data.staff.valets.map((vallet, index) =>
        vallet.timeIn !== undefined && vallet.timeOut !== undefined ? (
          <div key={index} className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-6 mb-4">
            <Card className={classes.bodycard}>
              <CardContent>
                <Typography style={{ fontSize: "1.05rem" }}>
                  Name - {vallet.ownerName}{" "}
                  <div>Car No - {vallet.carNumber}</div>{" "}
                </Typography>
                <Typography style={{ fontSize: "1.05rem" }}>
                  Driver Name - {vallet.driverName}{" "}
                </Typography>
                <br className={classes.breaker} />

                <Typography style={{ fontSize: "1.05rem" }}>
                  Time In - {new Date(vallet.timeIn).toLocaleString()}{" "}
                </Typography>
                <Typography style={{ fontSize: "1.05rem" }}>
                  Time Out - {new Date(vallet.timeOut).toLocaleString()}{" "}
                </Typography>

                <div className="text-center ">
                  {/* <Button
                style = {{color:"#616161"}}
                onClick={() => this.openbusiness(vallet)}
                variant="contained"
                size="small"
              >
                Details
              </Button> */}
                </div>
                <Button
                 variant="contained"
                  onClick={() => this.editbusiness(vallet)}
                  className={classes.edit}
                >
                  Edit
                </Button>
                <Button
                 variant="contained"
                  onClick={() => deletevalet(vallet._id)}
                  className={classes.delete}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : null
      )
    );

    console.log(this.props.data);

    return (
      <div className="container" style={{ marginTop: 90 }}>
      
        
        <div className="row mt-4">
          <div className="col-12">
            {loading ? null : (
              <span>
                <span style={{ fontSize: "2rem" }} className="text-center mt-4">
                Valets
              </span>
              <Button
                className=" mb-4 float-right"
                variant="contained"
                onClick={this.handlePost}
              >
                Add Valet
              </Button>
              </span>
            )}
          </div>
        </div>


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
                  label="Time In"
                  {...a11yProps(0)}
                />
                <Tab
                  style={{ fontSize: ".8rem" }}
                  label="Time Out"
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
              style={{ padding: "20px 25px", textAlign: "center" }}
            >
              {modalmode === "Post" ? (
                <Typography
                  style={{ fontSize: "1.5rem" }}
                  className={classes.pageTitle}
                >
                  Add a New Valet
                </Typography>
              ) : modalmode === "Edit" ? (
                <Typography
                  style={{ fontSize: "1.5rem" }}
                  className={classes.pageTitle}
                >
                  Edit a Valet
                </Typography>
              ) : modalmode === "Open" ? (
                <Typography
                  style={{ fontSize: "1.5rem" }}
                  className={classes.pageTitle}
                >
                  Your Valet
                </Typography>
              ) : null}
              {modalmode === "Open" ? (
                <>
                  <Typography variant="h6" className="mt-2 ">
                    Car Number - {this.state.carNumber}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Owner Name - {this.state.ownerName}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Driver Name - {this.state.driverName}
                  </Typography>
                </>
              ) : (
                <form onSubmit={this.handleSubmit}>
                  <TextField
                    name="carNumber"
                    type="carNumber"
                    label="Car Licence Number"
                    className={classes.TextField}
                    value={this.state.carNumber}
                    onChange={this.handleChange}
                    fullWidth
                    required={true}
                  />
                  <TextField
                    name="ownerName"
                    type="ownerName"
                    label="Name of the owner"
                    className={classes.TextField}
                    value={this.state.ownerName}
                    onChange={this.handleChange}
                    fullWidth
                    required={true}
                  />
                  <TextField
                    name="driverName"
                    type="driverName"
                    label="Name of the driver"
                    className={classes.TextField}
                    value={this.state.driverName}
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
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Valets));
