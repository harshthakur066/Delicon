const express = require("express");
const jwt = require("jsonwebtoken");
const BusinessOwner = require("../models/BusinessOwner");
const BuisnessCategory = require("../models/BusinessCategory");
const User = require("../models/User");
const requireAdmin = require("../middlewares/requireSuperAdmin");

const router = express.Router();

// Signup for Business Owner
router.post("/api/v1/businessowner/signup", requireAdmin, async (req, res) => {
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
});

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

//Get All Owner details for admin
router.get("/api/v1/businessowner", requireAdmin, async (req, res) => {
  try {
    const owners = await BusinessOwner.find({});
    const ownersdata = owners.map((own) => ({
      businesses: own.businesses,
      reqbusinesses: own.reqbusinesses,
      name: own.name,
      email: own.email,
      category: own.category,
      categoryId: own.categoryId,
    }));
    res.send(ownersdata);
  } catch (err) {
    return res.status(404).send({ error: err.message });
  }
});

//Get Owner details for admin
router.get("/api/v1/businessowner/:ownerId", requireAdmin, async (req, res) => {
  const { ownerId } = req.params;
  try {
    const own = await BusinessOwner.findById(ownerId);
    const ownerdata = {
      businesses: own.businesses,
      reqbusinesses: own.reqbusinesses,
      name: own.name,
      email: own.email,
      category: own.category,
      categoryId: own.categoryId,
    };
    res.send(ownerdata);
  } catch (err) {
    return res.status(404).send({ error: err.message });
  }
});

// Update details for admin
router.put("/api/v1/businessowner/:ownerId", requireAdmin, async (req, res) => {
  const { ownerId } = req.params;
  const { name, category, categoryId } = req.body;
  try {
    const update = { name, categoryId, category };
    const owner = await BusinessOwner.findByIdAndUpdate(ownerId, update);
    res.send(owner);
  } catch (err) {
    return res.status(404).send({ error: err.message });
  }
});

// Delete owner for admin
router.delete(
  "/api/v1/businessowner/:ownerId",
  requireAdmin,
  async (req, res) => {
    const { ownerId } = req.params;
    try {
      const owner = await BusinessOwner.findByIdAndDelete(ownerId);
      res.send(owner);
    } catch (err) {
      return res.status(404).send({ error: err.message });
    }
  }
);

module.exports = router;
