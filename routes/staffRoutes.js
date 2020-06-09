const express = require("express");
const jwt = require("jsonwebtoken");

const Business = require("../models/Business");
const Staff = require("../models/Staff");
const isStaff = require("../middlewares/requireStaff");

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
    const staff = await Staff.findByIdAndUpdate(id, data);
    res.status(200).json(staff);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// READ Staff Profile
router.get("/api/v1/staff/profile/:id", isStaff, async (req, res) => {
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
    const profile = await Staff.findByIdAndDelete(id);
    res.status(200).json(profile);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
