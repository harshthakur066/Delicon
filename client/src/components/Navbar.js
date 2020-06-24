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
import {
  CssBaseline,
  Drawer,
  Divider,
  List,
  ListItem,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import clsx from "clsx";

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
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
  },
  content: {
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
    open: false,
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

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar>
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
            <Link to="/" className={classes.title}>
              <Typography variant="h6" className={classes.title}>
                Delicon Assist
              </Typography>
            </Link>
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
                LOGIN
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
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {this.props.user.userRole === "Owner" ? (
            <List>
              <ListItem button component={NavLink} to="/businesses">
                Businesses
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem button component={NavLink} to="/reservations">
                Reservations
              </ListItem>
              <ListItem button component={NavLink} to="/walkins">
                Walkins
              </ListItem>
              <ListItem button component={NavLink} to="/valets">
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
