const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const SuperAdmin = require("../models/SuperAdmin");
const Staff = require("../models/Staff");
const BusinessOwner = require("../models/BusinessOwner");
const router = express.Router();

// Signin Route for all 3
router.post("/api/v1/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({ error: "Must provide email and password." });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send({ error: "Invalid password or email." });
  } else if (user.userRole === "Staff") {
    try {
      const staff = await Staff.findById(user.userId);
      await staff.comparePassword(password);
      const token = jwt.sign(
        {
          userId: staff._id,
          userRole: user.userRole,
          businessId: staff.businessId,
        },
        "STAFF SECRETE KEY"
      );
      res.send({ token });
    } catch (err) {
      return res.status(404).send({ error: "Invalid password or email." });
    }
  } else if (user.userRole === "Owner") {
    try {
      const business = await BusinessOwner.findById(user.userId);
      await business.comparePassword(password);
      const token = jwt.sign(
        { userId: business._id, userRole: user.userRole },
        "BUSINESS SECRETE KEY"
      );
      res.send({ token });
    } catch (err) {
      return res.status(404).send({ error: "Invalid password or email." });
    }
  } else {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
