const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const BusinessOwnerSchema = mongoose.model("BusinessOwner");

const router = express.Router();

router.post("/api/v1/business/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const business = new BusinessOwnerSchema({ email, password });
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

router.post("/api/v1/business/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({ error: "Must provide email and password." });
  }
  const business = await BusinessOwnerSchema.findOne({ email });
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
