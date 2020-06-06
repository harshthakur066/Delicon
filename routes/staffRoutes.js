const express = require("express");
const jwt = require("jsonwebtoken");

const Staff = require('../models/Staff');

const router = express.Router();

router.post("/api/v1/staff/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const staff = new Staff({ name, email, password });
    await staff.save();
    const token = jwt.sign({ staffId: staff._id }, "STAFF SECRETE KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/api/v1/staff/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({ error: "Must provide email and password." });
  }
  const staff = await Staff.findOne({ email });
  if (!staff) {
    return res.status(404).send({ error: "Invalid password or email." });
  }
  try {
    await staff.comparePassword(password);
    const token = jwt.sign({ staffId: staff._id }, "STAFF SECRETE KEY");
    res.send({ token });
  } catch (err) {
    return res.status(404).send({ error: "Invalid password or email." });
  }
});

module.exports = router;
