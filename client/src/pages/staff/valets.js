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
import DeleteIcon from "@material-ui/icons/Delete";
import {
  getvalets,
  deletevalet,
  postvalets,
  editvalets,
  valetstimeout,
} from "../../redux/actions/dataActions";
import { RiEdit2Line } from "react-icons/ri";


import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const styles = {
  bodycard: {
    margin: 5,
    marginBottom: "2rem",
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: "#F5F5F5", //card-bg-color
    boxShadow: "0px 2px 4px 0px grey",
    "&:hover": {
      transition: "(0.4s)",
      boxShadow: "0px 6px 8px 2px grey",
    },
  },
  edit: {
    float: "left",
    color: "blue",
    cursor: "pointer",
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
    color: "red",
    cursor: "pointer",
    marginBottom: "1rem",
  },
  root: {
    margin:"auto",
    textAlign:"center",
    flexGrow: 0
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
    bottom:"5%",
    backgroundColor: "white",
    borderRadius: "30px",
    border: "0px",
    width: "auto",
    outline: "none",
    overflowY: "scroll",
    
  },
};

function TabPanel (props)  {
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
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
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
  valetstimeout
};

class Valets extends Component {
  state = {
    modalmode: "",
    _id: "",
    carNumber: "",
    ownerName: "",
    driverName: "",
    value:0,
    timeIn:"",
    timeOut:"",
    loading: true,
    btnload: false,
    postmodal: false,
  };


  handleMe = (event, newValue) => { //used in Tabs
    this.setState({
      value : newValue
    });   
   };

  componentDidMount() {
    this.props.getvalets();
    document.body.style.backgroundColor = "#F0F2FE"

  }

  componentWillReceiveProps(nextProps) {
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
      businessId: this.props.user.profile.businessId,
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
      businessId: this.props.user.profile.businessId,
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
      businessId: this.props.user.profile.businessId,
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
      this.props.data.staff.valets.map((vallet, index) => (

        (vallet.timeIn !== undefined && vallet.timeOut === undefined
          
          ?

        <div key={index} className="col-12 mb-4">
          <Card className={classes.bodycard}>
            <CardContent>
              <Typography variant="h6" component="h6">
                Name - {vallet.ownerName} <div>Car No - {vallet.carNumber}</div>{" "}
              </Typography>
              <Typography variant="h6" component="h6" >Driver Name - {vallet.driverName} </Typography>
              <br className={classes.breaker} />

              <Typography variant="h6" component="h6" >Time In - {new Date(vallet.timeIn).toLocaleString()} </Typography>

              <div className = "text-center mt-2 ">
              {/* <Button
                style = {{color:"#616161"}}
                onClick={() => this.openbusiness(vallet)}
                variant="contained"
                size="small"
              >
                Details
              </Button> */}
              </div>
              <div className = "text-center mt-2 ">
              <Button
                style = {{color:"#616161"}}
                onClick={() => valetstimeout(vallet._id)}
                variant="contained"
                size="small"
              >
                TimeOut
              </Button>
              </div>
              <RiEdit2Line
                size={25}
                onClick={() => this.editbusiness(vallet)}
                className={classes.edit}
              ></RiEdit2Line>
              <DeleteIcon
                size={25}
                onClick={() => deletevalet(vallet._id)}
                className={classes.delete}
              />
            </CardContent>
          </Card>
        </div>
        : null
      ))
    )
    )
    const markup2 = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.staff.valets.map((vallet, index) => (

        (vallet.timeIn !== undefined && vallet.timeOut !== undefined
          
          ?

        <div key={index} className="col-12 mb-4">
          <Card className={classes.bodycard}>
            <CardContent>
              <Typography variant="h6" component="h6">
                Name - {vallet.ownerName} <div>Car No - {vallet.carNumber}</div>{" "}
              </Typography>
              <Typography variant="h6" component="h6" >Driver Name - {vallet.driverName} </Typography>
              <br className={classes.breaker} />

              <Typography variant="h6" component="h6" >Time In - {new Date(vallet.timeIn).toLocaleString()} </Typography>
              <Typography variant="h6" component="h6" >Time Out - {new Date(vallet.timeOut).toLocaleString()} </Typography>

              <div className = "text-center ">
              {/* <Button
                style = {{color:"#616161"}}
                onClick={() => this.openbusiness(vallet)}
                variant="contained"
                size="small"
              >
                Details
              </Button> */}
              </div>
              <RiEdit2Line
                size={25}
                onClick={() => this.editbusiness(vallet)}
                className={classes.edit}
              ></RiEdit2Line>
              <DeleteIcon
                size={25}
                onClick={() => deletevalet(vallet._id)}
                className={classes.delete}
              />
            </CardContent>
          </Card>
        </div>
        : null
      ))
    )
    )

    console.log(this.props.data);

    return (
      <div className="container" style={{ marginTop: 90 }}>
        <h1 className="text-center mt-4">
          Valets
          </h1>

          {/* TABS */}

<div  className="row mt-4">
<div  className={classes.root}>
<AppBar style = {{backgroundColor:"#3f51b5"}} position="static" >
      <Tabs TabIndicatorProps={{style: {background:'#F5F5F5'}}} value={this.state.value} onChange={this.handleMe} variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          >
        <Tab label="Time In" {...a11yProps(0)} />
        <Tab label="Time Out" {...a11yProps(1)} /> 
      </Tabs>
    </AppBar>
    </div>
    </div>

          <div className="row mt-4">
            <div className="col-12" >
          {loading ? null : (
            <Button
              className=" mb-4 float-right"
              variant="contained"
              
              onClick={this.handlePost}
            >
              Add Valet
            </Button>
          )}
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
            <div className="container" style={{ padding: "20px 20px" }}>
              {modalmode === "Post" ? (
                <Typography variant="h4" className={classes.pageTitle}>
                  Add a New Valet
                </Typography>
              ) : modalmode === "Edit" ? (
                <Typography variant="h4" className={classes.pageTitle}>
                  Edit a Valet
                </Typography>
              ) : modalmode === "Open" ? (
                <Typography variant="h4" className={classes.pageTitle}>
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
