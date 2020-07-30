import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  editServiceCategory,
  postServiceCategory,
  deleteServiceCategory,
  getServiceCategories,
} from "../../redux/actions/dataActions";

// Service  page for business Owner

const styles = {
  bodycard: {
    margin: 5,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#FFFFFF",
    boxShadow: "1px 2px 4px 1px grey",
    "&:hover": {
      transition: "(0.4s)",
      boxShadow: "1px 6px 8px 2px grey",
    },
  },
  fr: {
    float: "right",
    "@media (min-width: 320px) and (max-width: 480px)": {
      float: "none",
    },
  },
  breaker: {
    marginTop: 5,
    marginBottom: 5,
  },
  edit: {
    float: "left",
    color: "white",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    "&:hover": {
      backgroundColor: "#2196F3",
    },
  },
  delete: {
    float: "right",
    color: "white",
    cursor: "pointer",
    marginBottom: "1.05rem",
    backgroundColor: "#f44336",
    "&:hover": {
      backgroundColor: "#f44336",
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
    top: "20%",
    left: "20%",
    right: "20%",
    bottom: "20%",
    backgroundColor: "white",
    borderRadius: "20px",
    border: "0px",
    width: "auto",
    outline: "none",
  },
  actions: {
    margin: "auto",
    width: "50%",
    "@media (min-width:780px)": {
      margin: "auto",
      width: "15%",
    },
  },
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});

const mapDispatchToProps = {
  editServiceCategory,
  postServiceCategory,
  deleteServiceCategory,
  getServiceCategories,
};

class service extends Component {
  state = {
    modalmode: null,
    _id: "",
    name: "",
    details: "",
    btnload: false,
    loading: true,
    postmodal: false,
  };

  componentDidMount() {
    this.props.getServiceCategories(this.props.match.params.businessid);
    document.body.style.backgroundColor = "#F0F2FE";
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.data.owner.service !== undefined) {
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
      details: this.state.details,
      createdAt: new Date().toISOString(),
    };
    if (this.state.modalmode === "Post") {
      this.props.postServiceCategory(
        userData,
        this.handleDone,
        this.props.match.params.businessid
      );
    } else {
      this.props.editServiceCategory(userData, this.handleDone, this.state._id);
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
      details: business.details,
      modalmode: "Edit",
      _id: business._id,
      postmodal: true,
    });
  };

  openbusiness = (business) => {
    this.setState({
      name: business.name,
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

    const { classes, deleteServiceCategory } = this.props;
    const markup = loading || this.props.data.owner.service === undefined ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
        this.props.data.owner.service.map((food, index) => (
          <div key={index} className="col-6 sm-12 xs-12 mb-4 text-center">
            <Card className={classes.bodycard}>
              <CardContent>
                <Typography style={{ fontSize: "1.05rem" }}>
                  {food.name}
                  <br className={classes.breaker} />

                  {food.details}
                </Typography>
                {/* <Button
                style={{ color: "#616161" }}
                onClick={() => this.openbusiness(food)}
                variant="contained"
                size="small"
                className="mt-3 mr-3"
              >
                Details
              </Button> */}
                <Button
                  component={Link}
                  variant="contained"
                  size="small"
                  color="inherit"
                  to={`/serviceitem/${food._id}`}
                  className="mt-3"
                >
                  ITEMS
                </Button>
                <br className={classes.breaker} />
              </CardContent>
              <Button
                variant="contained"
                onClick={() => this.editbusiness(food)}
                className={classes.edit}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={() => deleteServiceCategory(food._id)}
                className={classes.delete}
              >
                Delete
              </Button>
            </Card>
          </div>
        ))
      );

    return (
      <div className="container" style={{ marginTop: 90 }}>
        <p style={{ fontSize: "2rem" }} className="text-center mt-4">
          Services
        </p>
        <div className="row mt-4">
          <div className="col-12">
            {loading ? null : (
              <Button
                className="mb-4 float-right"
                variant="contained"
                onClick={this.handlePost}
              >
                Add Category
              </Button>
            )}
          </div>
        </div>
        <div className="row mt-4">{markup}</div>

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
                  Add a New Category
                </Typography>
              ) : modalmode === "Edit" ? (
                <Typography
                  style={{ fontSize: "1.5rem" }}
                  className={classes.pageTitle}
                >
                  Edit a Category
                </Typography>
              ) : modalmode === "Open" ? (
                <Typography
                  style={{ fontSize: "1.5rem" }}
                  className={classes.pageTitle}
                >
                  Your Category
                </Typography>
              ) : null}
              {modalmode === "Open" ? (
                <>
                  <Typography variant="h6" className="mt-2 ">
                    Name - {this.state.name}
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
                      label="Name.."
                      className={classes.TextField}
                      value={this.state.name}
                      onChange={this.handleChange}
                      fullWidth
                      required={true}
                    />
                    <TextField
                      name="details"
                      type="details"
                      label="Details.."
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
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(service));
