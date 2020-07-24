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

class walkinAnalytics extends Component {
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
    this.graph("195eda87-38c9-447f-a3c6-e60ff814c33e", "sb-week"); // Walkin Seats
    this.graph("fa0fd403-4aa1-4634-bf20-b7840210ca19", "rd-week");// Walkin Duration
    this.graph("68c22622-7e4e-49e8-80d0-f74224bd544b", "g-week"); // Gender
    this.graph("69e3e238-7443-4548-8480-930bf2516887", "v-week"); // Visiting As
    this.graph("19870bf0-06d0-4173-9077-50a20cb2b276", "ci-week"); // Known As
  };

  monthData = () => {
    this.graph("ac57f091-a4fb-4c75-8e8a-d85f197859e3", "sb-month");// Walkin Seats
    this.graph("932abc33-fe43-4d19-853b-cd0c5540b53c", "rd-month");// Walkin Duration
    this.graph("1011124c-4157-4b22-b682-55cc007cd3d0", "g-month"); // Gender
    this.graph("8fbe2464-70f5-4523-a259-f105bf2c0801", "v-month");// Visiting As
    this.graph("1ab2be5b-b7df-4cab-8741-a2588eb1aff0", "ci-month");// Known As
  };
  monthsData = () => {
    this.graph("b4657ec8-3d61-4e9f-a41c-8a2f206738a0", "sb-months");// Walkin Seats
    this.graph("5db38c68-7f43-4ea0-93ab-446e57769e64", "rd-months");// Walkin Duration
    this.graph("774bd1d8-476d-4928-98dc-0e8a06660bae", "g-months"); // Gender
    this.graph("6c4a7894-63f2-41b2-bf26-b0948b9cb660", "v-months");// Visiting As
    this.graph("db663b69-df95-47b7-9d82-b9abb124d8c5", "ci-months");// Known As
  };
  yearData = () => {
    this.graph("ba2a9630-043e-480d-85f0-fe84c3825083", "sb-year");// Walkin Seats
    this.graph("f82efbe6-eda1-47df-a52d-3b565762e286", "rd-year");// Walkin Duration
    this.graph("a2dae022-27ba-4729-985e-45b19f4fcd6d", "g-year"); // Gender
    this.graph("5d1c470b-3931-445c-b824-3165444f7f46", "v-year");// Visiting As
    this.graph("94662814-430a-4339-90e0-66661a323ba3", "ci-year");// Known As
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

    // console.log(this.state);
//className ={`${classes.graph} col-12 col-sm-12 col-xs-12 col-md-6 col-lg-6 mb-4`}
    const month =(
      <div className={classes.display}>
        <div className={classes.graph} id="sb-month"></div>
        <div className={classes.graph} id="rd-month"></div>
        <div className={classes.graph} id="g-month"></div>
        <div className={classes.graph} id="v-month"></div>
        <div className={classes.graph} id="ci-month"></div>
      </div>
    );

    const week = (
      <div className={classes.display}>
        <div className={classes.graph} id="sb-week"></div>
        <div className={classes.graph} id="rd-week"></div>
        <div className={classes.graph} id="g-week"></div>
        <div className={classes.graph} id="v-week"></div>
        <div className={classes.graph} id="ci-week"></div>
      </div>
    );

    const sixMonths = (
      <div className={classes.display}>
        <div className={classes.graph} id="sb-months"></div>
        <div className={classes.graph} id="rd-months"></div>
        <div className={classes.graph} id="g-months"></div>
        <div className={classes.graph} id="v-months"></div>
        <div className={classes.graph} id="ci-months"></div>
      </div>
    );

    const year = (
      <div className={classes.display}>
        <div className={classes.graph} id="sb-year"></div>
        <div className={classes.graph} id="rd-year"></div>
        <div className={classes.graph} id="g-year"></div>
        <div className={classes.graph} id="v-year"></div>
        <div className={classes.graph} id="ci-year"></div>
      </div>
    );


    return (
      <div className="container" style={{ marginTop: 90 }}>
        <div className="row mt-4">
          <div className="col-12">
            <span>
              <span style={{ fontSize: "2rem" }} className="text-center mt-4">
                Walkin Analytics
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
  withStyles(styles)(walkinAnalytics)
);
