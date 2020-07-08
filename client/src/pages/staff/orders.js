import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getorders, deleteOrder } from "../../redux/actions/dataActions";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Modal, CircularProgress, Backdrop } from "@material-ui/core";

const mapStatetoprops = (state) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});

const mapDispatchtoProps = {
  getorders,
  deleteOrder,
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
    height: "175px",
    width: "250px",
    background: "F6F7FE",
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
    color: "red",
    cursor: "pointer",
    marginBottom: "1rem",
    marginTop: "0.5rem",
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
    const { classes, deleteOrder } = this.props;

    const loading = this.state.loading;
    // const btnload = this.state.btnload;
    // const modlemode = this.state.modalmode;

    const markup = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      this.props.data.staff.orders.map((order, index) => (
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
              <Typography style={{ color: "#070707", fontSize: "1.05rem" }}>
                Staff Name :- {order.staffName}
              </Typography>
              <Typography style={{ color: "#455A64", fontSize: "1.05rem" }}>
                Items Count :- {order.itemCount}
              </Typography>
              <Button
                style={{ color: "#616161", marginTop: "0.5rem" }}
                size="small"
                variant="contained"
                onClick={() => this.openbusiness(order)}
              >
                Details
              </Button>

              <Button
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
        <p style={{ fontSize: "2rem" }} className="text-center mt-4">
          Orders
        </p>
        <div className="row mt-4">
          <div className="col-12">
            {loading ? null : (
              <Button
                component={Link}
                className="mb-4 float-right"
                variant="contained"
                to="/order/customers"
              >
                Add Order
              </Button>
            )}
          </div>
        </div>
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
        <div className="row mt-4 ">{markup}</div>
      </div>
    );
  }
}

export default connect(
  mapStatetoprops,
  mapDispatchtoProps
)(withStyles(styles)(Orders));
