const express = require("express");
const jwt = require("jsonwebtoken");
const Staff = require("../models/Staff");
const Business = require("../models/Business");
const router = express.Router();

router.post("/api/v1/staff/signup", async (req, res) => {
  const { name, email, password, business, businessId } = req.body;
  try {
    const staff = new Staff({ name, email, password, business, businessId });
    await staff.save();
    const token = jwt.sign({ staffId: staff._id }, "STAFF SECRETE KEY");
    try {
      const currentbusiness = await Business.findById(businessId);
      currentbusiness.staff.push(staff._id);
      await Business.findByIdAndUpdate(businessId, currentbusiness);
      res.send({ token });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err.message,
        message: "Error while adding id to Business Categories!",
      });
    }
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
