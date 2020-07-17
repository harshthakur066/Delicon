var nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const isStaff = require("../middlewares/requireStaff");
const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: "8e92d532",
  apiSecret: "ij4nvoIo4BAxuxYb",
});

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "delicongroup2@gmail.com",
    pass: "NewPassword@123",
  },
});

router.post(`/api/v1/smssender/bill`, isStaff, (req, res) => {
  const from = req.body.from;
  const to = "91" + req.body.to;
  const text = req.body.text;
  nexmo.message.sendSms(from, to, text, {}, (err, resdata) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(resdata);
    }
  });
});

router.post(`/api/v1/mailer/bill`, isStaff, (req, res) => {
  const to = req.body.to;
  const billurl = req.body.billurl;
  const feedbackurl = req.body.feedbackurl;
  var mailOptions = {
    from: "delicongroup2@gmail.com",
    to: to,
    subject: "Test Bill Email",
    text: `   Bill URL - ${billurl}
    Feedback URL - ${feedbackurl}
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(info.response);
    }
  });
});

module.exports = router;
