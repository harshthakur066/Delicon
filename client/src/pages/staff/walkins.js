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
  getwalkins,
  deletewalkin,
  postwalkins,
  editwalkin,
  walkout
} from "../../redux/actions/dataActions";
import { RiEdit2Line } from "react-icons/ri";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const styles = {
  bodycard: {
    margin: 5,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#F5F5F5", //card-bg-color
    boxShadow: "0px 2px 4px 0px grey",
    "&:hover": {
      transition: "(0.4s)",
      boxShadow: "0px 6px 8px 2px grey",
    },
  },
  fr: {
    float: "right",
    '@media (min-width: 320px) and (max-width: 480px)' : {
      float: "none",
    }
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
    top: "15%",
    left: "10%",
    right: "10%",
    bottom:"5%",
    backgroundColor: "white",
    borderRadius: "20px",
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
  getwalkins,
  deletewalkin,
  postwalkins,
  editwalkin,
  walkout
};

class Walkins extends Component {
  state = {
    modalmode: null,
    _id: "",
    name: "",
    email: "",
    mobno: "",
    address: "",
    seats:"",
    walkIn:"",
    walkOut:"",
    value: 0, // used in Tabs
    btnload: false,
    loading: true,
    postmodal: false,
  };

  handleMe = (event, newValue) => { //used in Tabs
    this.setState({
      value : newValue
    });   
   };

  componentDidMount() {
    this.props.getwalkins();
    }

  componentWillReceiveProps(newProps) {
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
      seats:""
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
      seats:this.state.seats,
      ownerId: this.props.user.profile.ownerId,
      businessId: this.props.user.profile.businessId,
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

  editbusiness = (business) => {
    this.setState({
      name: business.name,
      email: business.email,
      address: business.address,
      mobno: business.mobno,
      seats:business.seats,
      ownerId: this.props.user.profile.ownerId,
      businessId: this.props.user.profile.businessId,
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
      seats:business.seats,
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

    const { classes, deletewalkin, walkout } = this.props; //WithStyles Material Thing

//Tab 1
    const markup1 = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.staff.walkins.map((walkin, index) => (
        (walkin.walkIn !== undefined && walkin.walkOut === undefined
          
          ?
        <div key={index} className="col-12 mb-4">
          <Card className={classes.bodycard}>
            <CardContent>
              <Typography variant="h6" component="h6" >
                Name - {walkin.name}{" "}
                <div className={classes.fr}>
                  Seats -  
                {" " + walkin.seats}
              </div>{" "}
              
                <div> Mobile No. - {walkin.mobno}</div>{" "}
                <div>  Email - {walkin.email}</div>{" "}
                <div>  Address - {walkin.address}</div>{" "}
                <br className={classes.breaker} />

               <div>  Walkin Time -  {new Date(walkin.walkIn).toLocaleString()}</div>
              </Typography>
              
              <br className={classes.breaker} />
              <div className = "float-left mb-2">
                  {/* <Button
                   style={{color:"#616161"}} 
                    onClick={() => this.openbusiness(walkin)}
                    variant="contained"
                  size="small"
                           >
                     Details
                        </Button> */}
               
                 </div>

            <div className = "text-center">
              <Button
              style={{color:"#616161"}} 
              onClick={() => walkout(walkin._id)}
              variant="contained"
              size="small"
            >
              WalkOut
            </Button>
               
            </div>
            <br className={classes.breaker} />

            </CardContent>
            <RiEdit2Line
              size={25}
              onClick={() => this.editbusiness(walkin)}
              className={classes.edit}
            ></RiEdit2Line>
            <DeleteIcon
              size={25}
              onClick={() => deletewalkin(walkin._id)}
              className={classes.delete}
            />
          </Card>
        </div>
        : null
        )
      ))
    );

    // Tab 2
    const markup2 = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.staff.walkins.map((walkin, index) => (
        (walkin.walkIn !== undefined && walkin.walkOut !== undefined
          
          ?

        <div key={index} className="col-12 mb-4">
          <Card className={classes.bodycard}>
            <CardContent>
            <Typography variant="h6" component="h6" >
                Name - {walkin.name}{" "}
                <div className={classes.fr}>
                  Seats -  
                {" " + walkin.seats}
              </div>{" "}
              <br className={classes.breaker} />
                <div> Mobile No. - {walkin.mobno}</div>{" "}
                <div>  Email - {walkin.email}</div>{" "}
                <div>  Address - {walkin.address}</div>{" "}
                <br className={classes.breaker} />
                <div>  Walkin Time -  {new Date(walkin.walkIn).toLocaleString()}</div>
                <div>  Walkout Time -  {new Date(walkin.walkOut).toLocaleString()}</div>
              </Typography>

              <div className = "text-center mt-2 ">
              {/* <Button
              style={{color:"#616161"}} 
              onClick={() => this.openbusiness(walkin)}
              variant="contained"
              size="small"
            >
              Details
            </Button> */}
               
            </div>
            </CardContent>
            <RiEdit2Line
              size={25}
              onClick={() => this.editbusiness(walkin)}
              className={classes.edit}
            ></RiEdit2Line>
            <DeleteIcon
              size={25}
              onClick={() => deletewalkin(walkin._id)}
              className={classes.delete}
            />
          </Card>
        </div>
        : null
        )
      ))
    );

    console.log(this.props.data);

    return (
      <div className="container" style={{ marginTop: 90 }}>
        <h1 className="text-center mt-4">
          Walkins
          </h1>

{/* TABS */}

<div  className="row mt-4">
<div  className={classes.root}>
<AppBar style = {{backgroundColor:"#3f51b5"}} position="static" >
      <Tabs style = {{}} TabIndicatorProps={{style: {background:'#F5F5F5'}}} value={this.state.value} onChange={this.handleMe} variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          >
        <Tab label="WalkIn" {...a11yProps(0)} />
        <Tab label="WalkOut" {...a11yProps(1)} /> 
      </Tabs>
    </AppBar>
    </div>
    </div>

{/* ADD */}
    <div className="row mt-4">
            <div className="col-12" >
          {loading ? null : (
            <Button
            className="mb-4 float-right"
              variant="contained"
              onClick={this.handlePost}
            >
              Add Walkin
            </Button>
          )}
          </div>
          </div>
          {/* ADD */}

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
                <Typography variant="h4" className={classes.pageTitle}>
                  Add a New Walkin
                </Typography>
              ) : modalmode === "Edit" ? (
                <Typography variant="h4" className={classes.pageTitle}>
                  Edit a Walkin
                </Typography>
              ) : modalmode === "Open" ? (
                <Typography variant="h4" className={classes.pageTitle}>
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
                    Address - {this.state.address}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
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
                    label="Location.."
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
                    type="seats"
                    label="Seats.."
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
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Walkins));
