import React, { Component } from "react";

class home extends Component {

  componentDidMount() {
    document.body.style.backgroundColor = "#F0F2FE"
    }
  
  render() {
    return (
      <div className="container" style={{ marginTop: 90 }}>
        <h1>Home</h1>
      </div>
    );
  }
}

export default home;
