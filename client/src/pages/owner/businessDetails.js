import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles, Backdrop, CircularProgress } from "@material-ui/core";

import { getbusiness } from "../../redux/actions/dataActions";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import reservation from "../../assets/img/reservation.jpg";
import valet from "../../assets/img/valet.jpg";
import walkin from "../../assets/img/walkin.jpg";
import menu from "../../assets/img/menu.jpg";
import service from "../../assets/img/service.jpg";
import billing from "../../assets/img/billing.jpg";
import feedback from "../../assets/img/feedback.jpg";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
});

const mapDispatchToProps = {
  getbusiness,
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
      boxShadow: "1px 6px 8px 2px grey",
    },
  },
  analytics: {
    color: "white",
    cursor: "pointer",
    backgroundColor: "#66BB6A",
    marginRight: "5px",
    marginBottom: "1rem",
    "&:hover": {
      backgroundColor: "#388E3C",
    },
  },
  settings: {
    color: "white",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    marginBottom: "1rem",
    "&:hover": {
      backgroundColor: "#1E88E5",
    },
  },
  feedBack: {
    color: "white",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    marginBottom: "1rem",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
      backgroundColor: "#1E88E5",
    },
  },
  root: {
    maxWidth: 345,
  },
};

class BusinessDetails extends Component {
  state = {
    name: "",
    owner: "",
    address: "",
    details: "",
    _id: "",
    loading: true,
    btnload: false,
  };

  componentDidMount() {
    const { busiId } = this.props.match.params.busiId;
    this.props.getbusiness(this.doneLoading, busiId);
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

  doneLoading = () => {
    this.setState({
      btnload: false,
      loading: false,
    });
  };

  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    console.log(this.props.match.params);

    const busiId = this.props.match.params.busiId;
    const modules = [
      {
        id: 0,
        name: "Reservation",
        image: reservation,
        setting: "",
        analytics: `/analytics/reservations/${this.props.match.params.busiId}`,
      },
      {
        id: 1,
        name: "Valets",
        image: valet,
        analytics:`/analytics/valets/${this.props.match.params.busiId}`,
      },
      {
        id: 2,
        name: "Walkin",
        image: walkin,
        setting: "",
      },
      {
        id: 3,
        name: "Menu",
        image: menu,
        setting: `/menu/${busiId}`,
      },
      {
        id: 4,
        name: "Service",
        image: service,
        setting: `/service/${busiId}`,
      },
      {
        id: 5,
        name: "Billing",
        image: billing,
        setting: "",
      },
      {
        id: 6,
        name: "Feedback",
        image: feedback,
        setting: `/feedBack/${busiId}`,
      },
    ];

    const markup = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      modules.map((mod) => (
        <div
          key={mod.id}
          className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-6 mb-4"
        >
          <div>
            <Card className={classes.cardStyle}>
              <CardActionArea>
                <CardMedia
                  // style = {{padding : "10px"}}
                  component="img"
                  alt={mod.name}
                  height="140"
                  image={mod.image}
                  title={mod.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {mod.name}
                  </Typography>
                  {/* <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography> */}
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  className={classes.settings}
                  component={Link}
                  variant="contained"
                  color="inherit"
                  to={mod.analytics}
                >
                  Analytics
                </Button>
                {mod.setting ? (
                  <Button
                    className={classes.settings}
                    component={Link}
                    variant="contained"
                    color="inherit"
                    to={mod.setting}
                  >
                    Settings
                  </Button>
                ) : null}
              </CardActions>
            </Card>
          </div>
        </div>
      ))
    );
    return (
      <div className="container" style={{ marginTop: 90 }}>
        <p style={{ fontSize: "2rem" }} className="text-center mt-4">
          Modules
        </p>

        <div className="row mt-4">{markup}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BusinessDetails));
