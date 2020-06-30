import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getreqbusinesses,
  postbusiness,
  deletereqbusiness,
} from "../../redux/actions/dataActions";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Modal,
  TextField,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";

const mapStatetoprops = (state) => ({
  UI: state.UI,
  data: state.data,
});

const mapDispatchtoProps = {
  postbusiness,
  deletereqbusiness,
  getreqbusinesses,
};

const styles = {
  cardStyle: {
    display: "block",
    width: "100%",
    height: "auto",
    marginBottom: "2rem",
    backgroundColor: "#F5F5F5", //card-bg-color
    boxShadow: "0px 2px 4px 0px grey",
    "&:hover": {
      transition: "(0.4s)",
      boxShadow: "0px 4px 6px 2px grey",
    },
  },

  actions: {
    margin: "auto",
    width: "50%",
    "@media (min-width:780px)": {
      margin: "auto",
      width: "15%",
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
  delete: {
    float: "right",
    color: "red",
    cursor: "pointer",
  },
  edit: {
    float: "left",
    color: "blue",
    cursor: "pointer",
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
    top: "5%",
    left: "10%",
    right: "10%",
    bottom: "5%",
    backgroundColor: "white",
    borderRadius: "20px",
    border: "0px",
    width: "auto",
    outline: "none",
    height: "90%",
    padding: "20px 20px",
    overflowY: "scroll",
  },
};

class Businesses extends Component {
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
    this.props.getreqbusinesses();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.owner.reqbusinesses !== undefined) {
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
      owner: "",
      address: "",
      details: "",
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
    this.props.postbusiness(userData, this.doneLoading);
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
      postmodal: true,
    });
  };

  openbusiness = (business) => {
    this.setState({
      name: business.name,
      owner: business.owner,
      address: business.address,
      details: business.details,
      modalmode: "Open",
      _id: business._id,
      postmodal: true,
    });
  };

  render() {
    const { classes, deletereqbusiness } = this.props;

    const loading = this.state.loading;
    const btnload = this.state.btnload;
    const modalmode = this.state.modalmode;

    const markup = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.owner.reqbusinesses.map((business, index) => (
        <div key={index} className="col-12 text-center">
          <Card className={classes.cardStyle} variant="outlined">
            <CardContent>
              <Typography
                variant="h5"
                component="h5"
                style={{ color: "#070707" }}
                gutterBottom
              >
                {business.name}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                style={{ color: "#455A64" }}
              >
                {business.details}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                style={{ color: "#455A64" }}
              >
                Status - {business.status}
              </Typography>
              <div className="text-center pb-4">
                <Button
                  style={{ color: "#616161" }}
                  onClick={() => this.openbusiness(business)}
                  variant="contained"
                  size="small"
                  className={classes.edit}
                >
                  Details
                </Button>
                <DeleteIcon
                  size="25"
                  onClick={() => deletereqbusiness(business._id)}
                  className={classes.delete}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      ))
    );
    return (
      <div className="container" style={{ marginTop: 90 }}>
        <h1 className="text-center mt-4">Requested Businesses </h1>
        <div className="row mt-4">
          <div className="col-12">
            {loading ? null : (
              <Button
                className="mb-4 float-right"
                variant="contained"
                onClick={this.handlePost}
              >
                Request business
              </Button>
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
            <div className="container">
              {modalmode === "Post" ? (
                <Typography variant="h4" className={classes.pageTitle}>
                  Request a new Business
                </Typography>
              ) : modalmode === "Edit" ? (
                <Typography variant="h4" className={classes.pageTitle}>
                  Edit a Business Request
                </Typography>
              ) : modalmode === "Open" ? (
                <Typography variant="h4" className={classes.pageTitle}>
                  Your Business
                </Typography>
              ) : null}
              {modalmode === "Open" ? (
                <>
                  <Typography variant="h6" className="mt-2 ">
                    Business Name - {this.state.name}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Owner Name - {this.state.owner}
                  </Typography>
                  <Typography variant="h6" className="mt-2 ">
                    Address - {this.state.address}
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
        <div className="row mt-4 text-center ">{markup}</div>
      </div>
    );
  }
}

export default connect(
  mapStatetoprops,
  mapDispatchtoProps
)(withStyles(styles)(Businesses));
