const express = require("express");
const jwt = require("jsonwebtoken");

const Staff = require("../models/Staff");
const isStaff = require("../middlewares/requireStaff");

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

//Profile Data
router.put("/api/v1/staff/profile/:id", isStaff, async (req, res) => {
  const id = req.params.id;
  const {
    mobno,
    address,
    qualification,
    experience,
    position,
    dateOfJoining,
    details,
  } = req.body;
  data = {
    mobno,
    address,
    qualification,
    experience,
    position,
    dateOfJoining,
    details,
  };
  try {
    const staff = await Staff.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(staff);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// READ Staff Profile
router.get("/api/v1/staff/:id", isStaff, async (req, res) => {
  const id = req.params.id;
  try {
    const staff = await Staff.findById(id);
    res.status(200).json(staff);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// DELETE Staff Profile
router.delete("/api/v1/staff/profile/:id", isStaff, async (req, res) => {
  const id = req.params.id;
  try {
    await Staff.findByIdAndDelete(id);
    res.status(200).send("Deleted");
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
