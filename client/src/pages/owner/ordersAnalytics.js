import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

const mapStatetoprops = (state) => ({
  UI: state.UI,
});

// Analytics for Order

const styles = {
  root: {
    margin: "auto",
    textAlign: "center",
    flexGrow: 0,
  },
  display: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  graph: {
    width: "400px",
    height: "400px",
    marginTop: "3rem",
    "@media (min-width: 320px) and (max-width: 480px)": {
      width: "300px",
      height: "300px",
    },
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

class ordersAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      loading: true,

    };
    this.sdk = new ChartsEmbedSDK({
      baseUrl:
        "https://charts.mongodb.com/charts-delicon-reservation-syste-yirij",
    });
  }

  graph = (chartID, elementID) => {
    const name = this.sdk.createChart({
      chartId: chartID,
      filter: { businessId: this.props.match.params.busiId },
    });
    name.render(document.getElementById(elementID));
  };

  weekData = () => {
    this.graph("865b5373-42c8-4ba9-9013-8e19cc6f8f24", "sb-week"); // new orders
    this.graph("8079c7c2-a6a4-4485-944e-f2c96c41a811", "rd-week"); // Average Items bought
    this.graph("5be6703f-3a14-4fe5-b2e4-1a389df47f3f", "g-week"); // Staff with most ordered
    this.graph("154ca379-7bb1-46de-8f1c-ef6dc3c39568", "v-week"); // Customer with most orders
   
  };

  monthData = () => {
    this.graph("e8abe3ff-c512-424a-a364-dfeaf73f208b", "sb-month");// new orders
    this.graph("c8e31936-6028-400e-a49b-0f71309dc806", "rd-month"); // Average Items bought
    this.graph("52eb1f18-5c9a-4639-869f-64a4f0655b34", "g-month");// Staff with most ordered
    this.graph("3baee134-318c-474c-bfec-0441e729466c", "v-month");// Customer with most orders

  };
  monthsData = () => {
    this.graph("25906652-bc6c-4588-9840-0dda7dff144e", "sb-months");// new orders
    this.graph("e186c92d-bd3b-4b5d-89f4-32aaf297b7e2", "rd-months"); // Average Items bought
    this.graph("3c1d3f73-9502-4c63-8552-d8c240cd33ac", "g-months");// Staff with most ordered
    this.graph("5fd9cae7-98f9-4eff-ae0b-cd384279ad13", "v-months");// Customer with most orders

  };
  yearData = () => {
    this.graph("e43ea344-d8a1-4763-99b5-0c93ea5a4ecc", "sb-year");// new orders
    this.graph("3e5fec7f-1412-48f2-a3dc-1666ee326da8", "rd-year"); // Average Items bought
    this.graph("ad1cb011-212d-43ed-8b7d-a49abcb3d585", "g-year");// Staff with most ordered
    this.graph("5dba18e3-21fb-4377-b786-968b1e5c1299", "v-year");// Customer with most orders

  };

  handleMe = (event, newValue) => {
    this.setState({
      value: newValue,
      loading: true,
    });
  };

  componentDidMount() {
    this.weekData();
    document.body.style.backgroundColor = "#F0F2FE";
  }

  componentDidUpdate() {
    if (this.state.value === 0) {
      this.weekData();
    } else if (this.state.value === 1) {
      this.monthData();
    } else if (this.state.value === 2) {
      this.monthsData();
    } else if (this.state.value === 3) {
      this.yearData();
    }
  }

  render() {
    const { classes } = this.props;
    
    const month =(
      <div className={classes.display}>
        <div className={classes.graph} id="sb-month"></div>
        <div className={classes.graph} id="rd-month"></div>
        <div className={classes.graph} id="g-month"></div>
        <div className={classes.graph} id="v-month"></div>
      </div>
    );

    const week = (
      <div className={classes.display}>
        <div className={classes.graph} id="sb-week"></div>
        <div className={classes.graph} id="rd-week"></div>
        <div className={classes.graph} id="g-week"></div>
        <div className={classes.graph} id="v-week"></div>
      </div>
    );

    const sixMonths = (
      <div className={classes.display}>
        <div className={classes.graph} id="sb-months"></div>
        <div className={classes.graph} id="rd-months"></div>
        <div className={classes.graph} id="g-months"></div>
        <div className={classes.graph} id="v-months"></div>
      </div>
    );

    const year = (
      <div className={classes.display}>
        <div className={classes.graph} id="sb-year"></div>
        <div className={classes.graph} id="rd-year"></div>
        <div className={classes.graph} id="g-year"></div>
        <div className={classes.graph} id="v-year"></div>
      </div>
    );


    return (
      <div className="container" style={{ marginTop: 90 }}>
        <div className="row mt-4">
          <div className="col-12">
            <span>
              <span style={{ fontSize: "2rem" }} className="text-center mt-4">
                Orders Analytics
              </span>
            </span>
          </div>
        </div>

        <div className="row mt-4 ">
          <div className={classes.root}>
            <AppBar
              style={{ backgroundColor: "#3f51b5", display: "flex" }}
              position="static"
            >
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
                  label="1 W"
                  {...a11yProps(0)}
                />
      
                
                <Tab
                  style={{ fontSize: ".8rem" }}
                  label="1 M"
                  {...a11yProps(1)}
                />
                <Tab
                  style={{ fontSize: ".8rem" }}
                  label="6 M"
                  {...a11yProps(2)}
                />
                <Tab
                  style={{ fontSize: ".8rem" }}
                  label="1 Y"
                  {...a11yProps(3)}
                />
              </Tabs>
            </AppBar>
          </div>
        </div>

        
      
    <div>
        <TabPanel value={this.state.value} index={0}>
          <div style = {{display:"block",fontSize:"1.3rem"}}className="row mt-4 text-center">Week</div>
          <div className="row mt-4">{week}</div>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
        <div style = {{display:"block",fontSize:"1.3rem"}}className="row mt-4 text-center">Month</div>
          <div className="row mt-4">{month}</div>
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
        <div style = {{display:"block",fontSize:"1.3rem"}}className="row mt-4 text-center">Six Months</div>
          <div className="row mt-4">{sixMonths}</div>
        </TabPanel>
        <TabPanel value={this.state.value} index={3}>
        <div style = {{display:"block",fontSize:"1.3rem"}}className="row mt-4 text-center">Year</div>
          <div className="row mt-4">{year}</div>
        </TabPanel>
        </div>

      </div>
    );
  }
}

export default connect(mapStatetoprops)(
  withStyles(styles)(ordersAnalytics)
);
