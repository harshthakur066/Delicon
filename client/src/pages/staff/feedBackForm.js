import React, { Component } from "react";
import "./feedbackform.css";
import { connect } from "react-redux";
import {
  withStyles,
  Button,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import {
  getfeedbackquestions,
  postFeedBack,
} from "../../redux/actions/dataActions";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import logo from "../../assets/img/logo.png";
import Typography from "@material-ui/core/Typography";



const styles = {
  bodycard: {
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#FFFFFF",
    boxShadow: "1px 1px 1px 1px grey",
    width: "50%",
    margin: "auto",
    "@media (min-width: 320px) and (max-width: 480px)": {
      width: "90%",
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
    cursor: "pointer",
  },
  delete: {
    float: "right",
    cursor: "pointer",
    marginBottom: "1.05rem",
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
    border: "none",
    borderBottom: "2px solid #616161",
    outline: "none",
    width: "100%"
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
    left: "10%",
    right: "10%",
    bottom: "5%",
    backgroundColor: "white",
    borderRadius: "20px",
    border: "0px",
    width: "auto",
    outline: "none",
    overflowY: "scroll",
  },
  split: {
    height: " 100%",
    width: "100%",
    position: "fixed",
    zIndex: 1,
    top: 0,
    overflowX: "hidden",
    paddingTop: "20px",
    backgroundColor: "#2a2b33",

  },


  centered: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -60%)",
    textAlign: "center"
  },

};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});

const mapDispatchToProps = {
  getfeedbackquestions,
  postFeedBack,
};

class feedBackForm extends Component {
  state = {
    errors: {},
    btnload: false,
    loading: true,
    submitted: false,
  };

  handleDone = () => {
    this.setState({
      loading: false,
      btnload: false,
    });
  };

  componentDidMount() {
    this.props.getfeedbackquestions(
      this.props.match.params.businessId,
      this.props.match.params.orderId,
      this.handleDone
    );

    document.body.style.backgroundColor = "#F0F2FE";
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
        loading: false,
        btnload: false,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      btnload: true,
      submitted: true,
    });
    let feedback = [];
    let inputs = event.target.getElementsByClassName("inputclass");
    for (let i = 0; i < inputs.length; i++) {
      feedback[i] = this.props.data.staff.feedbackform[i];
      feedback[i].ans = inputs[i].value;
    }
    const userData = {
      custName: this.props.data.staff.orderdetails.custName,
      email: this.props.data.staff.orderdetails.email,
      mobno: this.props.data.staff.orderdetails.mobno,
      businessId: this.props.match.params.businessId,
      orderId: this.props.match.params.orderId,
      feedback: feedback,
      createdAt: new Date().toISOString(),
    };
    this.props.postFeedBack(userData, this.handleDone);
  };

  handleBool = (event) => {
    var tempinputs = event.target.parentNode.parentNode.getElementsByClassName(
      "bool"
    );
    tempinputs[0].className = "bool";
    tempinputs[0].className = "bool";

    event.target.className += " inputclass";
  };

  handleStar = (event) => {
    var tempstars = event.target.parentNode.parentNode.getElementsByClassName(
      "star"
    );
    tempstars[0].className = "star";
    tempstars[1].className = "star";
    tempstars[2].className = "star";
    tempstars[3].className = "star";
    tempstars[4].className = "star";

    event.target.className += " inputclass";
  };

  render() {
    const loading = this.state.loading;
    const btnload = this.state.btnload;

    const { classes } = this.props;

    if (this.state.submitted === true)
      return (
        <div className={`${classes.split} `}>
          <div className={classes.centered}>

            <Typography variant="h3" style={{ fontSize: "2.05rem", color: "#9C27B0" }}>
              Thanks for the Feedback
 </Typography>
            <br></br>

            <img
              src={logo}
              style={{ height: 70, width: 170 }}
              alt="Delicon"
            />
            <br></br>

          </div>
        </div>

      )

    const markup = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
        <Card className={classes.bodycard} variant="outlined">
          <CardContent>

            <form className="m-3" onSubmit={this.handleSubmit}>
              {this.props.data.staff.feedbackform.map((food, i) => (
                <div key={food._id}>
                  {food.type === "text" ? (
                    <>
                      <span>
                        {
                          (Number(i) + Number(1)) +
                          ".)  " +
                          food.question}{" "}
                      </span>
                      <br></br>
                      <input
                        type="text"
                        className={classes.TextField + " inputclass"}
                        required={true}
                      />
                    </>
                  ) : null}
                  {food.type === "boolean" ? (
                    <span>
                      <span>
                        {
                          (Number(i) + Number(1)) +
                          ".)  " +
                          food.question}{" "}
                      </span>
                      <br></br>
                      <span className="boolscontain">
                        <label style={{ marginLeft: "20px", marginTop: "5px" }}>

                          <input
                            name={`feedback+${i}`}
                            onChange={this.handleBool}
                            type="radio"
                            value="Yes"
                            className="bool"
                            required={true}
                          />
                          <span> YES</span>
                        </label>
                        <br></br>
                        <label style={{ marginLeft: "20px" }}>
                          <input
                            name={`feedback+${i}`}
                            onChange={this.handleBool}
                            type="radio"
                            value="No"
                            className="bool"
                            required={true}
                          />
                          <span> NO</span>
                        </label>
                      </span>
                    </span>
                  ) : null}
                  <br></br>
                  {food.type === "rating" ? (
                    <span className="rateparent">
                      <span>
                        {
                          (Number(i) + Number(1)) +
                          ".)  " +
                          food.question}{" "}
                      </span>
                      <br></br>
                      <div style={{ marginLeft: "20px", marginTop: "5px" }} className="rating">
                        <label>
                          <input
                            onChange={this.handleStar}
                            type="radio"
                            value="1"
                            className="star"
                          />
                          <span className="icon">★</span>
                        </label>
                        <label>
                          <input
                            onChange={this.handleStar}
                            type="radio"
                            value="2"
                            className="star"
                          />
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                        </label>
                        <label>
                          <input
                            onChange={this.handleStar}
                            type="radio"
                            value="3"
                            className="star"
                          />
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                        </label>
                        <label>
                          <input
                            onChange={this.handleStar}
                            type="radio"
                            value="4"
                            className="star"
                          />
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                        </label>
                        <label>
                          <input
                            onChange={this.handleStar}
                            type="radio"
                            value="5"
                            className="star"
                          />
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                          <span className="icon">★</span>
                        </label>
                      </div>
                    </span>
                  ) : null}
                </div>
              ))}
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
          </CardContent>
        </Card>

      );

    return (
      <div className="container" style={{ marginTop: 90 }}>
        <p style={{ fontSize: "2rem" }} className="text-center mt-4">
          Feedback Form
        </p>
        <div style={{ fontSize: "1rem" }} className="mt-3">{markup}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(feedBackForm));
