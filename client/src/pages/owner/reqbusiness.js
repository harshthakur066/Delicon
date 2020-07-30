import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getreqbusinesses,
  postbusiness,
  deletereqbusiness,
  editreqbusiness
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

// Request Business Page for owner to request new Business from super Admin

const mapStatetoprops = (state) => ({
  UI: state.UI,
  data: state.data,
});

const mapDispatchtoProps = {
  postbusiness,
  deletereqbusiness,
  getreqbusinesses,
  editreqbusiness
};

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
    padding:"5px",
    float: "right",
    color: "white",
    cursor: "pointer",
    backgroundColor:"#f44336",
    "&:hover": {
      backgroundColor:"#f44336",
    },
  },
  edit: {
    float: "left",
    color: "white",
    cursor: "pointer",
    backgroundColor:"#2196F3",
    padding:"5px",
    "&:hover": {
      backgroundColor:"#2196F3",
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
    top: "8%",
    left: "15%",
    right: "15%",
    bottom: "15%",
    backgroundColor: "white",
    borderRadius: "20px",
    border: "0px",
    width: "auto",
    outline: "none",
    padding: "10px 10px",
  },
  details: {
    padding:"5px",
    color:"#37474F",
    backgroundColor: "#BDBDBD",
    "@media (min-width: 320px) and (max-width: 480px)": {
      marginLeft: "5px",
    },
  }
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
    document.body.style.backgroundColor = "#F0F2FE";
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
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
    if (this.state.modalmode === "Post") {
      this.props.postbusiness(userData, this.doneLoading);
    } else {
      this.props.editreqbusiness(userData, this.state._id);
      this.doneLoading();
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

    const markup = loading || this.props.data.owner.reqbusinesses === undefined ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.owner.reqbusinesses.map((business, index) => (
        <div key={index} className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-6 mb-4 text-left">
          <Card className={classes.cardStyle} variant="outlined">
            <CardContent>
              <Typography
                style={{ color: "#070707", fontSize: "1.00rem" }}
                gutterBottom
              >
                {business.name}
              </Typography>
              <Typography style={{ color: "#455A64", fontSize: "0.8rem" }}>
                {business.details}
              </Typography>
              <Typography style={{ color: "#455A64", fontSize: "0.8rem" }}>
                Status - {business.status}
              </Typography>

              
              <div className="text-center mt-2">
              <Button
                  variant="contained"
                  className={classes.edit}
                  onClick={() => this.editbusiness(business)}
                  >
                  Edit
              </Button>
                <Button
                  onClick={() => this.openbusiness(business)}
                  variant="contained"
                  size="small"
                  className={classes.details}
                >
                  Details
                </Button>
                <Button
                     onClick={() => deletereqbusiness(business._id)}
                     className={classes.delete}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
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
               Requested Businesses{" "}
             </span>
              <Button
                className="mb-4 float-right"
                variant="contained"
                onClick={this.handlePost}
              >
                Request business
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
            <div className="container" style={{ padding: "20px 25px", textAlign: "center" }}>
              {modalmode === "Post" ? (
                <Typography
                  style={{ fontSize: "1.5rem" }}
                  className={classes.pageTitle}
                >
                  Request a new Business
                </Typography>
              ) : modalmode === "Edit" ? (
                <Typography
                  style={{ fontSize: "1.5rem" }}
                  className={classes.pageTitle}
                >
                  Edit a Business Request
                </Typography>
              ) : modalmode === "Open" ? (
                <Typography
                  style={{ fontSize: "1.5rem" }}
                  className={classes.pageTitle}
                >
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
                    label="Description"
                    className={classes.TextField}
                    value={this.state.details}
                    onChange={this.handleChange}
                    multiline
                    rows={1}
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
