import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

class staffDashboard extends Component {
  componentDidMount() {
    document.body.style.backgroundColor = "#F0F2FE";
  }

  render() {
    return (
      <>
        <h1 style={{ marginTop: 90 }}>Staff Dashboard</h1>
        <Button
          component={Link}
          to="/bill/5f04372d739d2c001723138c"
          variant="contained"
        >
          GO
        </Button>
      </>
    );
  }
}

export default staffDashboard;
