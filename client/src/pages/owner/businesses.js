import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getbusinesses,
  deletebusiness,
  postbusiness,
  editbusiness,
} from "../../redux/actions/dataActions";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { Modal, TextField, CircularProgress } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

//Store se Jo chije chahiye (data, user, UI) wo lele isme se
const mapStatetoprops = (state) => ({
  UI: state.UI,
  data: state.data,
});

//jo bhi action chahiye use import kr aur isme dalde
const mapDispatchtoProps = {
  getbusinesses,
  deletebusiness,
  postbusiness,
  editbusiness,
};

//inline styles likhne ke liye withStyles use krle Material UI se
const styles = {
  cardStyle: {
    display: "block",
    width: "100%",
    height: "auto",
    marginBottom: "2rem",
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
    top: "15%",
    left: "30%",
    backgroundColor: "white",
    borderRadius: "40px",
    border: "0px",
    width: "40%",
    outline: "none",
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

  //Componenet did mount me se wo action ko call krenge
  componentDidMount() {
    this.props.getbusinesses();
  }
  //Data fetch honeke bad component will recive props trigger hoga. Agar data aya hai nextprops mai to fir loading ko false krdenge
  componentWillReceiveProps(nextProps) {
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
    //Ye Inline styles ke liye hai Withstyles deta hai props mai
    const { classes, deletebusiness } = this.props;

    //Loaing form state
    const loading = this.state.loading;
    const btnload = this.state.btnload;
    const modlemode = this.state.modalmode;

    //Agar load hora to loading componenet ya fir aya hua data print krenge
    const markup = loading ? (
      <p>Loading</p>
    ) : (
      this.props.data.owner.businesses.map((business, index) => (
        <div key={index} className="col-12 mb-4">
          <Card className={classes.cardStyle} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {business.name}
              </Typography>
              <Typography variant="h5" component="h2">
                {business.details}
              </Typography>
              <EditIcon
                onClick={() => this.editbusiness(business)}
                className={classes.edit}
              ></EditIcon>
              <DeleteIcon
                onClick={() => deletebusiness(business._id)}
                className={classes.delete}
              />
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                variant="contained"
                size="small"
                color="inherit"
                to={`/businesses/${business._id}`}
              >
                <Button size="small">Details</Button>
              </Button>
              <Button
                component={Link}
                variant="contained"
                color="inherit"
                size="small"
                to={`/staffs/${business._id}`}
              >
                <Button size="small">Staffs</Button>
              </Button>
            </CardActions>
          </Card>
        </div>
      ))
    );
    return (
      <div className="container">
        <h1 className="text-center mt-4">
          Your businesses
          <Button
            variant="contained"
            className="float-right mt-3"
            onClick={this.handlePost}
          >
            Request business
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
                  Request a New Business
                </Typography>
              ) : (
                <Typography variant="h4" className={classes.pageTitle}>
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
        <div className="container">
          <div className="row mt-4">{markup}</div>
        </div>
      </div>
    );
  }
}
//Ye thoda Ajib hai copy paste krle. With styles material UI ka hai yaha component mai hi styles likhne ke liye
export default connect(
  mapStatetoprops,
  mapDispatchtoProps
)(withStyles(styles)(Businesses));
