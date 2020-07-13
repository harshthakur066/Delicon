import React, { Component } from "react";
import "./feedBack.css"

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
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import {
  editFeedBackQuestion,
  postFeedBackQuestion,
  deleteFeedBackQuestion,
  getFeedBackQuestions,
} from "../../redux/actions/dataActions";

const styles = {
  bodycard: {
    margin: 5,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#FFFFFF", //card-bg-color
    boxShadow: "2px 3px 4px 2px grey",
    "&:hover": {
      transition: "(0.4s)",
      boxShadow: "2px 6px 8px 2px grey",
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
    backgroundColor:"#2196F3",
    marginRight:"5px",
    marginBottom:"1rem",
    "&:hover": {
      backgroundColor:"#2196F3",
    },
  },
  delete: {
    float: "right",
    color: "white",
    cursor: "pointer",
    backgroundColor:"#f44336",
    marginBottom:"1rem",
    "&:hover": {
      backgroundColor:"#f44336",
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
    bottom: "15%",
    backgroundColor: "white",
    borderRadius: "20px",
    border: "0px",
    width: "auto",
    outline: "none",
  },
  preview: {
    position: "fixed",
    top: "15%",
    left: "15%",
    right: "15%",
    bottom: "15%",
    padding:"20px",
    backgroundColor: "white",
    borderRadius: "20px",
    border: "0px",
    width: "auto",
    outline: "none",
    overflowY: "scroll",
  },


};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});

const mapDispatchToProps = {
  editFeedBackQuestion,
  postFeedBackQuestion,
  deleteFeedBackQuestion,
  getFeedBackQuestions,
};

 

class feedBack extends Component {
  state = {
    modalmode: null,
    _id: "",
    question: "",
    type: "",
    btnload: false,
    loading: true,
    postmodal: false,
    };

  componentDidMount() {
      console.log(this.props.match.params.businessId)
    this.props.getFeedBackQuestions(this.props.match.params.businessId);
    document.body.style.backgroundColor = "#F0F2FE";
  }


  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.data.owner.feedbackquestions !== undefined) {
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
      question: "",
      type: "",
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
      question: this.state.question,
      type: this.state.type,
    };
    if (this.state.modalmode === "Post") {
      this.props.postFeedBackQuestion(
        userData,
        this.handleDone,
        this.props.match.params.businessId
      );
    } else {
      this.props.editFeedBackQuestion(userData, this.handleDone, this.state._id);
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
      question: business.question,
      type: business.type,
      modalmode: "Edit",
      _id: business._id,
      postmodal: true,
    });
  };

  openbusiness = () => {
    console.log("open")
    this.setState({
      modalmode: "Open",
      postmodal: true,
    });
  };
  preview(){
    return (
      
      this.props.data.owner.feedbackquestions.map((food,i) => (
                  <div 
                  key={food._id} >
                   <form>
                    {
                      food.type === "text" ?
                      <>
                  <span >{"Question " +  (Number(i) + Number(1)) + ".)  " +  food.question} </span>
                      <TextField
                      name="Comment"
                      type="Comment"
                      label="Comment.."
                      fullWidth
                      required={true}
                      
                    /> 
                    </>
                      : null
                    }
                    <br></br>
                    {
                      food.type === "boolean" ? 
                      <span>
                  <span >{"Question " +  (Number(i) + Number(1)) + ".)  " +  food.question} </span>
                      <FormLabel component="legend">{}</FormLabel>
                      <RadioGroup aria-label="bool" name="bool" value={true} >
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup></span>
                      : null
                    }
                      <br></br>
                    {
                      
                      food.type === "rating" ? 
                      <>
                  <span >{"Question " +  (Number(i) + Number(1)) + ".)  " +  food.question} </span>
                      <div class="rating">
                        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                      </>
                      : null
                    }
                     <br></br>

                    
  
                    {/* {this.state.errors ? <p>{this.state.errors.error}</p> : null} */}
                    {/* <Button
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
                    </Button> */}
                  </form>
            </div>
                  ))
    )
  }

 
  render() {
    const loading = this.state.loading;
    const btnload = this.state.btnload;
    const modalmode = this.state.modalmode;
  

    const { classes, deleteFeedBackQuestion } = this.props;

    console.log(this.props.data.owner.feedbackquestions);

     const markup = loading || this.props.data.owner.feedbackquestions === undefined ? (
      
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        this.props.data.owner.feedbackquestions.map((food,i) => (
          <div key={food._id} className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-4 mb-4 ">
            
            <Card className={classes.bodycard } style={{ fontSize: "1.05rem" }}>
              <CardContent>
                <Typography className = "m-2" style={{ fontSize: "1.2rem" }}>
                  
                  <span >{"Question " +  (Number(i) + Number(1)) + ".)  " +  food.question} </span>
                  <br></br>
                  {
                      food.type === "text" ?
                      <span >{"Comment"} </span>
                      : 
                      food.type === "boolean" 
                      ?
                      <span >{"YES/NO"} </span>
                      :
                      <div class="rating">
                      <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                      </div>

                  }


                </Typography>
    
              </CardContent>
              <Button
                  onClick={() => this.editbusiness(food)}
                  className={classes.edit}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteFeedBackQuestion(food._id)}
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
          Feedback Form
        </p>
        <p style={{ fontSize: "1.5rem" }} className="text-center">
          Questions and Type
        </p>
        

        <div className="row mt-4">
          <div className="col-12">
            {loading ? null : (
              <span>
               <Button
               className="mb-4 float-left"
               onClick={() => this.openbusiness()}
               variant="contained"
               size="small"
             >
               Preview
             </Button>

              <Button
                className="mb-4 float-right"
                variant="contained"
                onClick={this.handlePost}
              >
                Add Question
              </Button>
              </span>
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
                  Add a New Question
                </Typography>
              ) : modalmode === "Edit" ? (
                <Typography
                  style={{ fontSize: "1.5rem" }}
                  className={classes.pageTitle}
                >
                  Edit a Question
                </Typography>
              ) : modalmode === "Open" ? (
                <Typography
                  style={{ fontSize: "1.5rem" }}
                  className={classes.pageTitle}
                >
                  Preview
                </Typography>
              ) : null}
              {modalmode === "Open" ? (
                 
               <div className={ ` ${classes.preview} text-left`}>
                 <Typography
                  style={{ fontSize: "1.5rem" }}
                  className={classes.pageTitle}
                >
                  Preview
                </Typography>
              { this.preview()}
               </div>
              
              ) : (
               
                <form onSubmit={this.handleSubmit}>
                  <TextField
                    name="question"
                    type="question"
                    label="Question.."
                    className={classes.TextField}
                    value={this.state.question}
                    onChange={this.handleChange}
                    fullWidth
                    required={true}
                  />
                  <br></br>
                  <br></br>
                  <span style={{textAlign: "left" }} > 
                  <InputLabel id="Type">Type..</InputLabel>
                  <Select
                   name="type"
                   type="type"
                   labelId="Type"
                   value={this.state.type}
                   className={classes.TextField}
                   onChange={this.handleChange}
                   fullWidth
                   required={true}
                  >
                  <MenuItem value="Select Type">
                  <em>Select Type</em>
                  </MenuItem>
                  <MenuItem value={"text"}>Comment</MenuItem>
                  <MenuItem value={"rating"}>Rating</MenuItem>
                  <MenuItem value={"boolean"}>Yes/No</MenuItem>
                  </Select>
                  </span>

                  {/* {this.state.errors ? <p>{this.state.errors.error}</p> : null} */}
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
)(withStyles(styles)(feedBack));
