const express = require("express");
const jwt = require("jsonwebtoken");
const BusinessOwner = require('../models/BusinessOwner');

const router = express.Router();

router.post("/api/v1/businessowner/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const business = new BusinessOwner({ name, email, password });
    await business.save();
    const token = jwt.sign(
      { businessId: business._id },
      "BUSINESS SECRETE KEY"
    );
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/api/v1/businessowner/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({ error: "Must provide email and password." });
  }
  const business = await BusinessOwner.findOne({ email });
  if (!business) {
    return res.status(404).send({ error: "Invalid password or email." });
  }
  try {
    await business.comparePassword(password);
    const token = jwt.sign(
      { businessId: business._id },
      "BUSINESS SECRETE KEY"
    );
    res.send({ token });
  } catch (err) {
    return res.status(404).send({ error: "Invalid password or email." });
  }
});

module.exports = router;
