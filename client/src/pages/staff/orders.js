import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getorders, deleteOrder, orderDelivered } from "../../redux/actions/dataActions";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Modal, CircularProgress, Backdrop } from "@material-ui/core";
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
  getorders,
  deleteOrder,
  orderDelivered
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
  delete: {
    float: "right",
    color: "white",
    cursor: "pointer",
    backgroundColor: "#f44336",
    marginBottom: ".6rem",
    width: "5rem",
    "&:hover": {
      backgroundColor: "#f44336",
    },
    "@media (min-width: 320px) and (max-width: 330px)": {

    },

  },
  edit: {
    float: "left",
    color: "white",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    marginBottom: ".6rem",
    width: "5rem",
    "&:hover": {
      backgroundColor: "#2196F3",
    },

  },
  detail: {
    color: "#616161", marginBottom: ".6rem", width: "5rem",
    "@media (min-width: 320px) and (max-width: 330px)": {
      float: "right"
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
    top: "5%",
    left: "20%",
    right: "20%",
    bottom: "5%",
    backgroundColor: "white",
    borderRadius: "20px",
    border: "0px",
    width: "auto",
    outline: "none",
    height: "90%",
    padding: "20px 20px",
    overflowY: "scroll",
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

class Orders extends Component {
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
    menu: [],
    service: [],
    value: 0, // used in Tabs

  };

  componentDidMount() {
    this.props.getorders(this.props.user.businessId);
    document.body.style.backgroundColor = "#F0F2FE";
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data.staff.orders !== undefined) {
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
      createdAt: new Date().toISOString(),
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

  openbusiness = (business) => {
    this.setState({
      name: business.name,
      owner: business.owner,
      menu: business.MenuItems,
      service: business.services,
      address: business.address,
      details: business.details,
      modalmode: "Open",
      _id: business._id,
    });
    this.handleOpen();
  };

  render() {
    const { classes, deleteOrder, orderDelivered } = this.props;

    const loading = this.state.loading;
    // const btnload = this.state.btnload;
    // const modlemode = this.state.modalmode;

    console.log(this.props.data.staff.orders)

    const markup1 = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
        this.props.data.staff.orders.map((order, index) => (
          order.delivered === true ? null :
            <div
              key={index}
              className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-6 mb-4"
            >
              <Card className={classes.cardStyle} variant="outlined">
                <CardContent>
                  {/* <Typography style={{ color: "#070707", fontSize: "1.05rem" }}>
                Order Id :- {order._id}
              </Typography> */}
                  <Typography style={{ color: "#070707", fontSize: "1.05rem" }}>
                    Customer Name :- {order.custName}
                  </Typography>
                  <Typography style={{ color: "#070707", fontSize: "0.8rem" }}>
                    Staff Name :- {order.staffName}
                  </Typography>
                  <Typography style={{ color: "#455A64", fontSize: "0.85rem" }}>
                    Items Count :- {order.itemCount}
                  </Typography>
                  <br></br>
                  <div className="text-center">
                    <Button
                      variant="contained"
                      onClick={() =>
                        orderDelivered(this.props.user.businessId, order._id)
                      }
                      className={classes.edit}
                    >
                      Deliver
                </Button>
                    <span >
                      <Button
                      style={{ color:"#37474F",
                      backgroundColor: "#BDBDBD"}}
                        size="small"
                        variant="contained"
                        onClick={() => this.openbusiness(order)}
                        className={classes.detail}
                      >
                        Details
              </Button>
                    </span>

                    <Button
                      variant="contained"
                      onClick={() =>
                        deleteOrder(this.props.user.businessId, order._id)
                      }
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

    const markup2 = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
        this.props.data.staff.orders.map((order, index) => (
          order.delivered === false ? null :

            <div
              key={index}
              className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-4 mb-4"
            >
              <Card className={classes.cardStyle} variant="outlined">
                <CardContent>
                  {/* <Typography style={{ color: "#070707", fontSize: "1.05rem" }}>
                Order Id :- {order._id}
              </Typography> */}
                  <Typography style={{ color: "#070707", fontSize: "1.05rem" }}>
                    Customer Name :- {order.custName}
                  </Typography>
                  <Typography style={{ color: "#070707", fontSize: "0.8rem" }}>
                    Staff Name :- {order.staffName}
                  </Typography>
                  <Typography style={{ color: "#455A64", fontSize: "0.8rem" }}>
                    Items Count :- {order.itemCount}
                  </Typography>
                  <Button
                    style={{ color:"#37474F",
                    backgroundColor: "#BDBDBD", marginTop: "0.5rem" }}
                    size="small"
                    variant="contained"
                    onClick={() => this.openbusiness(order)}
                  >
                    Details
              </Button>

                  <Button
                    style={{ marginBottom: "0px", marginTop: "6px" }}
                    onClick={() =>
                      deleteOrder(this.props.user.businessId, order._id)
                    }
                    className={classes.delete}
                  >
                    Delete
              </Button>
                </CardContent>
              </Card>
            </div>
        ))
      );

    return (
      <div className="container" style={{ marginTop: 90 }}>

        {/* ADD */}
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
                  label="Undeliverd"
                  {...a11yProps(0)}
                />
                <Tab
                  style={{ fontSize: ".8rem" }}
                  label="Deliverd"
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

        {/* Tabs end */}
        <Modal
          open={this.state.postmodal}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.modlebox}>
            <div
              className="container"
              style={{ padding: "20px 20px", textAlign: "center" }}
            >
              <Typography
                style={{ fontSize: "2.5rem" }}
                className={classes.pageTitle}
              >
                Your Order
              </Typography>
              <div className="row" style={{ justifyContent: "space-evenly" }}>
                <>
                  <div className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-4 mb-4">
                    <Typography
                      style={{ fontSize: "1.5rem", textAlign: "left" }}
                      className={classes.pageTitle}
                    >
                      Menu Items
                    </Typography>
                    {this.state.menu.length === 0 ? (
                      <h5>No items</h5>
                    ) : (
                        this.state.menu.map((m, index) => (
                          <div
                            style={{ marginBottom: "2rem", textAlign: "left" }}
                            key={index}
                          >
                            <Typography variant="h6" className="mt-2 ">
                              Name - {m.name}
                            </Typography>
                            <Typography variant="h6" className="mt-2 ">
                              Details - {m.details}
                            </Typography>
                            <Typography variant="h6" className="mt-2 ">
                              Price - {m.price}
                            </Typography>
                            <Typography variant="h6" className="mt-2 ">
                              Quantity - {m.quantity}
                            </Typography>
                          </div>
                        ))
                      )}
                  </div>
                  <div className="  ">
                    <Typography
                      style={{ fontSize: "1.5rem", textAlign: "left" }}
                      className={classes.pageTitle}
                    >
                      Service Items
                    </Typography>
                    {this.state.service.length === 0 ? (
                      <h5>No items</h5>
                    ) : (
                        this.state.service.map((s, index) => (
                          <div
                            style={{ marginBottom: "2rem", textAlign: "left" }}
                            key={index}
                          >
                            <Typography variant="h6" className="mt-2 ">
                              Name - {s.name}
                            </Typography>
                            <Typography variant="h6" className="mt-2 ">
                              Details - {s.details}
                            </Typography>
                            <Typography variant="h6" className="mt-2 ">
                              Price - {s.price}
                            </Typography>
                            <Typography variant="h6" className="mt-2 ">
                              Quantity - {s.quantity}
                            </Typography>
                          </div>
                        ))
                      )}
                  </div>
                </>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(
  mapStatetoprops,
  mapDispatchtoProps
)(withStyles(styles)(Orders));
