import React, { Component } from "react";
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";

const styles = {
  count: {
    display: "flex",
    justifyContent: "center",
  },
  edit: {
    float: "left",
    color: "blue",
    cursor: "pointer",
    marginRight: "1rem",
  },
  delete: {
    float: "right",
    color: "red",
    cursor: "pointer",
    marginBottom: "1.05rem",
    marginLeft: "1rem",
  },
  bodycard: {
    margin: 5,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#FFFFFF", //card-bg-color
    boxShadow: "1px 2px 4px 1px grey",
    "&:hover": {
      transition: "(0.4s)",
      boxShadow: "1px 6px 8px 2px grey",
    },
  },
  fr: {
    float: "right",
    "@media (min-width: 320px) and (max-width: 480px)": {
      float: "none",
    },
  },
  breaker: {
    marginTop: 5,
    marginBottom: 5,
  },
  root: {
    margin: "auto",
    textAlign: "center",
    flexGrow: 0,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  pageTitle: {
    margin: "20px auto 20px auto",
  },
  TextField: {
    margin: "10px auto 10px auto",
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
  progress: {
    position: "absolute",
  },
  modlebox: {
    position: "fixed",
    top: "15%",
    left: "10%",
    right: "10%",
    bottom: "5%",
    backgroundColor: "white",
    borderRadius: "20px",
    border: "0px",
    width: "auto",
    outline: "none",
    overflowY: "scroll",
  },
};

class ItemCard extends Component {
  state = {
    count: 0,
  };

  increment = () => {
    this.setState({
      count: this.state.count + 1,
    });
    this.props.food.quantity = this.state.count + 1;
  };

  decrement = () => {
    this.setState({
      count: this.state.count - 1,
    });
    this.props.food.quantity = this.state.count + 1;
  };
  // change code above this line
  render() {
    const { classes } = this.props;
    const { count } = this.state;
    const { increment, decrement } = this;
    console.log(count, this.props.food);
    return (
      <div
        key={this.props.index}
        className="col-6 sm-12 xs-12 mb-4 text-center"
      >
        <Card className={classes.bodycard}>
          <CardContent>
            <Typography style={{ fontSize: "1.05rem" }}>
              {this.props.food.name} <br></br>
              {this.props.food.details}
              <br></br>
              {this.props.food.price}
            </Typography>

            <br className={classes.breaker} />
          </CardContent>
          <div className={classes.count}>
            <IoMdAdd size={25} onClick={increment} className={classes.edit} />
            <Typography style={{ fontSize: "1.05rem" }}>{count}</Typography>
            <FiMinus
              size={25}
              onClick={count !== 0 ? decrement : null}
              className={classes.delete}
            />
          </div>
          <Button
            onClick={() => this.props.selectserviceitem(this.props.food)}
            className={classes.edit}
          >
            Add
          </Button>
          <Button
            onClick={() => this.props.removeserviceitem(this.props.food)}
            className={classes.delete}
          >
            Remove
          </Button>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(ItemCard);
