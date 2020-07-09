import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// import div from "@material-ui/core/div";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import logo from "../assets/img/logo.png";
import Svg from '../assets/svg/businessman.svg'


const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapDispatchToProps = {
  loginUser,
};

const styles = {
  form: {
    textAlign: "center",
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
  split: {
    height:" 100%",
    width: "50%",
    position: "fixed",
    zIndex: 1,
    top: 0,
    overflowX: "hidden",
    paddingTop: "20px",
    "@media (min-width: 320px) and (max-width: 480px)": {
      height:" 50%",
      width: "100%",
      position: "absolute",
      zIndex: 1,
      top: 0,
      overflowX: "hidden",
    },

  },
  
  left: {
    left: 0,
    backgroundColor: "#2a2b33",
    "@media (min-width: 320px) and (max-width: 480px)": {
      right: 0,
      backgroundColor: "#2a2b33",
      height:"100%"
    },
    

  },
  
  right: {
    right: 0,
    backgroundColor: "#F0F2FE",
    "@media (min-width: 320px) and (max-width: 480px)": {
      top: 200,
      backgroundColor: "#F0F2FE",
      marginTop:"100%",
      paddingTop:"0px",
      height:"75%"
    },

  },
  
  centered :{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -60%)",
    textAlign: "center"
  },
  "@media (min-width: 320px) and (max-width: 480px)": {
    position: "absolute",
    top: "0%",
    left: "0%",
    transform: "translate(-50%, -50%)",
    textAlign: "center"
    },
  
};


export class login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    loading: false,
  };
  componentDidMount() {
    document.body.style.backgroundColor = "#F0F2FE";
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
      errors: {},
    });
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
        loading: false,
      });
    }
    if (nextProps.user.authenticated) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <div>
           <div className = {`${classes.split} ${classes.left}`}>
               <div className= {classes.centered}>

           <Typography variant="h3" style={{fontSize: "2.05rem",color:"#9C27B0"}}>
            Welcome To Delicon
          </Typography>
          <br></br>

          <img
                  src={logo}
                  style={{ height: 70, width: 170 }}
                  alt="Delicon"
                />
                <br></br>
                <img src={Svg} alt="" style={{ height: 170, width: 170 }}/>
                <br></br>
           <Button
                style={{ backgroundColor: "#9C27B0",color:"white", marginTop: "1.5rem",padding :"10px" }}
                size="small"
                variant="contained"
              >
                Contact Us To Connect
              </Button>
            </div>
            </div>



        <div className = {`${classes.split} ${classes.right}`}>
       <div className= {classes.centered}>
        
          <Typography variant="h3" style={{ fontSize: "2.05rem"}}>
            Owner/Staff Login
          </Typography>
          <br></br>

          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.TextField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <br></br>

            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.TextField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors ? <p>{errors.error}</p> : null}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.button}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          </form>
        </div>
        </div>
        </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(login));
