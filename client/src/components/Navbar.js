import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink, withRouter, Link } from "react-router-dom";
import { logOutUser } from "../redux/actions/userActions";
import { connect } from "react-redux";
import { MdBusiness } from "react-icons/md";
import { GiEgyptianWalk } from "react-icons/gi";
import { RiReservedLine } from "react-icons/ri";
import logo from "../assets/img/logo.png";
import { AiFillDashboard } from "react-icons/ai";

import {
  CssBaseline,
  Drawer,
  Divider,
  List,
  ListItem,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import clsx from "clsx";
import { RiParkingBoxLine } from "react-icons/ri";

const drawerWidth = 240;

const styles = {
  root: {
    display: "flex",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  hide: {
    display: "none",
  },
  drawer: {
    fontFamily: " Arial, Helvetica, sans-serif",
    fontSize: "20px",
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    boxShadow: " 2px 2px 2px 2px rgba(0, 0, 0, .2)",
    backgroundColor: "#FFFFFF", // bg for drawer
    width: drawerWidth,
  },
  drawerHeader: {
    backgroundColor: "#FFFFFF", // bg for drawerHeader
    display: "flex",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#FFFFFF",
    flexGrow: 1,
    marginLeft: -drawerWidth,
  },
  contentShift: {
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
    color: "white",
  },
  login: {
    color: "white",
  },
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  logOutUser,
};

class ButtonAppBar extends Component {
  state = {
    open: null,
  };
  handlelogout = () => {
    this.props.logOutUser();
    this.props.history.push("/");
  };

  handleDrawerOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleDrawerClose = () => {
    this.setState({
      open: false,
    });
  };

  componentDidMount() {
    if (window.innerWidth > 768) {
      this.setState({
        open: true,
      });
    }
  }

  render() {
    const classes = this.props.classes;
    var cont = document.getElementById("sider");
    if (this.state.open) {
      cont.style.marginLeft = "240px";
    } else if (this.state.open === false) {
      cont.style.marginLeft = "0px";
    }
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar style={{ backgroundColor: "#3f51b5" }}>
            {this.props.user.userRole ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                className={clsx(
                  classes.menuButton,
                  this.state.open && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>
            ) : null}

            <Typography variant="h6" className={classes.title}>
              <Link to="/" className={classes.title}>
                <img
                  src={logo}
                  style={{ height: 70, width: 170 }}
                  alt="Delicon"
                />
              </Link>
            </Typography>
            {this.props.user.authenticated ? (
              <Button onClick={this.handlelogout} color="inherit">
                Logout
              </Button>
            ) : (
              <Button
                className={classes.login}
                component={NavLink}
                to="/login"
                color="inherit"
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {window.innerWidth < 768 ? (
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
          ) : null}

          <Divider />
          {this.props.user.userRole === "Owner" ? (
            <List>
              <ListItem button component={NavLink} to="/ownerDash">
                <AiFillDashboard />
                Dashboard
              </ListItem>
              <ListItem button component={NavLink} to="/businesses">
                <MdBusiness />
                Businesses
              </ListItem>
              <ListItem button component={NavLink} to="/reqbusinesses">
                <MdBusiness />
                Requested Businesses
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem button component={NavLink} to="/staffDash">
                <AiFillDashboard />
                Dashboard
              </ListItem>
              <Divider />
              <ListItem button component={NavLink} to="/reservations">
                <RiReservedLine />
                Reservations
              </ListItem>
              <ListItem button component={NavLink} to="/walkins">
                <GiEgyptianWalk />
                Walkins
              </ListItem>
              <ListItem button component={NavLink} to="/valets">
                <RiParkingBoxLine />
                Valets
              </ListItem>
            </List>
          )}
          <Divider />
        </Drawer>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(ButtonAppBar)));
