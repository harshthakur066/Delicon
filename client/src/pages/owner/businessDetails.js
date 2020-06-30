import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles, Backdrop, CircularProgress } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { getbusiness } from "../../redux/actions/dataActions";

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
    backgroundColor: "#F5F5F5",
    boxShadow: "0px 2px 4px 0px grey",
    "&:hover": {
      transition: "(0.4s)",
      boxShadow: "0px 6px 8px 2px grey",
    },
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
    const { busiId } = this.props.match.params;
    this.props.getbusiness(this.doneLoading, busiId);
  }

  componentWillReceiveProps(nextProps) {
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
    const { classes, data } = this.props;
    const { loading } = this.state;

    const markup = loading ? (
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      <div style={{ marginTop: 70 }}>
        <Card className={classes.cardStyle} variant="outlined">
          <CardContent>
            <Typography
              variant="h4"
              component="h4"
              color="#070707"
              gutterBottom
              className="text-center"
            >
              {data.owner.business.name}
            </Typography>
            <Typography
              variant="h6"
              component="h6"
              color="#455A64"
              className="float-right"
            >
              Owner Name - {data.owner.business.owner}
            </Typography>
            <Typography variant="h6" component="h6" color="#455A64">
              Address - {data.owner.business.address}
            </Typography>
            <Typography variant="h6" component="h6" color="#455A64">
              Details - {data.owner.business.details}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
    return <div>{markup}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BusinessDetails));
