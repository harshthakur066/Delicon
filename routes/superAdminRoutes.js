const express = require("express");
const jwt = require("jsonwebtoken");
const SuperAdmin = require("../models/SuperAdmin");
const router = express.Router();

router.post("/api/v1/admin/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const admin = new SuperAdmin({ name, email, password });
    await admin.save();
    const token = jwt.sign({ adminId: admin._id }, "ADMIN SECRETE KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/api/v1/admin/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({ error: "Must provide email and password." });
  }
  const admin = await SuperAdmin.findOne({ email });
  if (!admin) {
    return res.status(404).send({ error: "Invalid password or email." });
  }
  try {
    await admin.comparePassword(password);
    const token = jwt.sign({ adminId: admin._id }, "ADMIN SECRETE KEY");
    res.send({ token });
  } catch (err) {
    return res.status(404).send({ error: "Invalid password or email." });
  }
});

module.exports = router;
