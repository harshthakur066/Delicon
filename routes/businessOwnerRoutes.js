const express = require("express");
const jwt = require("jsonwebtoken");
const BusinessOwner = require("../models/BusinessOwner");
const BuisnessCategory = require("../models/BusinessCategory");
const User = require("../models/User");
const isSuperAdmin = require("../middlewares/requireSuperAdmin");

const router = express.Router();

// Signup for Business Owner
router.post(
  "/api/v1/admin/businessowner/signup",
  isSuperAdmin,
  async (req, res) => {
    const { name, email, password, category, categoryId } = req.body;
    try {
      const business = new BusinessOwner({
        name: name,
        email: email,
        password: password,
        category: category,
        categoryId: categoryId,
      });
      await business.save();
      const token = jwt.sign(
        { userId: business._id, userRole: "Owner" },
        "BUSINESS SECRETE KEY"
      );
      try {
        await User.create({
          userId: business._id,
          userRole: "Owner",
          email: email,
        });
        try {
          const currentcatagory = await BuisnessCategory.findById(categoryId);
          currentcatagory.businessowners.push(business._id);
          await BuisnessCategory.findByIdAndUpdate(categoryId, currentcatagory);
          res.send({ token });
        } catch (err) {
          console.log(err);
          res.status(500).json({
            error: err.message,
            message: "Error while adding id to Business Categories!",
          });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error while creating!" });
      }
    } catch (err) {
      return res.status(422).send(err.message);
    }
  }
);

// No need to use Go to indexRoutes.js
// SignIp for Business Owner
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
      { userId: business._id, userRole: "Owner" },
      "BUSINESS SECRETE KEY"
    );
    res.send({ token });
  } catch (err) {
    return res.status(404).send({ error: "Invalid password or email." });
  }
});

module.exports = router;
