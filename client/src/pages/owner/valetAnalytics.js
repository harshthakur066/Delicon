import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

// Analytics for Valet

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

class valetAnalytics extends Component {
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
    this.graph("7063b955-e9ca-4aa6-93b6-9392d3ff811a", "sb-week"); // valet Customers
    this.graph("7125d6a2-eedd-4569-8f9b-91ae2d87ba6e", "rd-week"); // Staff Stats
    this.graph("dbe5d1d2-2797-46ed-ad6e-df53a3771357", "g-week");  //Arrival Frequency
    this.graph("de92eead-0099-4c79-9eea-8b8e3b534026", "v-week");  // Current Customer
   
  };

  monthData = () => {
    this.graph("2c3ea261-2714-4607-a636-9f3b713219c2", "sb-month"); // valet Customers
    this.graph("84fbe659-ba32-45cd-8bbe-37d1495014c7", "rd-month"); // Staff Stats
    this.graph("2bf568c6-77d2-4dcf-b960-ab3d31bb496b", "g-month");  // Arrival Frequency
    this.graph("de92eead-0099-4c79-9eea-8b8e3b534026", "v-month");  // Current Customer

  };
  monthsData = () => {
    this.graph("5f41fca6-00c7-4a70-9215-8d4ff46cfe3e", "sb-months"); // valet Customers
    this.graph("3f884317-ecf0-4101-a775-5f3321ae62d1", "rd-months"); // Staff Stats
    this.graph("382e533d-085c-42e2-ad00-b2d0eee682be", "g-months");  // Arrival Frequency
    this.graph("de92eead-0099-4c79-9eea-8b8e3b534026", "v-months");  // Current Customer

  };
  yearData = () => {
    this.graph("3e216be5-85d4-44b8-933c-3aa7b3c7a574", "sb-year"); // valet Customers
    this.graph("8734fe0a-f45b-4c19-9f1c-557aaf86783f", "rd-year"); // Staff Stats
    this.graph("774ce80a-ee60-4bc1-a890-82c481e27910", "g-year");  // Arrival Frequency
    this.graph("de92eead-0099-4c79-9eea-8b8e3b534026", "v-year");  // Current Customer

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
                Valet Analytics
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
  withStyles(styles)(valetAnalytics)
);
