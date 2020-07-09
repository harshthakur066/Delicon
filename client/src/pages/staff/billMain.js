import React, { Component } from "react";
import { connect } from "react-redux";
import { getbilldata } from "../../redux/actions/dataActions";
import { Backdrop, CircularProgress, withStyles } from "@material-ui/core";

const styles = {};

class billMain extends Component {
  state = {
    loading: true,
    errors: {},
  };

  componentDidMount() {
    this.props.getbilldata(
      this.props.user.businessId,
      this.props.match.params.orderId
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data.staff.bill !== undefined) {
      this.setState({
        loading: false,
      });
    }
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
        loading: false,
      });
    }
  }

  render() {
    const { classes } = this.props;

    const markup = this.state.loading ? (
      <Backdrop className={classes.backdrop} open={this.state.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      <p>DATA here</p>
    );

    if (!this.state.loading) {
      console.log(this.props.data.staff.bill);
    }

    return (
      <div className="text-center" style={{ marginTop: "100px" }}>
        <h1 className="pb-3">Your Bill</h1>
        <div className="new">{markup}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});

const mapDispatchToProps = {
  getbilldata,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(billMain));
