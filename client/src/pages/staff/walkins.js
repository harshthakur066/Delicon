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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  getwalkins,
  deletewalkin,
  postwalkins,
  editwalkin,
} from "../../redux/actions/dataActions";
import EditIcon from "@material-ui/icons/Edit";

const styles = {
  bodycard: {
    margin: 5,
    marginBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,
  },
  fr: {
    float: "right",
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
    left: "30%",
    backgroundColor: "white",
    borderRadius: "40px",
    border: "0px",
    width: "40%",
    outline: "none",
  },
};

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
};

class Walkins extends Component {
  state = {
    modalmode: null,
    _id: "",
    name: "",
    email: "",
    mobno: "",
    address: "",
    btnload: false,
    loading: true,
    postmodal: false,
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
    });
  };

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
      email: this.state.email,
      address: this.state.address,
      mobno: this.state.mobno,
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
      ownerId: this.props.user.profile.ownerId,
      businessId: this.props.user.profile.businessId,
      modalmode: "Edit",
      _id: business._id,
    });
    this.handleOpen();
  };

  render() {
    const loading = this.state.loading;
    const btnload = this.state.btnload;
    const modlemode = this.state.modalmode;

    const { classes, deletewalkin } = this.props; //WithStyles Material Thing

    const markup = loading ? (
      <p>Loading</p>
    ) : (
      this.props.data.staff.walkins.map((walkin, index) => (
        <div key={index} className="col-12 mb-4">
          <Card className={classes.bodycard}>
            <CardContent>
              <Typography>
                Name - {walkin.name}{" "}
                <span className={classes.fr}>Mobile No - {walkin.mobno}</span>{" "}
              </Typography>
              <br className={classes.breaker} />
              <Typography>
                Email - {walkin.email}{" "}
                <span className={classes.fr}>Address - {walkin.address}</span>
              </Typography>
            </CardContent>
            <EditIcon
              onClick={() => this.editbusiness(walkin)}
              className={classes.edit}
            ></EditIcon>
            <DeleteIcon
              onClick={() => deletewalkin(walkin._id)}
              className={classes.delete}
            />
          </Card>
        </div>
      ))
    );

    console.log(this.props.data);

    return (
      <div className="container">
        <h1 className="text-center mt-4">
          Walkins{" "}
          <Button
            variant="contained"
            className="float-right mt-3"
            onClick={this.handlePost}
          >
            Add Walkin
          </Button>
        </h1>
        <Modal
          open={this.state.postmodal}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.modlebox}>
            <div className="container" style={{ padding: "50px 100px" }}>
              {modlemode === "Post" ? (
                <Typography variant="h4" className={classes.pageTitle}>
                  Add a New Walkin
                </Typography>
              ) : (
                <Typography variant="h4" className={classes.pageTitle}>
                  Edit a Walkin
                </Typography>
              )}
              <form onSubmit={this.handleSubmit}>
                <TextField
                  name="name"
                  type="name"
                  label="Name of the customer"
                  className={classes.TextField}
                  value={this.state.name}
                  onChange={this.handleChange}
                  fullWidth
                  required={true}
                />
                <TextField
                  name="mobno"
                  type="mobno"
                  label="Mobile Number of the customer"
                  className={classes.TextField}
                  value={this.state.mobno}
                  onChange={this.handleChange}
                  fullWidth
                  required={true}
                />
                <TextField
                  name="address"
                  type="address"
                  label="Location of the customer"
                  className={classes.TextField}
                  value={this.state.address}
                  onChange={this.handleChange}
                  fullWidth
                  required={true}
                />
                <TextField
                  name="email"
                  type="email"
                  label="Email of the customer"
                  className={classes.TextField}
                  value={this.state.email}
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
                    <CircularProgress size={30} className={classes.progress} />
                  )}
                </Button>
              </form>
            </div>
          </div>
        </Modal>
        <div className="container">
          <div className="row mt-4">{markup}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Walkins));
