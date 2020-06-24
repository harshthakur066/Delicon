import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";
import { getstaffs } from "../../redux/actions/dataActions";

const styles = {
  cardStyle: {
    display: "block",
    width: "100%",
    height: "auto",
    marginBottom: "2rem",
  },
  root: {
    height: "175px",
    width: "250px",
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
  fr: {
    float: "right",
  },
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
});

const mapDispatchToProps = {
  getstaffs,
};

class Staffs extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const { businessid } = this.props.match.params;
    this.props.getstaffs(businessid, this.setdone);
  }

  setdone = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    const loading = this.state.loading;

    const { classes } = this.props; //WithStyles Material Thing

    const markup = loading ? (
      <p>Loading</p>
    ) : (
      this.props.data.owner.staffs.map((staff, index) => (
        <div key={index} className="col-12 mb-4">
          <Card className={classes.cardStyle} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {staff.name}
              </Typography>
              <Typography variant="body1" component="h4">
                {staff.position}
                {staff.working ? (
                  <span className={classes.fr}>Currently Working </span>
                ) : (
                  <span className={classes.fr}>Currently Not working </span>
                )}
              </Typography>
              <Typography variant="body1" component="h4">
                {staff.experience}
              </Typography>
              <Typography variant="body1" component="h4">
                {staff.mobno}
              </Typography>
            </CardContent>
            <CardActions>
              <Link
                style={{ textDecoration: "none" }}
                to={`/staff/${staff._id}`}
              >
                <Button size="small">Details</Button>
              </Link>
            </CardActions>
          </Card>
        </div>
      ))
    );

    return (
      <div className="container">
        <h1 className="text-center mt-4">Your Staff</h1>
        <div className="container">
          <div className="row mt-4">{markup}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Staffs));
