import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getbusinesses,
  deletebusiness,
  editbusiness,
} from "../../redux/actions/dataActions";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
  Modal,
  TextField,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";

//Store se Jo chije chahiye (data, user, UI) wo lele isme se
const mapStatetoprops = (state) => ({
  UI: state.UI,
  data: state.data,
});

//jo bhi action chahiye use import kr aur isme dalde
const mapDispatchtoProps = {
  getbusinesses,
  deletebusiness,
  editbusiness,
};

//inline styles likhne ke liye withStyles use krle Material UI se
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
      boxShadow: "1px 4px 6px 2px grey",
    },
  },

  root: {
    height: "175px",
    width: "250px",
    background: "F6F7FE",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
  btnView: {
    "@media (min-width: 320px) and (max-width: 480px)": {
      width: "70%",
    },
  },
  delete: {
    float: "left",
    color: "white",
    cursor: "pointer",
    marginRight: "5px",
    backgroundColor: "#f44336",
    "&:hover": {
      backgroundColor: "#f44336",
    },
  },
  edit: {
    float: "left",
    color: "white",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    marginRight: "5px",
    "&:hover": {
      backgroundColor: "#2196F3",
    },
  },
  analytics: {
    float: "left",
    color: "white",
    cursor: "pointer",
    marginRight: "5px",
    backgroundColor: "#F7BB0F",
    "&:hover": {
      backgroundColor: "#F7BB0F",
    },
    "@media (min-width: 320px) and (max-width: 480px)": {
      margin: "5px",
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
    top: "15%",
    left: "20%",
    right: "20%",
    bottom: "15%",
    backgroundColor: "white",
    borderRadius: "20px",
    border: "0px",
    width: "auto",
    outline: "none",
  },
  side: {
    float: "right",
    "@media (min-width: 320px) and (max-width: 480px)": {
      marginTop: "8px",
    },
  },
};

class Businesses extends Component {
  //Loading component wise handel krenge. Ye componenet ko data load krna padta hai staring mai hi
  //so loding ko true rakhenge start me hi.
  state = {
    modalmode: null,
    _id: "",
    loading: true,
    btnload: false,
    postmodal: false,
    name: "",
    owner: "",
    address: "",
    details: "",
  };

  componentDidMount() {
    this.props.getbusinesses();
    document.body.style.backgroundColor = "#F0F2FE";
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data.owner.businesses !== undefined) {
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

  handleOpen = () => {
    this.setState({
      modalmode: "Edit",
      postmodal: true,
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
      owner: this.state.owner,
      address: this.state.address,
      details: this.state.details,
    };
    if (this.state.modalmode === "Post") {
      this.props.postbusiness(userData, this.doneLoading);
    } else {
      this.props.editbusiness(userData, this.doneLoading, this.state._id);
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  doneLoading = () => {
    this.setState({
      btnload: false,
      postmodal: false,
    });
  };

  editbusiness = (business) => {
    this.setState({
      name: business.name,
      owner: business.owner,
      address: business.address,
      details: business.details,
      modalmode: "Edit",
      _id: business._id,
    });
    this.handleOpen();
  };

  render() {
    const { classes, deletebusiness } = this.props;

    const loading = this.state.loading;
    const btnload = this.state.btnload;
    const modlemode = this.state.modalmode;

    console.log(this.props.data.owner.businesses);

    const markup =
      loading || this.props.data.owner.businesses === undefined ? (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        this.props.data.owner.businesses.map((business, index) => (
          <div
            key={index}
            className="col-12 col-sm-12 col-xs-12 col-md-12 col-lg-6 mb-4"
          >
            <Card className={classes.cardStyle} variant="outlined">
              <CardContent>
                <Typography>
                  <span style={{ fontSize: "1.25rem" }}> {business.name} </span>
                  <span style={{ float: "right" }}>
                    <Button
                      component={Link}
                      variant="contained"
                      color="inherit"
                      size="small"
                      to={`/feedBack/${business._id}`}
                      className={classes.side}
                    >               
                      <span style={{ width: "80px", textAlign: "center" }}>
                      FeedBack
                      </span>
                    </Button>
                  </span>
                </Typography>
                <br></br>
                <Typography style={{ fontSize: "1rem" }}>
                  {business.details}
                  <span style={{ float: "right" }}>
                    <Button
                      component={Link}
                      variant="contained"
                      color="inherit"
                      size="small"
                      to={`/staffs/${business._id}`}
                      className={classes.side}
                    >
                      <span style={{ width: "80px", textAlign: "center" }}>
                        Staff
                      </span>
                    </Button>
                  </span>
                </Typography>
                <br></br>
                <Typography style={{ fontSize: "1rem" }}>
                  {business.address}
                  <span style={{ float: "right" }}>
                    <Button
                      component={Link}
                      variant="contained"
                      color="inherit"
                      size="small"
                      to={`/menu/${business._id}`}
                      className={classes.side}

                    >
                      <span style={{ width: "80px", textAlign: "center" }}>
                        Menu
                      </span>
                    </Button>
                  </span>
                </Typography>
                <br></br>

                <Typography style={{ fontSize: "1rem" }}>
                  <div className={classes.btnView}>
                    <Button
                      variant="contained"
                      onClick={() => this.editbusiness(business)}
                      className={classes.edit}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => deletebusiness(business._id)}
                      className={classes.delete}
                    >
                      Delete
                    </Button>
                    <Button
                      component={Link}
                      style={{ color: "white" }}
                      variant="contained"
                      to={`/businesses/${business._id}`}
                      className={classes.analytics}
                    >
                      <span style={{ color: "white" }}>Analytics</span>
                    </Button>
                    {/* <Button
                      component={Link}
                      style={{ color: "white" }}
                      variant="contained"
                      to={`/feedbacklist/${business._id}`}
                      className={classes.analytics}
                    >
                      <span style={{ color: "white" }}>Feedbacks List</span>
                    </Button> */}
                  </div>
                  <span style={{ float: "right" }}>
                    <Button
                      component={Link}
                      variant="contained"
                      color="inherit"
                      size="small"
                      to={`/service/${business._id}`}
                      className={classes.side}

                    >
                      <span style={{ width: "80px", textAlign: "center" }}>
                        Services
                      </span>
                    </Button>
                  </span>
                </Typography>

                <br></br>
              </CardContent>
            </Card>
          </div>
        ))
      );
    return (
      <div className="container" style={{ marginTop: 90 }}>
        <p style={{ fontSize: "2rem" }} className="text-left mt-4">
          Your Businesses
        </p>
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
              {modlemode === "Post" ? (
                <Typography
                  className={classes.pageTitle}
                  style={{ textAlign: "center", fontSize: "1.3rem" }}
                >
                  Request a New Business
                </Typography>
              ) : (
                <Typography
                  className={classes.pageTitle}
                  style={{ textAlign: "center", fontSize: "1.3rem" }}
                >
                  Edit a Business
                </Typography>
              )}
              <form onSubmit={this.handleSubmit}>
                <TextField
                  name="name"
                  type="name"
                  label="Name of the business"
                  className={classes.TextField}
                  value={this.state.name}
                  onChange={this.handleChange}
                  fullWidth
                  required={true}
                />
                <TextField
                  name="owner"
                  type="owner"
                  label="Owner Name"
                  className={classes.TextField}
                  value={this.state.owner}
                  onChange={this.handleChange}
                  fullWidth
                  required={true}
                />
                <TextField
                  name="address"
                  type="address"
                  label="Location of the business"
                  className={classes.TextField}
                  value={this.state.address}
                  onChange={this.handleChange}
                  fullWidth
                  required={true}
                />
                <TextField
                  name="details"
                  type="details"
                  label="Detailed description of the business"
                  className={classes.TextField}
                  value={this.state.details}
                  onChange={this.handleChange}
                  multiline
                  rows={3}
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
                    <CircularProgress size={30} className={classes.progress} />
                  )}
                </Button>
              </form>
            </div>
          </div>
        </Modal>
        <div className="row mt-4">{markup}</div>
      </div>
    );
  }
}

export default connect(
  mapStatetoprops,
  mapDispatchtoProps
)(withStyles(styles)(Businesses));
