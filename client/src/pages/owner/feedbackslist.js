import React, { Component } from "react";

import { connect } from "react-redux";
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import { getallfeedbacks } from "../../redux/actions/dataActions";

const styles = {
  bodycard: {
    margin: 5,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#FFFFFF", //card-bg-color
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
    marginRight: "5px",
    marginBottom: "1rem",
    "&:hover": {
      backgroundColor: "#2196F3",
    },
  },
  delete: {
    float: "right",
    color: "white",
    cursor: "pointer",
    backgroundColor: "#f44336",
    marginBottom: "1rem",
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
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});

const mapDispatchToProps = {
  getallfeedbacks,
};

class feedbackList extends Component {
  state = {
    modalmode: null,
    _id: "",
    custName: "",
    mobno: "",
    email: "",
    feedback: [],
    loading: true,
    errors: {},
  };

  componentDidMount() {
    this.props.getallfeedbacks(this.props.match.params.businessId);
    document.body.style.backgroundColor = "#F0F2FE";
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data.owner.feedbacks !== undefined) {
      this.setState({
        loading: false,
      });
    }
    if (newProps.UI.errors) {
      this.setState({
        errors: newProps.UI.errors,
        loading: false,
      });
    }
  }

  handleClose = () => {
    this.setState({
      postmodal: false,
    });
  };

  openbusiness = (business) => {
    this.setState({
      custName: business.custName,
      mobno: business.mobno,
      email: business.email,
      feedback: [],
      _id: business._id,
      postmodal: true,
    });
  };

  render() {
    const loading = this.state.loading;
    const { classes } = this.props;

    console.log(this.props.data.owner.feedbacks);

    const markup =
      loading || this.props.data.owner.feedbacks === undefined ? (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        this.props.data.owner.feedbacks.map((food, index) => (
          <div key={index} className="col-6 sm-12 xs-12 mb-4 text-center">
            <Card className={classes.bodycard}>
              <CardContent>
                <Typography style={{ fontSize: "1.05rem" }}>
                  {food.custName} <br></br>
                  {food.mobno}
                  <br></br>
                  {food.email}
                </Typography>

                <div className="float-left mb-2">
                  <Button
                    style={{ color: "#616161" }}
                    onClick={() => this.openbusiness(food)}
                    variant="contained"
                    size="small"
                  >
                    Details
                  </Button>
                </div>
                <br className={classes.breaker} />
              </CardContent>
            </Card>
          </div>
        ))
      );

    return (
      <div className="container" style={{ marginTop: 90 }}>
        <p style={{ fontSize: "2rem" }} className="text-center mt-4">
          Menu Items
        </p>
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
              <Typography
                style={{ fontSize: "1.5rem" }}
                className={classes.pageTitle}
              >
                Your Items
              </Typography>

              <>
                <Typography variant="h6" className="mt-2 ">
                  Name - {this.state.custName}
                </Typography>
                <Typography variant="h6" className="mt-2 ">
                  Details - {this.state.mobno}
                </Typography>
                <Typography variant="h6" className="mt-2 ">
                  Price - {this.state.email}
                </Typography>
              </>
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
)(withStyles(styles)(feedbackList));
