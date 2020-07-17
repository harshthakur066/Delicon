import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getbilldata,
  markPaid,
  sendbillmail,
  sendbillsms,
} from "../../redux/actions/dataActions";
import {
  Backdrop,
  CircularProgress,
  withStyles,
  Button,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = {
  table: {
    minWidth: 700,
  },
  edit: {
    color: "white",
    cursor: "pointer",
    backgroundColor: "#2196F3",
    margin: "5px",
    marginBottom: "1rem",
    "&:hover": {
      backgroundColor: "#2196F3",
    },
  },
  delete: {
    color: "white",
    cursor: "pointer",
    backgroundColor: "#f44336",
    margin: "5px",
    marginBottom: "1rem",
    "&:hover": {
      backgroundColor: "#f44336",
    },
  },
};

const GST = 18.0;
const CGST = GST / 2;
const SGST = GST / 2;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

window.onafterprint = function () {
  let nav = document.getElementById("navroot");
  let side = document.getElementById("sider");
  let buts = document.getElementById("buts");
  buts.style.display = "block";
  nav.style.display = "block";
  side.style.marginLeft = "240px";
};

class billMain extends Component {
  state = {
    loading: true,
    errors: {},
  };

  componentDidMount() {
    this.props.getbilldata(this.props.match.params.orderId);
    document.body.style.backgroundColor = "#F0F2FE";
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data.staff.bill !== undefined) {
      this.setState({
        loading: false,
      });
    }
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
        loading: false,
      });
    }
  }

  invoiceTaxes = (tax, total) => {
    return tax * 0.01 * Number(total);
  };

  invoiceTotal = (total) => {
    return (
      CGST * 0.01 * Number(total) + SGST * 0.01 * Number(total) + Number(total)
    );
  };

  printBill = () => {
    let nav = document.getElementById("navroot");
    let side = document.getElementById("sider");
    let buts = document.getElementById("buts");
    buts.style.display = "none";
    nav.style.display = "none";
    side.style.marginLeft = "40px";
    window.print();
  };

  sendmail = () => {
    const mailoptions = {
      to: this.props.data.staff.bill.email,
      billurl: `https://deliconreservation.herokuapp.com/bill/${this.props.data.staff.bill._id}`,
      feedbackurl: `http://deliconreservation.herokuapp.com/feedbackform/${this.props.data.staff.bill.businessId}/${this.props.data.staff.bill._id}`,
    };
    this.props.sendbillmail(mailoptions);
  };

  sendSMS = () => {
    console.log(this.props.data.staff.bill);
    const msgOptions = {
      from: "The Delicon Group",
      to: this.props.data.staff.bill.mobno,
      billurl: `https://deliconreservation.herokuapp.com/bill/${this.props.data.staff.bill._id}`,
      feedbackurl: `http://deliconreservation.herokuapp.com/feedbackform/${this.props.data.staff.bill.businessId}/${this.props.data.staff.bill._id}`,
    };
    this.props.sendbillsms(msgOptions);
  };

  render() {
    const { classes } = this.props;

    var invoiceSubtotal = 0.0;

    if (
      this.props.data.staff.bill !== undefined &&
      this.props.data.staff.bill.MenuItems !== undefined
    ) {
      this.props.data.staff.bill.MenuItems.map(
        (row) =>
          (invoiceSubtotal =
            Number(invoiceSubtotal) + Number(row.quantity * row.price))
      );

      this.props.data.staff.bill.services.map(
        (row) =>
          (invoiceSubtotal =
            Number(invoiceSubtotal) + Number(row.quantity * row.price))
      );
    }

    const markup = this.state.loading ? (
      <Backdrop className={classes.backdrop} open={this.state.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    ) : (
      <>
        <div style={{ fontSize: "1rem" }}>
          Bill Number:- {this.props.data.staff.bill._id}
          <br></br>
          Staff Name:- {this.props.data.staff.bill.staffName}
        </div>
        <br></br>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={12}>
                  <b>Invoice</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Items</TableCell>
                <TableCell align="right">Qty.</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">GST</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.data.staff.bill.MenuItems.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{GST + "%"}</TableCell>
                  <TableCell align="right">
                    {ccyFormat(
                      Number(
                        row.quantity * row.price * GST * 0.01 +
                          row.quantity * row.price
                      )
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {this.props.data.staff.bill.services.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{GST + "%"}</TableCell>
                  <TableCell align="right">
                    {ccyFormat(
                      Number(
                        row.quantity * row.price * GST * 0.01 +
                          row.quantity * row.price
                      )
                    )}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell rowSpan={4} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>CGST</TableCell>
                <TableCell align="right">{`${CGST}%`}</TableCell>
                {
                  <TableCell align="right">
                    {ccyFormat(this.invoiceTaxes(CGST, invoiceSubtotal))}
                  </TableCell>
                }
              </TableRow>
              <TableRow>
                <TableCell>SGST</TableCell>
                <TableCell align="right">{`${SGST}%`}</TableCell>
                {
                  <TableCell align="right">
                    {ccyFormat(this.invoiceTaxes(SGST, invoiceSubtotal))}
                  </TableCell>
                }
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                {
                  <TableCell align="right">
                    {ccyFormat(this.invoiceTotal(invoiceSubtotal))}
                  </TableCell>
                }
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br></br>
        <div className="text-center" id="buts">
          <Button className={classes.delete} onClick={this.printBill}>
            Print
          </Button>
          <Button className={classes.edit} onClick={this.sendSMS}>
            Send SMS
          </Button>
          <Button className={classes.edit} onClick={this.sendmail}>
            Send Email
          </Button>
          {this.props.data.staff.bill.paid === true ? null : (
            <Button
              onClick={() =>
                this.props.markPaid(
                  this.props.user.businessId,
                  this.props.match.params.orderId
                )
              }
              className={classes.delete}
            >
              Mark as Paid
            </Button>
          )}
        </div>
      </>
    );

    if (!this.state.loading) {
      console.log(this.props.data.staff.bill);
    }

    return (
      <div style={{ marginTop: "100px" }}>
        <h1 className="text-center pb-3">{"<Company Name>"}</h1>
        <div style={{ margin: "20px" }}>{markup}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
  user: state.user,
});

const mapDispatchToProps = {
  getbilldata,
  markPaid,
  sendbillmail,
  sendbillsms,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(billMain));
