import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

// Analytics for Service

const mapStatetoprops = (state) => ({
  UI: state.UI,
});

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

class serviceAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      loading: true,

    };
    this.sdk = new ChartsEmbedSDK({
      baseUrl:
         "https://charts.mongodb.com/charts-delicon-reservation-syste-yirij"
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
    this.graph("f69380fb-458f-4fe4-9362-d59cb26c72e5", "sb-week"); // service items
    this.graph("2b91895c-9ce5-482d-9ff0-d0891eee9279", "rd-week"); // service bought

   
  };

  monthData = () => {
    this.graph("d77d9a7a-7ed1-4d26-90be-eae9ba2fa5b5", "sb-month"); // service items
    this.graph("65273788-016b-4b44-af21-520795e06518", "rd-month"); // service bought

  };
  monthsData = () => {
    this.graph("735f3171-0588-4d9c-8995-084578b21696", "sb-months");// service items
    this.graph("24bfc2af-b04d-43dc-9204-70c4f1fe8294", "rd-months"); // service bought


  };
  yearData = () => {
    this.graph("064e86de-0c36-435d-af47-7a7f7679583e", "sb-year"); // service items
    this.graph("353cbc20-9582-4e9d-9738-feda9946a052", "rd-year"); // service bought


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
      </div>
    );

    const week = (
      <div className={classes.display}>
        <div className={classes.graph} id="sb-week"></div>
        <div className={classes.graph} id="rd-week"></div>
      </div>
    );

    const sixMonths = (
      <div className={classes.display}>
        <div className={classes.graph} id="sb-months"></div>
        <div className={classes.graph} id="rd-months"></div>
      </div>
    );

    const year = (
      <div className={classes.display}>
        <div className={classes.graph} id="sb-year"></div>
        <div className={classes.graph} id="rd-year"></div>
      </div>
    );


    return (
      <div className="container" style={{ marginTop: 90 }}>
        <div className="row mt-4">
          <div className="col-12">
            <span>
              <span style={{ fontSize: "2rem" }} className="text-center mt-4">
                Menu Analytics
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
  withStyles(styles)(serviceAnalytics)
);
