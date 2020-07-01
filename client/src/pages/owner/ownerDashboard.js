import React, { Component } from "react";

class ownerDashboard extends Component {

  componentDidMount() {
    document.body.style.backgroundColor = "#F0F2FE"
    }

  render() {
    return <h1 style={{ marginTop: 90 }}>Owner Dashboard </h1>;
  }
}

export default ownerDashboard;
