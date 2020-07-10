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
  getstaffs,
  poststaff,
  editstaff,
  setnotworking,
  setworking,
} from "../../redux/actions/dataActions";

const styles = {
  cardStyle: {
    display: "block",
    width: "100%",
    height: "auto",
    marginBottom: "2rem",
    backgroundColor: "#FFFFFF", //card-bg-color
    boxShadow: "1px 2px 4px 1px grey",
    "&:hover": {
      transition: "(0.4s)",
      boxShadow: "1px 6px 8px 2px grey",
    },
  },
  root: {
    height: "175px",
    width: "250px",
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
  fr: {
    float: "right",
    "@media (min-width: 320px) and (max-width: 480px)": {
      float: "none",
    },
  },
  bodycard: {
    margin: 5,
    marginBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  breaker: {
    marginTop: 5,
    marginBottom: 5,
  },
  edit: {
    float: "left",
    color: "white",
    cursor: "pointer",
    backgroundColor:"#2196F3",
    "&:hover": {
      backgroundColor:"#2196F3",
    },
  },
  fire: {
    float: "right",
    color: "white",
    cursor: "pointer",
    margin:"2px",
    backgroundColor:"#4CAF50",
    "&:hover": {
      backgroundColor:"#4CAF50",
    },
  },
  hire: {
    float: "right",
    color: "white",
    cursor: "pointer",
    margin:"2px",
    backgroundColor:"#f44336",
    "&:hover": {
      backgroundColor:"#f44336",
    },
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
    top: "6%",
    left: "10%",
    right: "10%",
    bottom: "6%",
    backgroundColor: "white",
    borderRadius: "20px",
    border: "0px",
    width: "auto",
    outline: "none",
    height: "90%",
    overflowY: "scroll",
  },
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});

const mapDispatchToProps = {
  getstaffs,
  poststaff,
  editstaff,
  setworking,
  setnotworking,
};

class Staffs extends Component {
  state = {
    postmodal: false,
    loading: true,
    modalmode: null,
    _id: "",
    btnload: false,
    name: "",
    email: "",
    password: "",
    mobno: "",
    address: "",
    qualification: "",
    experience: "",
    position: "",
    dateOfJoining: "",
    details: "",
    errors: {},
  };

  componentDidMount() {
    const { businessid } = this.props.match.params;
    this.props.getstaffs(businessid);
    document.body.style.backgroundColor = "#F0F2FE";
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.UI.errors) {
      this.setState({
        errors: newProps.UI.errors,
        loading: false,
        btnload: false,
      });
      console.log("HERE", newProps.UI.errors);
    }
    if (newProps.data.owner.staffs !== undefined) {
      this.setState({
        loading: false,
      });
    }
  }

  handlePost = () => {
    this.setState({
      modalmode: "Post",
      postmodal: true,
      name: "",
      email: "",
      password: "",
      mobno: "",
      address: "",
      qualification: "",
      experience: "",
      position: "",
      dateOfJoining: "",
      details: "",
      business: "",
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
    const { businessid } = this.props.match.params;
    console.log(businessid);
    const busi = this.props.data.owner.businesses.find(
      (busi) => busi._id === businessid
    );
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      mobno: this.state.mobno,
      address: this.state.address,
      qualification: this.state.qualification,
      experience: this.state.experience,
      position: this.state.position,
      dateOfJoining: this.state.dateOfJoining,
      details: this.state.details,
      business: busi.name,
      businessId: businessid,
    };
    if (this.state.modalmode === "Post") {
      this.props.poststaff(userData, this.handleDone);
    } else {
      this.props.editstaff(userData, this.handleDone, this.state._id);
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
      password: business.password,
      mobno: business.mobno,
      address: business.address,
      qualification: business.qualification,
      experience: business.experience,
      position: business.position,
      dateOfJoining: business.dateOfJoining,
      details: business.details,
      modalmode: "Edit",
      _id: business._id,
      postmodal: true,
    });
  };

  openbusiness = (business) => {
    this.setState({
      name: business.name,
      email: business.email,
      password: business.password,
      mobno: business.mobno,
      address: business.address,
      qualification: business.qualification,
      experience: business.experience,
      position: business.position,
      dateOfJoining: business.dateOfJoining,
      details: business.details,
      modalmode: "Open",
      _id: business._id,
      postmodal: true,
    });
  };

  render() {
    const loading = this.state.loading;
    const btnload = this.state.btnload;
    const modalmode = this.state.modalmode;

    const { classes, setnotworking, setworking } = this.props; //WithStyles Material Thing

    const markup = loading || this.props.data.owner.staffs === undefined ? (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        this.props.data.owner.staffs.map((staff, index) => (
          <div key={index} className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-6 mb-4">
            <Card className={classes.cardStyle} variant="outlined">
              <CardContent>
                <Typography
                  // className={classes.title}
                  style={{ fontSize: "1.25rem" }}
                >
                  Name - {staff.name}
                </Typography>
                <Typography style={{ fontSize: "0.75rem" }}>
                  Postion - {staff.position}
                  <br className={classes.breaker} />
                  {staff.working ? (
                    <span className={classes.fr}> Currently Working </span>
                  ) : (
                    <span className={classes.fr}> Currently Not working </span>
                  )}
                </Typography>

                <Typography style={{ fontSize: "0.75rem" }}>
                  {staff.experience}
                </Typography>
                <Typography style={{ fontSize: "0.75rem" }}>
                  Mobile No. - {staff.mobno}
                </Typography>

                <div className="text-center mt-2 ">
                  {
                    <Button
                      style={{ color: "#616161" }}
                      onClick={() => this.openbusiness(staff)}
                      variant="contained"
                      size="small"
                    >
                      Details
                    </Button>
                  }
                </div>
              </CardContent>
              <Button
              style = {{textAlign:"center"}}
              variant="contained"
                onClick={() => this.editbusiness(staff)}
                className={classes.edit}
              >
                Edit
              </Button>
              <Button
              style = {{textAlign:"center"}}
               variant="contained"
                onClick={() => setnotworking(staff._id)}
                className={classes.hire}
              >
                Fire
              </Button>
              <Button
              variant="contained"
                onClick={() => setworking(staff._id)}
                className={classes.fire}
              >
                Hire
              </Button>
            </Card>
          </div>
        ))
      );
    
    return (
      <div className="container" style={{ marginTop: 90 }}>
        <div className="row mt-4">
          <div className="col-12">
            {loading ? null : (
              <span>
              <span
                style={{ fontSize: "2rem" }} className="text-left mt-4">
          Your Staff
             </span>
              <Button
                className="mb-4 float-right"
                variant="contained"
                onClick={this.handlePost}
              >
                Add Staff
              </Button>
              </span>
            )}
          </div>
        </div>


        <Modal
          open={this.state.postmodal}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.modlebox}>
            <div
              className="container"
              style={{ padding: "10px 15px", textAlign: "center" }}
            >
              {modalmode === "Post" ? (
                <Typography
                  className={classes.pageTitle}
                  style={{ textAlign: "center", fontSize: "1.5rem" }}
                >
                  Add a New Staff
                </Typography>
              ) : modalmode === "Edit" ? (
                <Typography
                  className={classes.pageTitle}
                  style={{ textAlign: "center", fontSize: "1.5rem" }}
                >
                  Edit a Staff
                </Typography>
              ) : modalmode === "Open" ? (
                <Typography
                  className={classes.pageTitle}
                  style={{ textAlign: "center", fontSize: "1.5rem" }}
                >
                  Staff Details
                </Typography>
              ) : null}
              {modalmode === "Open" ? (
                <>
                  <Typography variant="h6" className="mt-2 ">
                    Name - {this.state.name}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Email - {this.state.email}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Mobile No - {this.state.mobno}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Address - {this.state.address}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Qualification - {this.state.qualification}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Experience - {this.state.experience}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Position - {this.state.position}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Date of Joining - {this.state.dateOfJoining}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Details - {this.state.details}
                  </Typography>
                </>
              ) : (
                <form onSubmit={this.handleSubmit}>
                  <TextField
                    name="name"
                    type="name"
                    label="Name of the Staff"
                    className={classes.TextField}
                    value={this.state.name}
                    onChange={this.handleChange}
                    fullWidth
                    required={true}
                  />
                  <TextField
                    name="mobno"
                    type="mobno"
                    label="Mobile Number of the Staff"
                    className={classes.TextField}
                    value={this.state.mobno}
                    onChange={this.handleChange}
                    fullWidth
                    required={true}
                  />
                  <TextField
                    name="address"
                    type="address"
                    label="Location of the Staff"
                    className={classes.TextField}
                    value={this.state.address}
                    onChange={this.handleChange}
                    fullWidth
                    required={true}
                  />
                  <TextField
                    name="email"
                    type="email"
                    label="Email of the Staff"
                    className={classes.TextField}
                    value={this.state.email}
                    onChange={this.handleChange}
                    fullWidth
                    required={true}
                  />
                  {modalmode === "Post" ? (
                    <TextField
                      name="password"
                      type="password"
                      label="Password for the Staff"
                      className={classes.TextField}
                      value={this.state.password}
                      onChange={this.handleChange}
                      fullWidth
                      required={true}
                    />
                  ) : null}
                  <TextField
                    name="qualification"
                    type="qualification"
                    label="Qualification of the Staff"
                    className={classes.TextField}
                    value={this.state.qualification}
                    onChange={this.handleChange}
                    fullWidth
                    required={true}
                  />
                  <TextField
                    name="experience"
                    type="experience"
                    label="Experience of the staff"
                    className={classes.TextField}
                    value={this.state.experience}
                    onChange={this.handleChange}
                    fullWidth
                    required={true}
                  />
                  <TextField
                    name="position"
                    type="position"
                    label="Position of the Staff"
                    className={classes.TextField}
                    value={this.state.position}
                    onChange={this.handleChange}
                    fullWidth
                    required={true}
                  />
                  <TextField
                    name="dateOfJoining"
                    type="dateOfJoining"
                    label="dateOfJoining of the Staff"
                    className={classes.TextField}
                    value={this.state.dateOfJoining}
                    onChange={this.handleChange}
                    fullWidth
                    required={true}
                  />
                  <TextField
                    name="details"
                    type="details"
                    label="details of the Staff"
                    className={classes.TextField}
                    value={this.state.details}
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

        <div className="row mt-4">{markup}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Staffs));
