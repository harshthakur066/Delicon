import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

// Analytics for Reservations

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

class reservationAnalytics extends Component {
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
    this.graph("12c3e3d5-b2a8-4b5e-9055-6dfdb065b574", "sb-week");
    this.graph("74b97d17-d4a9-4ed1-9850-32fe5a5c83bf", "rd-week");
    this.graph("ef6b0fc2-0892-4f59-8fb3-fe4a21cb07dd", "g-week");
    this.graph("ac208293-a7c9-4cfc-b835-297ef42badd8", "v-week");
    this.graph("d059f364-757a-4753-a999-2dec575e9945", "ci-week");
    this.graph("3c7d04bc-14f4-47cb-bad1-1a7b3a39610b", "b-week");
   
  };

  monthData = () => {
    this.graph("30ced374-6707-47ae-9adc-3b38a1ad0fda", "sb-month");
    this.graph("56735116-212e-4a88-8135-ee90be3deaa5", "rd-month");
    this.graph("bebaf95c-0567-4008-b839-4f7967556903", "g-month");
    this.graph("95e593cc-441a-4767-88bc-dc9261186177", "v-month");
    this.graph("d44068be-db9d-4a62-8a19-28eae4567dc9", "ci-month");
    this.graph("d37a4f8e-1f53-4e8a-a5a7-e5e348bd78e5", "b-month");
  };
  monthsData = () => {
    this.graph("2a74a9fc-1a68-48cd-a059-1cc5abdc1684", "sb-months");
    this.graph("8d242e31-a9f3-4bf5-b8f5-048558548ba4", "rd-months");
    this.graph("3304715f-da99-43d8-a7be-05a6ee7d392d", "g-months");
    this.graph("58c7a70e-be5d-4fdc-9aed-165018ce8a37", "v-months");
    this.graph("194244de-f9d2-4f9f-861a-8f2337d96f0a", "ci-months");
    this.graph("57606810-04e4-4cce-9784-3fab449b89bc", "b-months");
  };
  yearData = () => {
    this.graph("1a346849-8e82-4744-8804-72aa3499bc45", "sb-year");
    this.graph("bf53aff3-aaf6-4e4d-9bc2-b53834c93b92", "rd-year");
    this.graph("24098fbd-a2a7-40fb-8521-db241fbd3114", "g-year");
    this.graph("732c3296-815f-4dd4-95e0-eeea358b6d58", "v-year");
    this.graph("d2e7350c-5353-4093-8ffa-227790e85b9f", "ci-year");
    this.graph("23b85bfc-0efc-471c-b569-4775dbd9282c", "b-year");
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
        <div className={classes.graph} id="ci-month"></div>
        <div className={classes.graph} id="b-month"></div>
      </div>
    );

    const week = (
      <div className={classes.display}>
        <div className={classes.graph} id="sb-week"></div>
        <div className={classes.graph} id="rd-week"></div>
        <div className={classes.graph} id="g-week"></div>
        <div className={classes.graph} id="v-week"></div>
        <div className={classes.graph} id="ci-week"></div>
        <div className={classes.graph} id="b-week"></div>
      </div>
    );

    const sixMonths = (
      <div className={classes.display}>
        <div className={classes.graph} id="sb-months"></div>
        <div className={classes.graph} id="rd-months"></div>
        <div className={classes.graph} id="g-months"></div>
        <div className={classes.graph} id="v-months"></div>
        <div className={classes.graph} id="ci-months"></div>
        <div className={classes.graph} id="b-months"></div>
      </div>
    );

    const year = (
      <div className={classes.display}>
        <div className={classes.graph} id="sb-year"></div>
        <div className={classes.graph} id="rd-year"></div>
        <div className={classes.graph} id="g-year"></div>
        <div className={classes.graph} id="v-year"></div>
        <div className={classes.graph} id="ci-year"></div>
        <div className={classes.graph} id="b-year"></div>
      </div>
    );


    return (
      <div className="container" style={{ marginTop: 90 }}>
        <div className="row mt-4">
          <div className="col-12">
            <span>
              <span style={{ fontSize: "2rem" }} className="text-center mt-4">
                Reservation Analytics
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
  withStyles(styles)(reservationAnalytics)
);
