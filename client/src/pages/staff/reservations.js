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
  getreservations,
  deletereservation,
  postreservation,
  editreservation,
} from "../../redux/actions/dataActions";

import { RiEdit2Line } from "react-icons/ri";

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
};

const styles = {
  bodycard: {
    margin: 2,
    marginBottom: "2rem",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#8BC34A", //card-bg-color
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
    top: "13%",
    left: "10%",
    right: "10%",
    backgroundColor: "white",
    borderRadius: "40px",
    border: "0px",
    width: "auto",
    outline: "none",
  },
}; // Styles here

class Reservations extends Component {
  state = {
    modalmode: "",
    _id: "",
    name: "",
    email: "",
    mobno: "",
    address: "",
    seats: "",
    loading: true,
    btnload: false,
    postmodal: false,
  };

  componentDidMount() {
    this.props.getreservations();
  }
  componentWillReceiveProps(nextProps) {
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
      businessId: this.props.user.profile.businessId,
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
      seats: business.seats,
      ownerId: this.props.user.profile.ownerId,
      businessId: this.props.user.profile.businessId,
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

    const { classes, deletereservation } = this.props;

    const markup = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.staff.reservations.map((reservation, index) => (
        <div key={index} className="col-12 mb-4">
          <Card className={classes.bodycard}>
            <CardContent>
              <Typography>
                {reservation.name}{" "}
                <span className={classes.fr}>{reservation.mobno}</span>{" "}
              </Typography>
              <br className={classes.breaker} />

              <Typography>
                {reservation.email}{" "}
                <span className={classes.fr}>{reservation.address}</span>
              </Typography>
              <div className="text-center ">
                <Button
                  style={{ color: "#616161" }}
                  onClick={() => this.openbusiness(reservation)}
                  variant="constained"
                  size="small"
                >
                  Details
                </Button>
              </div>
            </CardContent>

            <RiEdit2Line
              size={25}
              onClick={() => this.editbusiness(reservation)}
              className={classes.edit}
            ></RiEdit2Line>

            <DeleteIcon
              size={25}
              onClick={() => deletereservation(reservation._id)}
              className={classes.delete}
            />
            <Button
              onClick={() => this.openbusiness(reservation)}
              variant="contained"
              size="small"
              className={classes.delete}
            >
              Details
            </Button>
          </Card>
        </div>
      ))
    );

    return (
      <div className="container" style={{ marginTop: 90 }}>
        <h1 className="text-center mt-4">
          Reservations
          {loading ? null : (
            <Button
              variant="contained"
              className=" mt-3 mb-3 float-right"
              onClick={this.handlePost}
            >
              Add Reservation
            </Button>
          )}
        </h1>
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
                  Add a Reservation
                </Typography>
              ) : modalmode === "Edit" ? (
                <Typography variant="h4" className={classes.pageTitle}>
                  Edit a Reservation
                </Typography>
              ) : modalmode === "Open" ? (
                <Typography variant="h4" className={classes.pageTitle}>
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

        <div className="row mt-4">{markup}</div>
      </div>
    ); //Render Data here
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Reservations));
