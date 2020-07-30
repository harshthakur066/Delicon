import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

// Analytics for Bill

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

class billAnalytics extends Component {
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
    this.graph("94971b41-ee8a-45c9-9989-1275dfc4ae57", "sb-week"); // Average quantity menu
    this.graph("2b91895c-9ce5-482d-9ff0-d0891eee9279", "rd-week"); // Average quantity service
    this.graph("6ad9548f-548a-4922-b7a8-06c8332fc466", "g-week");  // Average bill amount
    this.graph("d9aa7928-44d0-45aa-80c5-067a8e571fe3", "v-week");  // Customer
   
  };

  monthData = () => {
    this.graph("2771cd29-09cf-4c5b-9bb3-c26789df87b5", "sb-month"); // Average quantity menu
    this.graph("65273788-016b-4b44-af21-520795e06518", "rd-month"); // Average quantity service
    this.graph("12bbea22-b5a7-4286-92f9-5c1c58e040c2", "g-month");  // Average bill amount
    this.graph("dc933a66-d29b-4c49-bc35-443ddaa470af", "v-month");  // Customer

  };
  monthsData = () => {
    this.graph("6218491f-333e-47af-acf7-cb69f03c5ee3", "sb-months"); // Average quantity menu
    this.graph("24bfc2af-b04d-43dc-9204-70c4f1fe8294", "rd-months"); // Average quantity service
    this.graph("e30ba9ee-9691-486f-b24b-1cdb222eff06", "g-months");  // Average bill amount
    this.graph("7c8fad5d-1354-49c2-8331-c4f70278d3b5", "v-months");  //  Customer

  };
  yearData = () => {
    this.graph("37f7df35-a5c7-4a39-aef5-21bc28314be5", "sb-year"); // Average quantity menu
    this.graph("353cbc20-9582-4e9d-9738-feda9946a052", "rd-year"); // Average quantity service
    this.graph("456fd596-b74a-43b0-9610-c5997b80f631", "g-year"); // Average bill amount
    this.graph("34d1362f-47ff-4970-92bc-0774758611bf", "v-year");  //  Customer

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
                Bill Analytics
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
  withStyles(styles)(billAnalytics)
);
