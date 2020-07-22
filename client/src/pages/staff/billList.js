import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getdeliverdorders } from "../../redux/actions/dataActions";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CircularProgress, Backdrop } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

const mapStatetoprops = (state) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});

const mapDispatchtoProps = {
  getdeliverdorders,
};

const styles = {
  cardStyle: {
    display: "block",
    width: "100%",
    height: "auto",
    marginBottom: "2rem",
    backgroundColor: "#FFFFFF",
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
    fontSize: 18,
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
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

class ListBill extends Component {
  state = {
    loading: true,
    errors: {},
    value: 0, // used in Tabs
  };

  componentDidMount() {
    this.props.getdeliverdorders(this.props.user.businessId);
    document.body.style.backgroundColor = "#F0F2FE";
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data.staff.bills !== undefined) {
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
  handleMe = (event, newValue) => {
    //used in Tabs
    this.setState({
      value: newValue,
    });
  };

  render() {
    const { classes } = this.props;

    const loading = this.state.loading;

    const markup1 = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.staff.bills.map((order, index) =>
        order.paid === true ? null : (
          <div
            key={index}
            className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-4 mb-4"
          >
            <Card className={classes.cardStyle} variant="outlined">
              <CardContent>
                <Typography style={{ color: "#070707", fontSize: "1.05rem" }}>
                  Customer Name :- {order.custName}
                </Typography>
                <Typography style={{ color: "#070707", fontSize: "1.05rem" }}>
                  Staff Name :- {order.staffName}
                </Typography>
                <Typography style={{ color: "#455A64", fontSize: "1.05rem" }}>
                  Items Count :- {order.itemCount}
                </Typography>
                <br></br>
                <div className="text-center">
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/bill/${order._id}`}
                    className={classes.edit}
                  >
                    Pay Bill
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      )
    );

    const markup2 = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.staff.bills.map((order, index) =>
        order.paid === false ? null : (
          <div
            key={index}
            className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-4 mb-4"
          >
            <Card className={classes.cardStyle} variant="outlined">
              <CardContent>
                <Typography style={{ color: "#070707", fontSize: "1.05rem" }}>
                  Customer Name :- {order.custName}
                </Typography>
                <Typography style={{ color: "#070707", fontSize: "1.05rem" }}>
                  Staff Name :- {order.staffName}
                </Typography>
                <Typography style={{ color: "#455A64", fontSize: "1.05rem" }}>
                  Items Count :- {order.itemCount}
                </Typography>
                <br></br>
                <div className="text-center">
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/bill/${order._id}`}
                    className={classes.edit}
                  >
                    Bill
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      )
    );
    // console.log("state", this.state);
    return (
      <div className="container" style={{ marginTop: 90 }}>
        <div className="row mt-4">
          <div className="col-12">
            {loading ? null : (
              <span>
                <span style={{ fontSize: "2rem" }} className="text-center mt-4">
                  Orders
                </span>
                <Button
                  component={Link}
                  className="mb-4 float-right"
                  variant="contained"
                  to="/order/customers"
                >
                  Add Order
                </Button>
              </span>
            )}
          </div>
        </div>

        {/* TAB */}
        <div className="row mt-4 ">
          <div className={classes.root}>
            <AppBar style={{ backgroundColor: "#3f51b5" }} position="static">
              <Tabs
                TabIndicatorProps={{ style: { background: "#FFFFFF" } }}
                value={this.state.value}
                onChange={this.handleMe}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab
                  style={{ fontSize: ".8rem" }}
                  label="Unpaid"
                  {...a11yProps(0)}
                />
                <Tab
                  style={{ fontSize: ".8rem" }}
                  label="Paid"
                  {...a11yProps(1)}
                />
              </Tabs>
            </AppBar>
          </div>
        </div>

        <TabPanel value={this.state.value} index={0}>
          <div className="row mt-4">{markup1}</div>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <div className="row mt-4">{markup2}</div>
        </TabPanel>
      </div>
    );
  }
}

export default connect(
  mapStatetoprops,
  mapDispatchtoProps
)(withStyles(styles)(ListBill));
