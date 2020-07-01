import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <div style = {{backgroundColor:"#F0F2FE"}}>
    <App />
    </div>
  </React.StrictMode>,
  
  document.getElementById("root")
);
