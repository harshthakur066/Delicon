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
  getvalets,
  deletevalet,
  postvalets,
  editvalets,
} from "../../redux/actions/dataActions";
import EditIcon from "@material-ui/icons/Edit";

const styles = {
  bodycard: {
    margin: 5,
    marginBottom: "2rem",
    paddingLeft: 30,
    paddingRight: 30,
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
  getvalets,
  deletevalet,
  postvalets,
  editvalets,
};

class Valets extends Component {
  state = {
    modalmode: "",
    _id: "",
    carNumber: "",
    ownerName: "",
    driverName: "",
    loading: true,
    btnload: false,
    postmodal: false,
  };

  componentDidMount() {
    this.props.getvalets();
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

    const { classes, deletevalet } = this.props; //WithStyles Material Thing

    const markup = loading ? (
      <p>Loading</p>
    ) : (
      this.props.data.staff.valets.map((vallet, index) => (
        <div key={index} className="col-12 mb-4">
          <Card className={classes.bodycard}>
            <CardContent>
              <Typography>
                Name - {vallet.ownerName}{" "}
                <span className={classes.fr}>Car No - {vallet.carNumber}</span>{" "}
              </Typography>
              <br className={classes.breaker} />
              <Typography>Driver Name - {vallet.driverName} </Typography>
              <EditIcon
                onClick={() => this.editbusiness(vallet)}
                className={classes.edit}
              ></EditIcon>
              <DeleteIcon
                onClick={() => deletevalet(vallet._id)}
                className={classes.delete}
              />
              <Button
                onClick={() => this.openbusiness(vallet)}
                variant="constained"
                size="small"
                className={classes.delete}
              >
                Details
              </Button>
            </CardContent>
          </Card>
        </div>
      ))
    );

    console.log(this.props.data);

    return (
      <div className="container">
        <h1 className="text-center mt-4">
          Valets{" "}
          <Button
            variant="contained"
            className="float-right mt-3"
            onClick={this.handlePost}
          >
            Add Valet
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
)(withStyles(styles)(Valets));
